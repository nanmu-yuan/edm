<template>
  <div class="warp-box">
    <el-form>
      <el-form-item :label="configData.title">
        <el-input type="textarea" v-model="spus"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit">submmit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
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
  watch: {
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
    }
  },
  data() {
    return {
      defaultData: {},
      configData: {},
      spus: 'SPEHDJS3EIJ,SPQ0UXQAF2C,SP0OPKBME35,SP96R46LROK,SPA6HSIC71J,SPV47KJM2YD,SP210910CSHN,SP210907LGSL',
      originListData: {
          list:[],
          time:''
      },
      number:''

    }
  },
  methods: {
    submit() {
      let promiseList = [];
      let a = 'http://lms.orderplus.com/api/bamboo/siteProduct/getPDMSpdSpuInfoList?siteId=24646&spus=';
      let spus = this.spus.split(',');
      for (let i = 0; i < spus.length; i++) {
        let url = `${a}${spus[i]}`
        promiseList.push(this.get(url, spus[i]));
      }
      this.promiseAllarr(promiseList).then(res => {
        this.originListData = this.dataOptimization(res);
        console.log( this.originListData);
        this.$store.commit('adminConfig/UPDATEPRODUCTLIST',{
          num:this.num,
          list:this.originListData
        })
      //this.configData = this.originListData;
      });
    },
    promiseAllarr(arr) {
      var result = [];
      var successCount = 0;
      return new Promise((resolve, reject) => {
        arr.forEach((item, index) => {
          item.then((a) => {
            result.push(a);
            successCount++;
            if (successCount === arr.length) {
              resolve(result);
            }
          }).catch(err => {
            successCount++;
            console.log(err)
            if (successCount === arr.length) {
              resolve(result);
            }
          })
        })
      })
    },
    dataOptimization(data) {
      return data.map(item => {
        let obj = {};
        obj.goods_name = item.name;
        obj.url = item.link + '?';
        if (/^(http|https)/.test(item.img)) {
          obj.img = item.img;
        } else {
          obj.img = 'http://' + item.img;
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