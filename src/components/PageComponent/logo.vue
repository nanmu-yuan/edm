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
                                <td :style="btnType">
                                  <a target="_blank" :href="logoLink" style="text-decoration: none">
                                    <span class="image-placeholder" v-if="!imgaUrl">
                                      <span class="placeholder-style"
                                        :style="{width: '200px',height: logoStyle.height}">
                                        <span class="placeholder-inner">
                                          <span class="placeholder-inner placeholder-img-small">
                                            <img src="../../assets/images/placeholder-img50.png"
                                              :height="logoStyle.height">
                                          </span>
                                        </span>
                                      </span>
                                    </span>
                                    <img v-else alt="" border="0" :height="logoStyle.height" v-lazy="imgaUrl" />
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!-- <div style="display: table-cell;vertical-align: middle;width: 300px;" width="300">
                          <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                              <tr>
                                <td width="300" style="width: 300px">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tbody>
                                      <tr>
                                        <td>
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tbody>
                                              <tr>
                                                <td :style="fontStyle">
                                                  {{titleText }}
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
                        </div> -->
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
  import {
    mapState
  } from "vuex";
  export default {
    name: "Logo",
    cname: "Logo",
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
      ...mapState("siteConfig", ["track"]),
    },
    data() {
      return {
        defaultConfig: {
          name: "Logo",
          timestamp: this.num,
          content_setting: {
            // text_config: {
            //   title: "TEXT",
            //   value: "Enter a title",
            // },
            // link_config: {
            //   title: "LINK",
            //   value: "link",
            // },
            image_config: {
              title: "IMAGE",
              value: "",
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
              }
              ],
              value: "center",
            },
            pd_position_config: {
              title: 'POSITION',
              pd_style: [{
                label: 'TOP',
                value: '10'
              },
              {
                label: 'BOTTOM',
                value: '10'
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
              text: {
                font_size: '12',
                color: '#000',
                font_weight: 'normal',
                textAlign: 'right',
                fontFamily: 'cursive'
              },
              background: {
                bgImage: '',
                pattern: '',
                color: '#fff'
              },
              logo: {
                height: '70'
              }
            }
          },
        },
        pageData: {},
        copyData: '',
        titleText: "123123",
        logoLink: "",
        imgaUrl: "",
        fontStyle: {
          fontSize: '12',
          color: '#000',
          fontWeight: 'normal',
          textAlign: 'right',
          fontFamily: 'cursive'
        },
        bgStyle: {
          backgroundColor: '#fff',
          backgroundImage: 'url()',
        },
        pdStyle: {
          paddingTop: '',
          paddingBottom: '',
          paddingLeft: '',
          paddingRight: '',
        },
        logoStyle: {
          height: '50px'
        },
        btnType:{
          textAlign:'center'
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
      track: {
        handler(nval) {
          if (nval) {
            let track = nval+'&utm_adset=logo&utm_content=logo';
            this.logoLink = `https://${this.$store.state.siteConfig.currentSiteName}.com?${track}`;
          }
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
      trackConfig(data) {
        let track = this.$store.state.siteConfig.track + '&utm_adset=logo&utm_content=logo';
       // let copyData = data;
        this.logoLink = `https://${this.$store.state.siteConfig.currentSiteName}.com?${track}`
      },
      setConfig(data) {
        if (data) {
          // this.titleText = data.content_setting.text_config.value;
          //this.copyData = `${data.content_setting.link_config.value}`;
          this.trackConfig();
          this.imgaUrl = data.content_setting.image_config.value;
          this.bgStyle.backgroundColor = data.style_setting.style_config.background.color;
          this.bgStyle.backgroundImage = `url(${data.style_setting.style_config.background.bgImage})`;
          this.pdStyle.paddingTop = data.style_setting.pd_position_config.pd_style[0]['value'] + 'px';
          this.pdStyle.paddingBottom = data.style_setting.pd_position_config.pd_style[1]['value'] + 'px';
          this.pdStyle.paddingLeft = data.style_setting.pd_position_config.pd_style[2]['value'] + 'px';
          this.pdStyle.paddingRight = data.style_setting.pd_position_config.pd_style[3]['value'] + 'px';
          this.fontStyle.fontSize = data.style_setting.style_config.text.font_size + 'px';
          this.fontStyle.color = data.style_setting.style_config.text.color;
          this.fontStyle.fontWeight = data.style_setting.style_config.text.font_weight;
          this.fontStyle.fontFamily = data.style_setting.style_config.text.fontFamily;
          this.logoStyle.height = data.style_setting.style_config.logo.height + 'px';
          this.btnType.textAlign = data.style_setting.select_config.value;
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
    padding: 5px
  }

  img[lazy="loading"] {
    display: block;
    width: 50px !important;
    height: 50px !important;
    margin: 0 auto;
  }
</style>