<template>
  <div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%" :style="bgStyle">
      <tbody>
        <tr>
          <td :style="borderStyle">
            <table border="0" cellspacing="0" cellpadding="0" width="100%">
              <tbody>
                <tr>
                  <td :style="pdStyle">
                    <div style="display: table; width: 100%;" width="100%">
                      <div style="display: table-row;">
                        <!--[if (gte mso 9)|(IE)]><table border="0" cellspacing="0" cellpadding="0" width="100%" align="center"><tr><td style=" vertical-align: top;width: 100%;" width="100%"><![endif]-->
                        <div style="display: table-cell;">
                          <table border="0" cellspacing="0" cellpadding="0" width="100%">
                            <tbody>
                              <tr>
                                <td class="ql-editor" style="color:#656565;font-family:Arial, sans-serif;font-size:12px;font-weight:normal;line-height:117%;text-align:left;text-decoration:none;">
                                   <div v-html = "content"></div>
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
    name: "Footer",
    cname: "Footer",
    configName: "c_footer",
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
          name: "Footer",
          timestamp: this.num,
          content_setting: {
            editor_config: {
              content:`
              <p class = "ql-align-center">Unit 1402A 14/F The Belgian bank bldg NOS721-725 Nathan RD Mongkok Kowloon.HK</p>
              <p class = "ql-align-center">Suite 10c,17-23 Queen Street,Deal, Kent,United Kingdom CT14 6EY</p>
              <p class = "ql-align-center">Copyright © 2021. SITENAME. All Rights Reserved.<p>`
            },
            image_config: {
              title: "IMAGE",
              value: "",
            },
          },
          style_setting: {
            style_config: {
            background: {
            bgImage: '',
            pattern: '',
            color: '#fff'
            },
            border: {
                border_top_color: '#666666',
                border_top_width: '2',
                border_top_style: 'solid',
                border_bottom_color: '#000',
                border_bottom_width: '6',
                border_bottom_style: 'solid',
              }
            },
            pd_position_config: {
              title: 'POSITION',
              pd_style: [
                {
                  label: 'TOP',
                  value: '10'
                },
                {
                  label: 'BOTTOM',
                  value: '10'
                },
                {
                  label: 'RIGHT',
                  value: '15'
                },
                {
                  label: 'LEFT',
                  value: '15'
                }
              ]

            }
          },
        },
        pageData: {},
        titleText: "",
        content:'',
        linkText: "",
        imageUrl: '',
        bgStyle: {
          backgroundColor: '#000',
          backgroundImage: 'url()',
        },
        pdStyle: {
          paddingTop: '',
          paddingBottom: '',
          paddingLeft: '',
          paddingRight: '',
        },
        borderStyle: {
          borderBottomColor: '#666666',
          borderBottomWidth: '6px',
          borderBottomStyle: 'solid',
          borderTopColor: '#666666',
          borderTopWidth: '1px',
          borderTopStyle: 'solid',
        }
      };
    },
    watch: {
      num: {
        handler(nval) {

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
        handler() {
          let data = this.$store.state.adminConfig.defaultArray[this.num];
          this.setConfig(data);
        },
        deep: true,
      },
    },
    methods: {
      setConfig(data) {
        if (data) {
          this.content = data.content_setting.editor_config.content;
          this.bgStyle.backgroundColor = data.style_setting.style_config.background.color;
          this.bgStyle.backgroundImage = `url(${data.style_setting.style_config.background.bgImage})`;
          this.pdStyle.paddingTop = data.style_setting.pd_position_config.pd_style[0]['value'] + 'px';
          this.pdStyle.paddingBottom = data.style_setting.pd_position_config.pd_style[1]['value'] + 'px';
          this.pdStyle.paddingLeft = data.style_setting.pd_position_config.pd_style[2]['value'] + 'px';
          this.pdStyle.paddingRight = data.style_setting.pd_position_config.pd_style[3]['value'] + 'px';


          this.borderStyle.borderBottomColor = data.style_setting.style_config.border.border_bottom_color;
          this.borderStyle.borderBottomWidth = data.style_setting.style_config.border.border_bottom_width + 'px';
          this.borderStyle.borderBottomStyle = data.style_setting.style_config.border.border_bottom_style;

          this.borderStyle.borderTopColor = data.style_setting.style_config.border.border_top_color;
          this.borderStyle.borderTopWidth = data.style_setting.style_config.border.border_top_width + 'px';
          this.borderStyle.borderTopStyle = data.style_setting.style_config.border.border_top_style;
        }
      },
    },
    mounted() {
      this.$nextTick(() => {
        if (this.$store.state.adminConfig.defaultArray[this.num]) {
          this.pageData = JSON.parse(JSON.stringify(this.$store.state.adminConfig.defaultArray[this.num]));
          this.setConfig(this.pageData);
        }
      });
    },
  };
</script>
<style scoped>
  .placeholder-style {
    background-color: #f2f2f2;
    color: #b6b6b6;
    font-family: Arial, sans-serif;
    text-align: center;
    font-size: 12px;
    position: relative;
    min-width: 40px;
    min-height: 40px;
    display: inline-block;
    vertical-align: top;
  }

  .placeholder-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    margin: auto;
    width: 100%;
  }

  img[lazy="loading"] {
    display: block;
    width: 50px !important;
    height: 50px !important;
    margin: 0 auto;
  }
</style>