<template>
  <div class="warp-box">
    <el-divider>TYPE</el-divider>
    <el-form>
      <el-form-item >
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
.warp-box{
        border-top: 1px solid #fefefe;
    }
.title{
    margin: 8px 0 15px 0;
    padding: 2px 0;
    text-align: center;
    background: #E4E7ED;
    border-radius: 4px;
}
</style>