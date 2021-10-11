<template>
  <div>
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tbody>
        <tr>
          <td :style="bgStyle">
            <table width="100%" border="0" cellpadding="0" cellspacing="0">
              <tbody>
                <tr>
                  <td :style="pdStyle">
                    <div style="display: table; width: 100%">
                      <div style="display: table-row">
                        <div style="display: table-cell">
                          <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                              <tr>
                                <td>
                                  <a target="_blank" href="" style="text-decoration: none">
                                    <span class="image-placeholder" v-if="!imgaUrl">
                                      <span class="placeholder-style" style="width: 200px; height: 50px;">
                                        <span class="placeholder-inner">
                                          <span class="placeholder-inner placeholder-img-small">
                                            <img src="../../assets/images/placeholder-img50.png" width="25">
                                          </span>
                                        </span>
                                      </span>
                                    </span>
                                    <img v-else alt="" border="0" v-lazy="imgaUrl" width="200" height="70" />
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div style="display: table-cell;vertical-align: middle;width: 300px;" width="300">
                          <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                              <tr>
                                <td width="300" style="width: 300px">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tbody>
                                      <tr>
                                        <td style="color: #656565;font-family: Arial, sans-serif;font-size: 11px;font-weight: normal;line-height: 127%;text-align: right;text-decoration: none;">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tbody>
                                              <tr>
                                                <td style="text-decoration: none;color: #656565;font-family: Arial, sans-serif;font-size: 11px; font-weight: normal;line-height: 127%;text-align: right;">
                                                  {{titleText}}
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
  name: "logo",
  cname: "logo",
  configName: "c_logo",
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
        name: "logo",
        timestamp: this.num,
        content_setting: {
          text_config: {
            title: "TEXT",
            value: "Enter a title",
          },
          link_config: {
            title: "LINK",
            value: "link",
          },
          image_config: {
            title: "IMAGE",
            value: "",
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
        this.titleText = data.content_setting.text_config.value;
        this.imgaUrl = data.content_setting.image_config.value;
        this.bgStyle.background = data.style_setting.bg_color_config.bgColor;
        this.pdStyle.paddingTop = data.style_setting.pd_position_config.pd_style[0]['value'] + 'px';
        this.pdStyle.paddingBottom = data.style_setting.pd_position_config.pd_style[1]['value'] + 'px';
        this.pdStyle.paddingLeft = data.style_setting.pd_position_config.pd_style[2]['value'] + 'px';
        this.pdStyle.paddingRight = data.style_setting.pd_position_config.pd_style[3]['value'] + 'px';
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.pageData = JSON.parse(JSON.stringify(this.$store.state.adminConfig.defaultArray[this.num]));
      this.setConfig(this.pageData);
    },20);
  },
};
</script>
<style scoped>
.image-placeholder {
  display: inline-block;
}
.image-placeholder .placeholder-style {
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
.image-placeholder .placeholder-img-small {
  padding-bottom: 10px;
}
</style>