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
      this.siteList = res.data;
    })
  },
  components:{
    Theader
  }
};
</script>
<style scoped>

</style>