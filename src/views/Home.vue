<template>
  <div>
    <div>
    <div class="t-header-box">
        <Theader></Theader>
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
        isRouterAlive:true
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
  components:{
    Theader
  }
};
</script>
<style scoped>

</style>