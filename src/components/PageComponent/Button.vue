<template>
        <table border="0" cellspacing="0" cellpadding="0" width="100%">
            <tbody>
                <tr>
                    <td :style="bgStyle">
                        <table border="0" cellspacing="0" cellpadding="0" width="100%">
                            <tbody>
                                <tr>
                                    <td :style="pdStyle">
                                        <div  style="display: table; width: 100%;">
                                            <div  style="display: table-row;">
                                                <!--[if (mso)|(IE)]><table border="0" cellspacing="0" cellpadding="0" width="100%"><tr><![endif]-->
                                                <!--[if (mso)|(IE)]><td style="width: 600px; vertical-align: top;"><![endif]-->
                                                <template v-for="(item,index) of titleAndLink">
                                                    <div  v-if="index==1 || index==2 || index == 3"  style="display: table-cell; width: 20px; vertical-align: top;"  :key="index"></div>
                                                    <div :style="{display: 'table-cell',verticalAlign: 'top',width:titleAndLink.length==1?'580px':titleAndLink.length==2?'280px':titleAndLink.length==3?'180px':'130px'}" :key="index">
                                                        <table border="0" cellpadding="0" cellspacing="0"  :align="btnType" :width="btnType" style="margin: 0 auto; border-collapse: separate !important;">
                                                            <tbody>
                                                                <tr>
                                                                    <td :style="styleData.button.style">
                                                                        <!--[if (mso)|(IE) ]><table border="0" cellpadding="0" cellspacing="0"><tr><td style="line-height: 17px;text-align: center;"><![endif]-->
                                                                        <!--[if !mso]><!-->
                                                                        <div style="text-align: center;">
                                                                            <!--<![endif]-->
                                                                            <a :style="styleData.button.text" target="_blank" :href="item.linkItem.value"><span>{{item.textItem.value}}</span></a>
                                                                            <!--[if !mso]><!-->
                                                                        </div>
                                                                        <!--<![endif]-->
                                                                        <!--[if (mso)|(IE) ]></td></tr></table><![endif]-->
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </template>
                                                <!--[if (mso)|(IE)]></td><![endif]-->
                                                <!--[if (mso)|(IE)]></tr></table><![endif]-->
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
</template>
<script>
    import { mapState } from "vuex";
    export default {
        name: "Button",
        cname: "Button",
        configName: "c_button",
        props: {
            num: {
                type: null,
            },
            index: {
                type: null,
            },
        },
        computed: {
            ...mapState("adminConfig", ["defaultArray"]),
            ...mapState("siteConfig", ["track"]),
        },
        data() {
            return {
                defaultConfig: {
                    name: "Button",
                    timestamp: this.num,
                    content_setting: {
                        add_item_config: {
                            linkArr: [
                                {
                                    textItem: {
                                        label: 'TEXT',
                                        value: 'READ MORE'
                                    },
                                    linkItem: {
                                        label: 'LINK',
                                        value: 'LINK'
                                    }
                                }
                            ]
                        },
                    },
                    style_setting: {
                        select_config: {
                            title: "TYPE",
                            options: [{
                                label: "Left",
                                value: "left",
                            },
                            {
                                label: "Right",
                                value: "right",
                            },
                            {
                                label: "Center",
                                value: "center",
                            },
                            {
                                label: "Full width",
                                value: "100%",
                            },
                            ],
                            value: "center",
                        },
                        bg_color_config: {
                            title: "background",
                            bgColor: "#fff"
                        },
                        pd_position_config: {
                            title: 'POSITION',
                            pd_style: [
                                {
                                    label: 'TOP',
                                    value: '20'
                                },
                                {
                                    label: 'BOTTOM',
                                    value: '20'
                                },
                                {
                                    label: 'RIGHT',
                                    value: '20'
                                },
                                {
                                    label: 'LEFT',
                                    value: '20'
                                }
                            ]
                        },
                        style_config: {
                            background: {
                                bgImage: '',
                                pattern: '',
                                bgColor: '#fff'
                            },
                            button: {
                                color: "#999999",
                                font_size: "13",
                                font_weight: "normal",
                                top_padding: '10',
                                bottom_padding: '10',
                                left_padding: '20',
                                right_padding: '20',
                                border_width: '1',
                                border_style: 'solid',
                                border_color: '#999',
                                border_radius: '0',
                                bgColor: '#fff',
                                fontFamily:'cursive',
                                lineHeight:'1.2'
                            },
                        }
                    },
                },
                pageData: {},
                titleAndLink: [],
                imgaUrl: "",
                btnType:'',
                bgStyle: {
                    backgroundColor: '#fff',
                    backgroundImage: 'url()',
                    backgroundSize:"cover"
                },
                pdStyle: {
                    paddingTop: '',
                    paddingBottom: '',
                    paddingLeft: '',
                    paddingRight: '',
                },
                styleData: {
                    button: {
                        text: {
                            color: "#999999",
                            fontSize: "13px",
                            fontWeight: "normal",
                            textDecoration: 'none',
                            fontFamily:'cursive',
                            lineHeight:'1.2'
                        },
                        style: {
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            paddingLeft: '25px',
                            paddingRight: '25px',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderRadius: '0',
                            borderColor: 'red',
                            backgroundColor: '#fff',
                            backgroundImage: 'url()',
                            backgroundSize:"cover"
                        },
                    },
                    backgroundColor: {
                        backgroundColor: '#fff',
                        backgroundImage: 'url()',
                        backgroundSize:"cover"
                    },
                    backgroundImage: {
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: '#000'
                    }
                }
            };
        },
        watch: {
            num: {
                handler() {
                    let data = this.$store.state.adminConfig.defaultArray[this.num];
                    this.setConfig(data);
                },
                deep: true,
            },
            pageData: {
                handler(nval) {
                    this.setConfig(nval);
                },
                deep: true,
            },
            track: {
                handler(nval) {
                    if (nval) {
                        let track = nval;
                        let copyData = JSON.parse(JSON.stringify(this.cacheData));
                        copyData.map(item => {
                            let cache = item.linkItem.value;
                            item.linkItem.value = `${cache}?${track}&utm_content=button${item.textItem.value}&utm_adset=button`;
                        })
                        this.titleAndLink = copyData;
                    }
                },
                deep: true,
            },
            defaultArray: {
                handler() {
                    let data = this.$store.state.adminConfig.defaultArray[this.num];
                    this.setConfig(data);
                },
                deep: true,
            },
        },
        methods: {
            trackConfig(data) {
                let track = this.$store.state.siteConfig.track;
                let copyData = JSON.parse(JSON.stringify(data));
                copyData.map(item => {
                    let cache = item.linkItem.value;
                    item.linkItem.value = `${cache}?${track}&utm_content=button${item.textItem.value}&utm_adset=button`;
                })
                this.titleAndLink = copyData;
            },
            setConfig(data) {
                if (data) {
                    this.titleAndLink = data.content_setting.add_item_config.linkArr;
                    this.cacheData = data.content_setting.add_item_config.linkArr;
                    this.trackConfig(data.content_setting.add_item_config.linkArr);
                    this.bgStyle.backgroundColor = data.style_setting.style_config.background.bgColor;
                    this.bgStyle.backgroundImage = `url(${data.style_setting.style_config.background.bgImage})`;

                    this.pdStyle.paddingTop = data.style_setting.pd_position_config.pd_style[0]['value'] + 'px';
                    this.pdStyle.paddingBottom = data.style_setting.pd_position_config.pd_style[1]['value'] + 'px';
                    this.pdStyle.paddingLeft = data.style_setting.pd_position_config.pd_style[2]['value'] + 'px';
                    this.pdStyle.paddingRight = data.style_setting.pd_position_config.pd_style[3]['value'] + 'px';

                    this.styleData.button.text.color = data.style_setting.style_config.button.color;
                    this.styleData.button.text.fontSize = data.style_setting.style_config.button.font_size + 'px';
                    this.styleData.button.text.fontWeight = data.style_setting.style_config.button.font_weight;
                    this.styleData.button.text.fontFamily = data.style_setting.style_config.button.fontFamily;
                    this.styleData.button.text.lineHeight = data.style_setting.style_config.button.lineHeight;
                    

                    this.styleData.button.style.backgroundColor = data.style_setting.style_config.button.bgColor;
                    this.styleData.button.style.backgroundImage = `url(${data.style_setting.style_config.button.bgImage})`;

                    this.styleData.button.style.borderWidth = data.style_setting.style_config.button.border_width + 'px';
                    this.styleData.button.style.borderStyle = data.style_setting.style_config.button.border_style;
                    this.styleData.button.style.borderColor = data.style_setting.style_config.button.border_color;
                    this.styleData.button.style.paddingBottom = data.style_setting.style_config.button.bottom_padding + 'px';
                    this.styleData.button.style.paddingTop = data.style_setting.style_config.button.top_padding + 'px';
                    this.styleData.button.style.paddingLeft = data.style_setting.style_config.button.left_padding + 'px';
                    this.styleData.button.style.paddingRight = data.style_setting.style_config.button.right_padding + 'px';
                    this.styleData.button.style.borderRadius = data.style_setting.style_config.button.border_radius + 'px';

                    /** btntype**/
                    this.btnType = data.style_setting.select_config.value;
                }
            },
        },
        mounted() {
            this.$nextTick(() => {
                if (this.$store.state.adminConfig.defaultArray[this.num]) {
                    this.pageData = JSON.parse(JSON.stringify(this.$store.state.adminConfig.defaultArray[this.num]));
                    this.setConfig(this.pageData);
                }
            }, 20);
        },
    };
</script>
<style scoped>
</style>