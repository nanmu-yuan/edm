<template>
  <transition name="bounce">
    <div v-if="isDrawer" class="drawer-box">
      <div style=" padding: 15px;">
      <slot>

      </slot>
      </div>
       <div class="cance-box"><el-button  type="success" @click="cance" >退出<span class="el-icon-d-arrow-right"></span></el-button></div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "drawer",
  props: ["isDrawer"],
  data() {
    return {};
  },
  watch: {
    isDrawer(nval) {
    },
  },
  methods:{
      cance(){
         this.$emit('isDrawer',false);
      }
  },
  created() {},
};
</script>
<style  scoped>
.drawer-box {
  position: fixed;
  right: 0;
  height: calc(100vh - 61px);
  width: 33%;
  z-index: 2001;
  top: 62px;
  background: #fff;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
   transform: translateX(540px);
  }
  100% {
   transform: translateX(1px);
  }
}
.cance-box span{
 cursor: pointer;
}
.cance-box span:hover{
  font-weight: bold;
  color:#909399;
}
.cance-box{
    position: absolute;
    font-size: 30px;
    right: 86px;
    color:#999;
    bottom: 20px;
}
</style>