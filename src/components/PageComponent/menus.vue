<template>
  <div class="cb  cb-menu">
    <table border="0" cellspacing="0" cellpadding="0" width="100%" style="background-color:#fafafa;" bgcolor="#fafafa" background="">
      <tbody>
        <tr>
          <td style="padding-left:0px;padding-right:0px;">
            <table border="0" cellspacing="0" cellpadding="0" width="100%" style="background-color:#fafafa;" bgcolor="#fafafa" background="">
              <tbody>
                <tr>
                  <td style="border-bottom:0 solid #eaeaea;border-top:2px solid #eaeaea;">
                    <div style="display: table; margin: 0 auto;" class="mobile-block mobile-container">
                      <div style="display: table-row;">
                        <div style="display: table-cell;" class="mobile-block mobile-container">
                          <table border="0" cellspacing="0" cellpadding="0" width="100%" style="text-align: center;">
                            <tbody>
                              <tr>
                                <td class="mobile-menu-
                                
                
                                item-cell" style="padding-bottom:13px;padding-top:13px;; padding-left: 10px; padding-right: 10px;">
                                  <table border="0" cellspacing="0" cellpadding="0" width="100%">
                                    <tbody>
                                      <tr>
                                        <td class="mobile-text-center webfont-fallback-1" style="color:#656565;font-family:Arial, sans-serif;font-size:14px;font-weight:normal;line-height:114%;text-decoration:none;"><a class="webfont-fallback-1" target="_blank" style="color:#656565;font-family:Arial, sans-serif;font-size:14px;font-weight:normal;line-height:114%;text-decoration:none;" href=""><span>LINK</span></a></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
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
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "menus",
  cname: "menus",
  configName: "c_menus",
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
  },
  data() {
    return {
      defaultConfig: {
        name: "menu",
        timestamp: this.num,
        content_setting: {
          add_item_config: {
            linkArr:[
              {
                textItem:{
                  label:'TEXT',
                  value:'LINK'
                },
                linkItem:{
                  label:'LINK',
                  value:'LINK'
                }
              }
            ]
          },
        },
        style_setting: {
          bg_color_config: {
            title: "background",
            bgColor: "#fff"
          },
          pd_position_config: {
            title: 'POSITION',
            pd_style: [
              {
                label: 'PADDING TOP',
                value: '20'
              },
              {
                label: 'PADDING BOTTOM',
                value: '20'
              },
              {
                label: 'PADDING RIGHT',
                value: '20'
              },
              {
                label: 'PADDING LEFT',
                value: '20'
              }
            ]

          }
        },
      },
      pageData: {},
      titleText: "",
      linkText: "",
      imgaUrl: "",
      bgStyle: {
        background: ''
      },
      pdStyle: {
        paddingTop: '',
        paddingBottom: '',
        paddingLeft: '',
        paddingRight: '',
      }
    };
  },
  watch: {
    num: {
      handler(nval) {
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
    defaultArray: {
      handler(nval) {
        let data = this.$store.state.adminConfig.defaultArray[this.num];
        this.setConfig(data);
      },
      deep: true,
    },
  },
  methods: {
    setConfig(data) {
      if (data) {
        // this.titleText = data.content_setting.text_config.value;
        // this.bgStyle.background = data.style_setting.bg_color_config.bgColor;
        // this.pdStyle.paddingTop = data.style_setting.pd_position_config.pd_style[0]['value'] + 'px';
        // this.pdStyle.paddingBottom = data.style_setting.pd_position_config.pd_style[1]['value'] + 'px';
        // this.pdStyle.paddingLeft = data.style_setting.pd_position_config.pd_style[2]['value'] + 'px';
        // this.pdStyle.paddingRight = data.style_setting.pd_position_config.pd_style[3]['value'] + 'px';
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.pageData = JSON.parse(JSON.stringify(this.$store.state.adminConfig.defaultArray[this.num]));
      this.setConfig(this.pageData);
    }, 20);
  },
};
</script>
<style scoped>
</style>