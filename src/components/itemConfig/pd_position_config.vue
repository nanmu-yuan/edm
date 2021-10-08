<template>
    <div class="warp-box">
        <el-form :inline="true" label-width="80px">
            <template v-for="(item,index) of configData.pd_style">
                <el-form-item :key="index">
                <div>{{item.label}}</div>
                <el-input-number v-model="item.value" @change="handleChange" :min="0" ></el-input-number>
            </el-form-item>
            </template>
        </el-form>
    </div>
</template>
<script>
export default {
    name:'pd_position_config',
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
            configData:{},

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
               console.log(this.configData );
            },
            deep:true,
        }
    },
    methods:{
        handleChange(value){
            console.log(value);
        }
    }
}
</script>
<style scoped>
    .warp-box{
         border-top: 1px solid #fefefe;
    }
</style>