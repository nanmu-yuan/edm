<template>
    <div>
        <btnTYPE @typeData="typeData"></btnTYPE>
        <div class="content-warp" v-show="type==0">
            <div v-for="(item, index) of rToolCom.content_config" :key="index">
                <component :is="item.component.name" :configObj="configObj" :configName="item.configName"></component>
            </div>
        </div>
        <div class="style-warp" v-show="type==1">
            <div v-for="(item, index) of rToolCom.style_config" :key="index">
                <component :is="item.component.name" :configObj="configObj" :configName="item.configName"></component>
            </div>
        </div>
    </div>
</template>
<script>
import toolConfig from "../itemConfig";
import btnTYPE from '../commonBtn/type_btn.vue'
export default {
    name: "c_logo",
    components: {
        ...toolConfig,
        btnTYPE
    },
    props: {
        num: {
            type: null,
        },
        index: {
            type: null,
        },
        activeIndex: {
            type: null,
        },
    },
    data() {
        return {
            type: 0,
            configObj: {},
            rToolCom: {
                content_config: [
                     {
                        component: toolConfig.text_config,
                        configName: "text_config",
                    },
                    {
                        component: toolConfig.link_config,
                        configName: "link_config",
                    },
                    {
                        component: toolConfig.image_config,
                        configName: "image_config",
                    },
                ],
                style_config: [ 
                    {
                        component: toolConfig.style_config,
                        configName: "style_config",
                    },
                    {
                        component: toolConfig.pd_position_config,
                        configName: "pd_position_config",
                    }
                ],
            },
        };
    },
    watch: {
        num: {
            handler: function (nval) {
                console.log(nval,45645646)
                // 记录每次添加组件时所保留的默认配置信息
                this.configObj = JSON.parse(JSON.stringify(this.$store.state.adminConfig.defaultArray[nval])
                );
            },
            deep: true,
        },
        configObj: {
            // 对应组件数组更新
            handler: function (nval) {
                this.$store.commit("adminConfig/UPDATEARRAY", {
                    num: this.num,
                    val: nval,
                });
            },
            deep: true,
        },
    },
    methods: {
        typeData(data) {
            this.type = data;
        }
    },
    mounted() {
        this.$nextTick(() => {
            if(this.$store.state.adminConfig.defaultArray[this.num]){
                 this.configObj = JSON.parse(
                JSON.stringify(this.$store.state.adminConfig.defaultArray[this.num])
            );
            }
        });
    },
};
</script>
<style scoped>
</style>



