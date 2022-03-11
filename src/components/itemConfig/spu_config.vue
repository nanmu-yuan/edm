<template>
  <div class="warp-box">
    <el-divider>{{configData.title}}</el-divider>
    <el-form>
      <el-form-item>
        <el-input type="textarea" v-model="spus"></el-input>
      </el-form-item>
      <el-form-item v-if="errorData">
        <el-divider>Error Spu</el-divider>
        <el-input class="error" :disabled='true' type="textarea" v-model="errorData"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button @click="submit" :disabled='disabled'>查询spu</el-button>
           <el-tooltip class="item" effect="dark" content="展示当前选中产品模块的数据，可根据实际情况进行修改、排序。" placement="top-start">
          <el-button v-if="true" @click="showOriginData">查看当前数据</el-button>
          </el-tooltip>
      </el-form-item>
    </el-form>
    <productList :ProductDialogVisible="ProductDialogVisible"></productList>
  </div>
</template>
<script>
  import productList from '../commonBtn/productList.vue'
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
      ProductDialogVisible:{
        type:false,
        dataList:[]
      },
      spus: 'SPEHDJS3EIJ,SPQ0UXQAF2C',
      errorData:'',
      originListData: {
          list:[],
          time:''
      },
      number:''

    }
  },
  methods: {
    showOriginData(){
      this.ProductDialogVisible.type = true;
      this.ProductDialogVisible.dataList = this.$store.state.adminConfig.defaultArray[this.num]['content_setting']['spu_config']['list']
    },
    submit() {
      this.$store.commit('siteConfig/ERRORSPU','clear')
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
       let errorSpu = this.$store.state.siteConfig.errorSpu;
       this.errorData = errorSpu.join(",");
       let newSpus = []; 
        spus.forEach(item=>{
          if(errorSpu.indexOf(item)<0){
            newSpus.push(item)
          }
        })
       this.spus = newSpus.join(',')
       let scortData = this.sortDataList(res,newSpus);
       this.originListData = this.dataOptimization(scortData,id,domainBase,siteList);
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
    sortDataList(data,spus){
      let sortList = [];
      for(let i=0;i<data.length;i++){
        let spu = data[i]['spu']||data[i]['goods_sn'];
        for(let j=0;j<spus.length;j++){
          if(spu==spus[j]){
            sortList[j] = data[i]
          }
        }
      }
      return sortList;
    },
    dataOptimization(data, id, domainBase, siteList) {
      let currentSiteName = siteList[id]['name'];
      let track = `${this.$store.state.siteConfig.track}`;
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
          obj.url = `${cache}?${track}&utm_content=goods${item.spu}&utm_adset=goods`
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
            obj.url = `${cache}${track}${item.spu}`
            obj.img = item.mainImg + '@!w420-h420';
            obj.price = '$' + item.salePrice.toFixed(2);
        } else if(siteList[id]['platform'] == 'Independence'){
             obj.goods_name = item.name;
             obj.url = item.url;
             obj.img = item.mainImg;
             obj.price =item.price;
             let cache = obj.url;
             obj.url = `${cache}?${track}&utm_content=goods${item.spu}&utm_adset=goods`;
        }else if (siteList[id]['platform'] == 'meSystem') {
          let tmpUrl = "";
          obj.goods_name = item.goods_name;
          tmpUrl = item.goods_name.replace(/^\s+/, '').replace(/\s{2,}/g, ' ').replace(/\&*/g, '');
          obj.url = domainBase + tmpUrl.toLowerCase().split(' ').join('-') + '-' + item.id + '.html';
          let cache = obj.url;
          obj.url = `${cache}?${track}&utm_content=goods${item.goods_sn}&utm_adset=goods`
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
  },
  components:{
    productList
  }
}
</script>
<style scoped>
.warp-box {
  border-top: 1px solid #fefefe;
}
.error ::v-deep .el-textarea__inner{
  border-color: red;
}
</style>