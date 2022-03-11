<template>
    <div class="warp-box">
        <el-divider>{{configData.title}}</el-divider>
        <el-form>
            <el-form-item>
                <el-input v-model="configData.value">
                </el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name:'link_config',
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
               this.configData = nval['content_setting'][this.configName];
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
</style>