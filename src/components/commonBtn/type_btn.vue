<template>
  <div class="btn-box">
    <el-button-group>
      <el-button :class="[type==0?'active':'']" @click="changeType(0)">CENTENT</el-button>
      <el-button :class="[type==1?'active':'']" @click="changeType(1)">SETTING</el-button>
    </el-button-group>
  </div>
</template>
<script>
export default {
    name:'type-btn',
    data () {
        return {
            type:0,
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
  padding-left: 86px;
  padding-bottom: 25px;
  margin-bottom: 8px;
}
.active{
  color: #409EFF;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
</style>