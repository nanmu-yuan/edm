<template>
  <div class="banner">
    <table border="0" cellspacing="0" cellpadding="0" width="100%">
      <tbody>
        <tr>
          <td :style="styleData.backgroundColor">
            <table border="0" cellspacing="0" cellpadding="0" width="100%">
              <tbody>
                <tr>
                  <td :style="pdStyle">
                    <div v-if="rowNum==1">
                      <colum1 :list="productList" :fontStyle="styleData"></colum1>
                    </div>
                    <div v-else-if="rowNum==2">
                      <colum2 :list="productList"></colum2>
                    </div>
                    <div v-else-if="rowNum==3">
                      <colum3 :list="productList"></colum3>
                    </div>
                    <div v-else-if="rowNum==4">
                      <colum4 :list="productList"></colum4>
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
  import colums from '../columBlock'
  export default {
    name: "product",
    cname: "product",
    configName: "c_product",
    props: {
      num: {
        type: null,
      },
      index: {
        type: null,
      },
    },
    components: {
      ...colums
    },
    computed: {
      ...mapState("adminConfig", ["defaultArray"]),
      ...mapState("siteConfig", ["currentSiteName", "siteInfo"]),
    },
    data() {
      return {
        defaultConfig: {
          name: "product",
          timestamp: this.num,
          content_setting: {
            spu_config: {
              title: "SPU",
              value: "Please input spu",
              list: []
            }
          },
          style_setting: {
            bg_color_config: {
              title: "background",
              bgColor: "#fff"
            },
            select_config: {
              title: "TYPE",
              options: [{
                  label: "1 product in a row",
                  value: "1",
                },
                {
                  label: "2 product in a row",
                  value: "2",
                },
                {
                  label: "3 product in a row",
                  value: "3",
                },
                {
                  label: "4 product in a row",
                  value: "4",
                },
              ],
              value: "1",
            },
            pd_position_config: {
              title: 'POSITION',
              pd_style: [{
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
              describe: {
                color: "#333",
                font_size: "20",
                font_weight: "bold",
              },
              button: {
                color: "#999999",
                font_size: "13",
                font_weight: "normal",
                top_padding: '10',
                bottom_padding: '10',
                border_width: '1',
                border_style: 'solid',
                border_color: '#999',
                border_radius: '0'
              },
              price: {
                color: "red",
                font_size: "22",
                font_weight: "bold",
              },
              marketPrice: {
                color: "#999999",
                font_size: "13",
                font_weight: "normal",
              },
              background: {
                bgImage: '',
                pattern:'',
                color: '#fff'
              },
              image: {
                border_width: '1',
                border_style: 'solid',
                color: '#999',
              }
            }
          },
        },
        pageData: {},
        rowNum: '4',
        bgStyle: {
          background: ''
        },
        pdStyle: {
          paddingTop: '',
          paddingBottom: '',
          paddingLeft: '',
          paddingRight: '',
        },
        productList: [],
        styleData: {
          describe: {
            color: "#333",
            fontSize: "18px",
            fontWeight: "normal",
            textDecoration: 'none'
          },
          price: {
            color: "#999999",
            fontSize: "13px",
            fontWeight: "normal",
          },
          marketPrice: {
            color: "#999999",
            fontSize: "13px",
            fontWeight: "normal",
            textDecoration: 'line-through'
          },
          button: {
            text: {
              color: "#999999",
              fontSize: "13px",
              fontWeight: "normal",
            },
            border: {
              paddingTop: '10px',
              paddingBottom: '10px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: '0',
              borderColor: 'red',
              paddingRight: '17px',
              paddingLeft: '17px',
            }
          },
          backgroundColor:{
            backgroundColor:'#fff',
            backgroundImage:'url()',
          },
          backgroundImage:{
            borderWidth:'1px',
            borderStyle:'solid',
            borderColor:'#000'
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
      defaultArray: {
        handler() {
          let data = this.$store.state.adminConfig.defaultArray[this.num];
          this.setConfig(data);
        },
        deep: true,
      },
      currentSiteName: {
        handler() {},
        deep: true
      }
    },
    methods: {
      setConfig(data) {
        if (data) {
          this.rowNum = data.style_setting.select_config.value;
          this.bgStyle.background = data.style_setting.bg_color_config.color;
          this.pdStyle.paddingTop = data.style_setting.pd_position_config.pd_style[0]['value'] + 'px';
          this.pdStyle.paddingBottom = data.style_setting.pd_position_config.pd_style[1]['value'] + 'px';
          this.pdStyle.paddingLeft = data.style_setting.pd_position_config.pd_style[2]['value'] + 'px';
          this.pdStyle.paddingRight = data.style_setting.pd_position_config.pd_style[3]['value'] + 'px';
          this.productList = data.content_setting.spu_config.list;
          this.styleData.describe.color = data.style_setting.style_config.describe.color;
          this.styleData.describe.fontSize = data.style_setting.style_config.describe.font_size + 'px';
          this.styleData.describe.fontWeight = data.style_setting.style_config.describe.font_weight;
          this.styleData.price.color = data.style_setting.style_config.price.color;
          this.styleData.price.fontSize = data.style_setting.style_config.price.font_size + 'px';
          this.styleData.price.fontWeight = data.style_setting.style_config.price.font_weight;
          this.styleData.marketPrice.color = data.style_setting.style_config.marketPrice.color;
          this.styleData.marketPrice.fontSize = data.style_setting.style_config.marketPrice.font_size + 'px';
          this.styleData.marketPrice.fontWeight = data.style_setting.style_config.marketPrice.font_weight;
          this.styleData.button.text.color = data.style_setting.style_config.button.color;
          this.styleData.button.text.fontSize = data.style_setting.style_config.button.font_size + 'px';
          this.styleData.button.text.fontWeight = data.style_setting.style_config.button.font_weight;
          this.styleData.button.border.borderWidth = data.style_setting.style_config.button.border_width + 'px';
          this.styleData.button.border.borderStyle = data.style_setting.style_config.button.border_style;
          this.styleData.button.border.borderColor = data.style_setting.style_config.button.color;
          this.styleData.button.border.paddingBottom = data.style_setting.style_config.button.bottom_padding + 'px';
          this.styleData.button.border.paddingTop = data.style_setting.style_config.button.top_padding + 'px';
          this.styleData.button.border.borderRadius = data.style_setting.style_config.button.border_radius + 'px';
          this.styleData.backgroundColor.backgroundColor = data.style_setting.style_config.background.color;
          this.styleData.backgroundColor.backgroundImage = `url(${data.style_setting.style_config.background.bgImage})`;
          this.styleData.backgroundImage.borderColor = data.style_setting.style_config.image.color;
          this.styleData.backgroundImage.borderStyle = data.style_setting.style_config.image.border_style;
          this.styleData.backgroundImage.borderWidth = data.style_setting.style_config.image.border_width + 'px';
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
    padding-bottom: 10px;
  }
</style>