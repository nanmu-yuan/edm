<template>
  <transition name="bounce">
    <div v-if="isDrawer" class="drawer-box">
      <div style=" padding: 15px;">
        <div class="cance-box"><span @click="cance" class="el-icon-d-arrow-right"></span></div>
      <slot>

      </slot>
      </div>
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
  width: 25%;
  border: 1px solid #e4e7ed;
  z-index: 999;
  top: 60px;
  background: #fff;
   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
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
    right: 15px;
    font-size: 16px;
    color:rgb(220, 223, 230);
    top: 25px;
}
</style>