<template>
    <div class="warp-box">
        <el-form :inline="true" label-width="80px">
            <el-divider>POSITION</el-divider>
            <template v-for="(item,index) of configData.pd_style">
                <el-form-item :key="index" :label="item.label">
                    <el-input-number size="mini" style="width:100px" v-model="item.value" @change="handleChange"
                        :min="0"></el-input-number>
                </el-form-item>
            </template>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'pd_position_config',
        props: {
            configObj: {
                type: Object
            },
            configName: {
                type: String
            }
        },
        data() {
            return {
                defaultData: {},
                configData: {},

            }
        },
        created() {
            this.defaultData = this.configObj
        },
        watch: {
            configObj: {
                handler: function (nval) {
                    //this.defaultData = nval;
                    this.configData = nval['style_setting'][this.configName];
                },
                deep: true,
            }
        },
        methods: {
            handleChange(value) {
                console.log(value);
            }
        }
    }
</script>
<style scoped>
    .warp-box {
        padding-top: 8px;
    }

    .title {
        margin: 8px 0 15px 0;
        padding: 2px 0;
        text-align: center;
        background: #E4E7ED;
        border-radius: 4px;
    }
</style>