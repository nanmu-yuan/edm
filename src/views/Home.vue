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
import Theader from "../components/Theader";
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
    }
  },
  created(){
    this.axios.get('/api/querySiteInfo').then(res =>{
      let originData = res.data,obj={};
      if(originData.length>0){
        originData.map((item)=>{
          obj[item['site_id']] = item;
        })
      }
      this.siteList = obj;
      this.$store.commit('siteConfig/SAVESITELIST',obj);
    })
  },
  components:{
    Theader
  }
};
</script>
<style scoped>

</style>