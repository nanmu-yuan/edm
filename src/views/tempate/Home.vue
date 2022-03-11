<template>
  <div>
    <div>
    <div class="t-header-box">
        <Theader :siteList='siteList'></Theader>
    </div>
    </div>
    <div>
     <router-view v-if="isRouterAlive"></router-view>
    </div>
  </div>
</template>
<script>
import Theader from "../../components/Theader";
import {EventBus} from '../../util/eventBus.js'
export default {
  name: "home",
  provide(){
    return {
      reload:this.reload
    }
  },
  data () {
    return {
        isRouterAlive:true,
        siteList:{},
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(()=>{
        this.isRouterAlive = true;
      })
    },
    querySiteInf(){
      this.axios.get(`/api/edm/site/list/`).then(res =>{
      let originData = res.data.data,obj={};
      if(originData.length>0){
        originData.map((item)=>{
          obj[item['site_id']] = item;
        })
      }
      this.siteList = obj;
      this.$store.commit('siteConfig/SAVESITELIST',obj);
    })
    }
  },
  created(){
    this.querySiteInf();
    let self = this;
    EventBus.$on('query',()=>{
      self.querySiteInf();
    })
  },
  components:{
  Theader
  }
};
</script>
<style scoped>

</style>