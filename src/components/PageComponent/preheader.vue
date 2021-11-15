<template>
  <table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tbody>
      <tr>
        <td :style="bgColor">
          <table border="0" cellspacing="0" cellpadding="0" width="100%">
            <tbody>
              <tr>
                <td :style="pdStyle">
                  <table border="0" cellspacing="0" cellpadding="0" width="100%">
                    <tbody>
                      <tr>
                        <td :style="titleStyle">
                          <span>{{ titleText }}</span>
                          <a target="_blank" href="*[link_viewinbrowser]*" :style="linkStyle"><span>
                              {{ linkText }}</span></a>
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
</template>
<script>
  import {
    mapState
  } from "vuex";
  export default {
    name: "Preheader",
    cname: "Preheader",
    configName: "c_preheader",
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
      ...mapState("siteConfig", ["currentSiteName"]),
    },
    data() {
      return {
        defaultConfig: {
          name: "Preheader",
          timestamp: this.num,
          content_setting: {
            text_config: {
              title: "TEXT",
              value: "View Web Version",
            },
            link_text_config: {
              title: "LINKText",
              value: "Report Abuse",
            },
            link_config: {
              title: "LINK",
              value: "link",
            },
          },
          style_setting: {
            select_config: {
              title: "TYPE",
              options: [{
                  label: "center",
                  value: "center",
                },
                {
                  label: "left",
                  value: "left",
                },
                {
                  label: "right",
                  value: "right",
                },
              ],
              value: "center",
            },
            style_config: {
              text: {
                color: "#999999",
                font_size: "13",
                font_weight: "normal"
              },
              link: {
                color: "#999999",
                font_size: "13",
                font_weight: "normal",
              },
              background: {
                bgImage: '',
                pattern: '',
                color: '#fff'
              },
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
          },
        },
        pageData: {},
        titleText: "",
        linkUrl: "",
        linkText: '',
        titleStyle: {
          color: "#999999",
          fontSize: "13px",
          fontWeight: "normal",
          lineHeight: "115%",
          textAlign: "right",
          textDecoration: "none",
        },
        linkStyle: {
          color: "#cc3366",
          fonFamily: "Arial, sans-serif",
          fontSize: "13px",
          fontWeight: "normal",
          lineHeight: "115%",
          textDecoration: "none",
        },
        bgColor: {
          background: "",
          backgroundImage: "",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
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
        handler() {
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
          this.titleText = data.content_setting.text_config.value;
          this.linkUrl = "https://" + data.content_setting.link_config.value;
          this.titleStyle["textAlign"] = data.style_setting.select_config.value;
          this.bgColor["background"] = data.style_setting.style_config.background.color
          this.bgColor["backgroundImage"] = `url(${data.style_setting.style_config.background.bgImage})`;
          this.linkStyle.color = data.style_setting.style_config.link.color;
          this.linkStyle.fontWeight = data.style_setting.style_config.link.font_weight;
          this.linkStyle.fontSize = data.style_setting.style_config.link.font_size + 'px';
          this.titleStyle.color = data.style_setting.style_config.text.color;
          this.titleStyle.fontWeight = data.style_setting.style_config.text.font_weight;
          this.titleStyle.fontSize = data.style_setting.style_config.text.font_size + 'px';
          this.linkText = data.content_setting.link_text_config.value;
          this.pdStyle.paddingTop = data.style_setting.pd_position_config.pd_style[0]['value'] + 'px';
          this.pdStyle.paddingBottom = data.style_setting.pd_position_config.pd_style[1]['value'] + 'px';
          this.pdStyle.paddingLeft = data.style_setting.pd_position_config.pd_style[2]['value'] + 'px';
          this.pdStyle.paddingRight = data.style_setting.pd_position_config.pd_style[3]['value'] + 'px';
        }
      },
    },
    mounted() {
      this.$nextTick(() => {
        if (this.$store.state.adminConfig.defaultArray[this.num]) {
          this.pageData = JSON.parse(
            JSON.stringify(this.$store.state.adminConfig.defaultArray[this.num])
          );
          this.setConfig(this.pageData);
        }
      });
    },
  };
</script>