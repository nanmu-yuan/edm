<template>
  <div class="btn-box">
    <el-button-group>
      <el-button @click="changeType(0)">CENTENT</el-button>
      <el-button @click="changeType(1)">SETTING</el-button>
    </el-button-group>
  </div>
</template>
<script>
export default {
    name:'type-btn',
    data () {
        return {
            type:0
        }
    },
    methods: {
        changeType(type){
           this.$emit('typeData',type)
        }
    }
}
</script>
<style scoped>
.btn-box{
  padding-left: 86px;
  padding-bottom: 25px;
  border-bottom: 1px solid #DCDFE6;
  margin-bottom: 8px;

}
</style>