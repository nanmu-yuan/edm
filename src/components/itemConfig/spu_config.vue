<template>
  <div class="warp-box">
    <el-divider>{{configData.title}}</el-divider>
    <el-form>
      <el-form-item>
        <el-input type="textarea" v-model="spus"></el-input>
      </el-form-item>
      <el-form-item>
        <el-tooltip  class="item" effect="dark" content="需要选择站点" placement="top-start">
          <el-button @click="submit" :disabled='disabled'>submmit</el-button>
        </el-tooltip>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: 'spu_config',
  props: {
    configObj: {
      type: Object
    },
    num: {
      type: null
    },
    configName: {
      type: String
    }
  },
  computed: {
    ...mapState("siteConfig", ["currentSiteName","siteInfo"]),
  },
  watch: {
    currentSiteName:{
      handler:function(nval){
        if(nval){
          this.disabled = false
        }else{
          this.disabled = true
        }
      },deep:true,immediate:true
    },
    configObj: {
      handler: function (nval) {
        //this.defaultData = nval;
        this.configData = nval['content_setting'][this.configName];
      },
      deep: true,
    },
    num:{
        handler:function(nval){
            this.number = nval;
        },
        deep:true,
        immediate:true
    },
  },
  data() {
    return {
      defaultData: {},
      configData: {},
      disabled:true,
      spus: 'SPEHDJS3EIJ,SPQ0UXQAF2C',
      originListData: {
          list:[],
          time:''
      },
      number:''

    }
  },
  methods: {
    submit() {
      let api = `${this.$store.state.siteConfig.currentSiteApi}`,
      promiseList = [],
      spus = this.spus.split(','),
      id = this.$store.state.siteConfig.id,
      domainBase = this.$store.state.siteConfig.domainBase,
      siteList = this.$store.state.siteConfig.siteInfo;
      for (let i = 0; i < spus.length; i++) {
        let url = `${api}${spus[i]}`
        promiseList.push(this.get(url,spus[i]));
      }
      this.promiseAllarr(promiseList).then(res => {
        this.originListData = this.dataOptimization(res,id,domainBase,siteList);
        this.$store.commit('adminConfig/UPDATEPRODUCTLIST',{
          num:this.num,
          list:this.originListData
        })
      });
    },
    interface(){
      
    },
    promiseAllarr(arr) {
      var result = [];
      var successCount = 0;
      return new Promise((resolve) => {
        arr.forEach((item) => {
          item.then((a) => {
            result.push(a);
            successCount++;
            if (successCount === arr.length) {
              resolve(result);
            }
          }).catch(err => {
            successCount++;
            if (successCount === arr.length) {
              resolve(result);
            }
          })
        })
      })
    },
    dataOptimization(data, id, domainBase, siteList) {
      let currentSiteName = siteList[id]['name'];
      let track = `${this.$store.state.siteConfig.track}&utm_campaign=`;
      return data.map(item => {
        let obj = {};
        if (siteList[id]['platform'] =='shopify') {
          obj.goods_name = item.name;
          obj.url = item.link;
          if (currentSiteName == 'netlumi') {
            obj.url = obj.url.split(".com")[1].replace(new RegExp("(^http.+com)*"), domainBase.replace(/\/$/, ''));
          } else {
            obj.url = obj.url.replace(new RegExp("(^http.+com)*"), domainBase.replace(/\/$/, ''));
          }
          let cache = obj.url;
          obj.url = `${cache}?${track}${item.spu}`
          if (/^(http|https)/.test(item.img)) {
            obj.img = item.img;
          } else {
            obj.img = 'http://' + item.img;
          }
          obj.price = '$' + item.price;
        }else if(siteList[id]['platform'] == 'cloud'){
            obj.goods_name = item.name;
            obj.url = domainBase + item.handle + '-' + item.id + '.html?';
            let cache = obj.url;
            obj.url = `${cache}?${track}${item.spu}`
            obj.img = item.mainImg + '@!w420-h420';
            obj.price = '$' + item.salePrice.toFixed(2);
        } else if(siteList[id]['platform'] == 'Independence'){
             obj.goods_name = item.name;
             obj.url = item.url;
             obj.img = item.mainImg;
             obj.price =item.price;
             let cache = obj.url;
             obj.url = `${cache}?${track}`;
        }else if (siteList[id]['platform'] == 'meSystem') {
          let tmpUrl = "";
          obj.goods_name = item.goods_name;
          tmpUrl = item.goods_name.replace(/^\s+/, '').replace(/\s{2,}/g, ' ').replace(/\&*/g, '');
          obj.url = domainBase + tmpUrl.toLowerCase().split(' ').join('-') + '-' + item.id + '.html';
          let cache = obj.url;
          obj.url = `${cache}?${track}${item.goods_sn}`
          obj.price = '$' + item.price.toFixed(2);
          var rep = currentSiteName == 'fashionmia' ? 'g-' : '';
          var sizePara = "";
          if (currentSiteName == 'calladream') {
            sizePara = "@!h250-w250"
          } else if (currentSiteName == 'popreal') {
            sizePara = "@!h320-w320"
          } else {
            sizePara = "@!" + rep + "h400-w300";
          }
          obj.img = "http://" + 'bl.' + "aopcdn.com/" + item.main_original_img_path.replace(/^images/, 'goods') + sizePara;
        }
        if (item.marketPrice && item.type) {
          obj.market_price = '$' + item.marketPrice.toFixed(2);
        } else if (item.market_price) {
          obj.market_price = '$' + item.market_price.toFixed(2);
        } else if (item.before_price) {
          obj.market_price ='$' + item.before_price.toFixed(2);
        } else {
          obj.market_price = 0;
        }
        return obj
      })
    }
  },
  created() {
    this.defaultData = this.configObj
  }
}
</script>
<style scoped>
.warp-box {
  border-top: 1px solid #fefefe;
}
</style>