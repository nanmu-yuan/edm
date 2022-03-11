<template>
  <div class="btn-box">
    <el-tooltip class="item" effect="dark" content="若模板加载中，请勿点击" placement="top-start">
        <el-button type="primary" @click="save" >生成</el-button>
      </el-tooltip>
   <el-button type="primary" v-if="isShowEditSave" @click="saveTemplate">保存</el-button>
   <el-button type="primary" v-if="isShowEditSave" @click="saveAsTemplate">另存为</el-button>
   <el-button type="primary" v-else @click="saveAsTemplate">保存</el-button>
  </div>
</template>
<script>
export default {
    name:'save',
    props: ['fullscreenLoading',"isShowEditSave"],
    data () {
        return {
            type:0
        }
    },
    methods: {
       save(){
           this.$emit('save',true);
       },
       saveTemplate(){
           this.$emit('saveTemplate',true);
       },
       saveAsTemplate(){
           this.$emit('saveAsTemplate',true)
       }
    }
}
</script>
<style scoped>
.btn-box{
    position: relative;
}
</style>