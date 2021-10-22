<template>
  <transition name="bounce">
    <div v-if="isDrawer" class="drawer-box">
    <div class="cance-box"><span @click="cance" class="el-icon-d-arrow-right"></span></div>
      <slot>

      </slot>
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
      console.log(nval);
    },
  },
  methods:{
      cance(){
         this.$emit('isDrawer',false)
      }
  },
  created() {},
};
</script>
<style  scoped>
.drawer-box {
  position: fixed;
  right: 0;
  height: calc(100vh - 92px);
  width: 21%;
  border: 1px solid #e4e7ed;
  padding: 15px;
  z-index: 999;
  top: 60px;
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
 font-weight: bold;
 cursor: pointer;
}
.cance-box{
    position: absolute;
    right: 15px;
    font-size: 16px;
    color:#909399;
    top: 25px;
}
</style>