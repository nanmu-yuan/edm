<template>
  <div>
    <div>
    <div class="t-header-box">
        <Theader></Theader>
    </div>
    </div>
    <div>
     <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Theader from "../components/Theader";
export default {
  name: "home",
  components:{
    Theader
  }
};
</script>
<style scoped>

</style>