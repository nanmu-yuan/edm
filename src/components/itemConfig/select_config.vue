<template>
  <div>
    <el-form>
      <el-form-item :label="configData.title">
        <el-select v-model="configData.value">
          <el-option
            v-for=" item of configData.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
    name:'select_config',
    props: {
       configObj:{
           type:Object
       },
       configName:{
           type:String
       }
    },
    data () {
        return {
            defaultData:{},
            configData:{}

        }
    },
    created () {
        this.defaultData = this.configObj
    },
    watch: {
        configObj:{
            handler:function(nval){
               //this.defaultData = nval;
               this.configData = nval['style_setting'][this.configName];
            },
            deep:true,
        }
    }
}
</script>
<style scoped>

</style>