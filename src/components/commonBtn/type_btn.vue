<template>
  <div class="btn-box">
    <el-button-group>
      <el-button type="primary" plain :disabled='isDisable' :class="[type==0?'active':'']" @click="changeType(0)">组件内容</el-button>
      <el-button type="primary" plain :class="[type==1?'active':'']" @click="changeType(1)">组件样式</el-button>
    </el-button-group>
  </div>
</template>
<script>
export default {
    name:'type-btn',
    props:['isDisable'],
    data () {
        return {
            type:0
        }
    },
    watch:{
      isDisable:{
        handler(nval){
          this.changeType(1)
        }
      }
    },
    methods: {
        changeType(type){
          this.type = type;
           this.$emit('typeData',type)
        }
    }
}
</script>
<style scoped>
.btn-box{
  text-align: center;
  padding-bottom: 25px;
  margin-bottom: 8px;
}
.active{
  color: #fff;
  border-color: #c6e2ff;
  background-color: #409EFF;
}
</style>