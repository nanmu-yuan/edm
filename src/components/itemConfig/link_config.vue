<template>
    <div>
        <el-form>
            <el-form-item :label="configData.title">
                <el-input v-model="configData.value"></el-input>
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
               //this.defaultData = nval;
               this.configData = nval['content_setting'][this.configName];
                console.log(nval)
            },
            deep:true,
        }
    }
}
</script>
<style scoped>

</style>