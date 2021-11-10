<template>
  <div class="btn-box">
   <el-button @click="save" >SUBMIT</el-button>
    <el-button @click="saveTemplate">SAVE TEMPLATE</el-button>
  </div>
</template>
<script>
export default {
    name:'save',
    props: ['fullscreenLoading'],
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
       }
    }
}
</script>
<style scoped>
.btn-box{

}
</style>