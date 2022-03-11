<template>
    <div class="cb  cb-menu">
      <table border="0" cellspacing="0" cellpadding="0" width="100%" :style="bgStyle">
          <tbody>
              <tr>
                  <td :style="pdLRStyle">
                      <table border="0" cellspacing="0" cellpadding="0" width="100%" :style="bgStyle" bgcolor="#fff"
                          background="">
                          <tbody>
                              <tr>
                                  <td :style="pdBTStyle">
                                      <table border="0" cellspacing="0" cellpadding="0" width="100%" 
                                          bgcolor="#fff" background="">
                                          <tbody>
                                              <tr>
                                                  <td :style="borderStyle">
                                                    
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
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
      name: "SplitLine",
      cname: "SplitLine",
      configName: "c_SplitLine",
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
            name: "SplitLine",
            timestamp: this.num,
            content_setting: {
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
                    label: 'TOP',
                    value: '20'
                  },
                  {
                    label: 'BOTTOM',
                    value: '20'
                  },
                  {
                    label: 'RIGHT',
                    value: '0'
                  },
                  {
                    label: 'LEFT',
                    value: '0'
                  }
                ]
              },
              style_config: {
                background: {
                  bgImage: '',
                  pattern: '',
                  color: '#fff'
                },
                border: {
                  border_top_color: '#666666',
                  border_top_width: '1',
                  border_top_style: 'solid',
                }
              }
            },
          },
          pageData: {},
          imgaUrl: "",
          bgStyle: {
            backgroundColor: '#fff',
            backgroundImage: 'url()',
          },
          pdLRStyle: {
            paddingLeft: '0',
            paddingRight: '0',
          },
          pdBTStyle: {
            paddingTop: '15px',
            paddingBottom: '15px',
          },
          borderStyle: {
            borderTopColor: '#666666',
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
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
        defaultArray: {
          handler() {
            let data = this.$store.state.adminConfig.defaultArray[this.num];
            this.setConfig(data);
          },
          deep: true,
        }
      },
      methods: {
        setConfig(data) {
          if (data) {
            this.bgStyle.backgroundColor = data.style_setting.style_config.background.color;
            this.bgStyle.backgroundImage = `url(${data.style_setting.style_config.background.bgImage})`;
            this.pdBTStyle.paddingTop = data.style_setting.pd_position_config.pd_style[0]['value'] + 'px';
            this.pdBTStyle.paddingBottom = data.style_setting.pd_position_config.pd_style[1]['value'] + 'px';
            this.pdLRStyle.paddingLeft = data.style_setting.pd_position_config.pd_style[2]['value'] + 'px';
            this.pdLRStyle.paddingRight = data.style_setting.pd_position_config.pd_style[3]['value'] + 'px';
            // border style
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
        }, 20);
      },
    };
  </script>
  <style scoped>
  </style>