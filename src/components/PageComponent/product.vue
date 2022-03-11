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
                      <colum1 :list="productList" :fontStyle="styleData" :btnText='btnText'></colum1>
                    </div>
                    <div v-else-if="rowNum==2">
                      <colum2 :list="productList" :fontStyle="styleData" :btnText='btnText'></colum2>
                    </div>
                    <div v-else-if="rowNum==3">
                      <colum3 :list="productList" :fontStyle="styleData" :btnText='btnText'></colum3>
                    </div>
                    <div v-else-if="rowNum==4">
                      <colum4 :list="productList" :fontStyle="styleData" :btnText='btnText'></colum4>
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
    name: "Product",
    cname: "Product",
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
          name: "Product",
          timestamp: this.num,
          content_setting: {
            text_config: {
              title: "TEXT",
              value: "SHOW NOW",
            },
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
                font_size: "16",
                font_weight: "bold",
                fontFamily:'cursive',
                top_padding: '10',
                bottom_padding: '10',
              },
              button: {
                color: "#999999",
                font_size: "13",
                font_weight: "normal",
                top_padding: '10',
                bottom_padding: '10',
                left_padding: '17',
                right_padding: '17',
                fontFamily:'cursive',
                border_width: '1',
                border_style: 'solid',
                border_color: '#999',
                border_radius: '0',
                bgColor:'#fff',
                warp_top_padding: '10',
                warp_bottom_padding: '10',
              },
              price: {
                color: "red",
                font_size: "22",
                fontFamily:'cursive',
                font_weight: "bold",
                top_padding: '10',
                bottom_padding: '10',
              },
              marketPrice: {
                color: "#999999",
                font_size: "13",
                font_weight: "normal",
                fontFamily:'cursive'
              },
              background: {
                bgImage: '',
                pattern:'',
                bgColor: '#fff'
              },
              image: {
                border_width: '0',
                border_style: 'solid',
                border_color: '#999',
                top_padding: '0',
                bottom_padding: '2',
                right_padding: '0',
                left_padding: '0',
              }
            }
          },
        },
        btnText:{
          value:''
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
            fontSize: "16px",
            fontWeight: "normal",
            textDecoration: 'none',
            fontFamily:'cursive',
            display:'inline-block',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            width:'280px',
            padTopAndBottom:{
              paddingTop: '10',
              paddingBottom: '10',
            },
            span:{
              overflow: 'hidden',
            }  
          },
          price: {
            color: "#999999",
            fontSize: "13px",
            fontWeight: "normal",
            fontFamily:'cursive',
             padTopAndBottom:{
              paddingTop: '10',
              paddingBottom: '10',
            },
          },
          marketPrice: {
            color: "#999999",
            fontSize: "13px",
            fontWeight: "normal",
            textDecoration: 'line-through',
            fontFamily:'cursive'
          },
          button: {
            text: {
              color: "#999999",
              fontSize: "13px",
              fontWeight: "normal",
              textDecoration: 'none',
              fontFamily:'cursive',
            },
            padTopAndBottom:{
              paddingTop: '10',
              paddingBottom: '10',
            },
            border: {
              paddingTop: '10px',
              paddingBottom: '10px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: '0',
              borderColor: 'red',
              paddingRight: '10px',
              paddingLeft: '10px',
              backgroundColor:'#fff'
            },
          },
          backgroundColor:{
            backgroundColor:'#fff',
            backgroundImage:'url()',
            backgroundSize:'100%',
            backgroundRepeat: 'repeat-y'
          },
          backgroundImage:{
            borderWidth:'0px',
            borderStyle:'solid',
            borderColor:'#000'
          },
          imagePadding:{
              paddingTop: '0px',
              paddingBottom: '2px',
              paddingRight: '0px',
              paddingLeft: '0px',
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
          this.btnText.value = data.content_setting.text_config.value;
          this.rowNum = data.style_setting.select_config.value;
          this.bgStyle.background = data.style_setting.bg_color_config.bgColor;
          this.pdStyle.paddingTop = data.style_setting.pd_position_config.pd_style[0]['value'] + 'px';
          this.pdStyle.paddingBottom = data.style_setting.pd_position_config.pd_style[1]['value'] + 'px';
          this.pdStyle.paddingLeft = data.style_setting.pd_position_config.pd_style[2]['value'] + 'px';
          this.pdStyle.paddingRight = data.style_setting.pd_position_config.pd_style[3]['value'] + 'px';
          this.productList = data.content_setting.spu_config.list;
          this.styleData.describe.color = data.style_setting.style_config.describe.color;
          this.styleData.describe.padTopAndBottom.paddingBottom = data.style_setting.style_config.describe.bottom_padding + 'px';
          this.styleData.describe.padTopAndBottom.paddingTop = data.style_setting.style_config.describe.top_padding + 'px';
          this.styleData.describe.fontSize = data.style_setting.style_config.describe.font_size + 'px';
          this.styleData.describe.fontWeight = data.style_setting.style_config.describe.font_weight;
          this.styleData.describe.fontFamily = data.style_setting.style_config.describe.fontFamily;
          if(this.rowNum==1){
            this.styleData.describe.width = '280px';
          }
          if(this.rowNum==2){
            this.styleData.describe.width = '280px';
          }
          if(this.rowNum==3){
            this.styleData.describe.width = '170px';
          }
          if(this.rowNum==4){
            this.styleData.describe.width = '125px';
          }

          this.styleData.price.color = data.style_setting.style_config.price.color;
          this.styleData.price.fontSize = data.style_setting.style_config.price.font_size + 'px';
          this.styleData.price.fontWeight = data.style_setting.style_config.price.font_weight;
          this.styleData.price.fontFamily = data.style_setting.style_config.price.fontFamily;
          this.styleData.price.padTopAndBottom.paddingTop = data.style_setting.style_config.price.top_padding + 'px';
          this.styleData.price.padTopAndBottom.paddingBottom = data.style_setting.style_config.price.bottom_padding + 'px';

          this.styleData.marketPrice.color = data.style_setting.style_config.marketPrice.color;
          this.styleData.marketPrice.fontSize = data.style_setting.style_config.marketPrice.font_size + 'px';
          this.styleData.marketPrice.fontWeight = data.style_setting.style_config.marketPrice.font_weight;
          this.styleData.button.text.color = data.style_setting.style_config.button.color;
          this.styleData.button.text.fontSize = data.style_setting.style_config.button.font_size + 'px';
          this.styleData.button.text.fontWeight = data.style_setting.style_config.button.font_weight;
          this.styleData.button.text.fontFamily = data.style_setting.style_config.button.fontFamily;
          this.styleData.button.border.backgroundColor = data.style_setting.style_config.button.bgColor;
          this.styleData.button.border.borderWidth = data.style_setting.style_config.button.border_width + 'px';
          this.styleData.button.border.borderStyle = data.style_setting.style_config.button.border_style;
          this.styleData.button.border.borderColor = data.style_setting.style_config.button.border_color;
          this.styleData.button.border.paddingBottom = data.style_setting.style_config.button.bottom_padding + 'px';
          this.styleData.button.border.paddingTop = data.style_setting.style_config.button.top_padding + 'px';

          this.styleData.button.border.paddingLeft = data.style_setting.style_config.button.left_padding + 'px';
          this.styleData.button.border.paddingRight = data.style_setting.style_config.button.right_padding + 'px';

          this.styleData.button.padTopAndBottom.paddingTop = data.style_setting.style_config.button.warp_top_padding + 'px';
          this.styleData.button.padTopAndBottom.paddingBottom = data.style_setting.style_config.button.warp_bottom_padding + 'px';

          this.styleData.button.border.borderRadius = data.style_setting.style_config.button.border_radius + 'px';
          this.styleData.backgroundColor.backgroundColor = data.style_setting.style_config.background.bgColor;
          this.styleData.backgroundColor.backgroundImage = `url(${data.style_setting.style_config.background.bgImage})`;
          this.styleData.backgroundImage.borderColor = data.style_setting.style_config.image.border_color;
          this.styleData.backgroundImage.borderStyle = data.style_setting.style_config.image.border_style;
          this.styleData.backgroundImage.borderWidth = data.style_setting.style_config.image.border_width + 'px';
          this.styleData.imagePadding.paddingBottom =data.style_setting.style_config.image.bottom_padding+'px';
          this.styleData.imagePadding.paddingTop = data.style_setting.style_config.image.top_padding+'px';
          this.styleData.imagePadding.paddingLeft =data.style_setting.style_config.image.left_padding+'px';
          this.styleData.imagePadding.paddingRight=data.style_setting.style_config.image.right_padding+'px';
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