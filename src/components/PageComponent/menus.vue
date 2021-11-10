<template>
  <div class="cb  cb-menu">
    <table border="0" cellspacing="0" cellpadding="0" width="100%" style="background-color:#fff;" bgcolor="#fff" background="">
      <tbody>
        <tr>
          <td :style="pdLRStyle">
            <table border="0" cellspacing="0" cellpadding="0" width="100%" :style="bgStyle" bgcolor="#fff" background="">
              <tbody>
                <tr>
                  <td :style="borderStyle">
                    <div style="display: table; margin: 0 auto;">
                      <div style="display: table-row;">
                        <div v-for="(item,index) of titleAndLink" :key="index" style="display: table-cell;">
                          <table border="0" cellspacing="0" cellpadding="0" width="100%" style="text-align: center;">
                            <tbody>
                              <tr>
                                <td  :style="pdBTStyle">
                                  <table border="0" cellspacing="0" cellpadding="0" width="100%">
                                    <tbody>
                                      <tr>
                                        <td><a  target="_blank" :style="fontStyle" :href="item.linkItem.value"><span>{{item.textItem.value}}</span></a></td>
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
  name: "Menus",
  cname: "Menus",
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
        name: "Menus",
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
          style_config:{
            link:{
              font_size:'12',
              color:'#000',
              font_weight:'normal',
              lineHeight: '127%',
              textAlign: 'right'
            },
            background: {
                bgImage: '',
                pattern:'',
                color: '#fff'
              },
            border:{
              border_top_color:'#666666',
              border_top_width:'0',
              border_top_style:'solid',
              border_bottom_color:'#666666',
              border_bottom_width:'0',
              border_bottom_style:'solid',
            }
          }
        },
      },
      pageData: {},
      titleAndLink:[],
      imgaUrl: "",
      bgStyle: {
        backgroundColor:'#fff',
        backgroundImage:'url()',
      },
      fontStyle:{
        fontSize:'12',
        color:'#000',
        fontWeight:'normal',
        textDecoration: 'none'
      },
      pdBTStyle: {
        paddingTop: '',
        paddingBottom: '',
        paddingLeft: '15px',
        paddingRight: '15px',
      },
      pdLRStyle: {
        paddingLeft: '',
        paddingRight: '',
      },
      borderStyle:{
        borderBottomColor:'#666666',
        borderBottomWidth:'1px',
        borderBottomStyle:'solid',
        borderTopColor:'#666666',
        borderTopWidth:'1px',
        borderTopStyle:'solid',
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
  },
  methods: {
    setConfig(data) {
      if (data) {
        this.titleAndLink = data.content_setting.add_item_config.linkArr
        this.bgStyle.backgroundColor = data.style_setting.style_config.background.color;
        this.bgStyle.backgroundImage = `url(${data.style_setting.style_config.background.bgImage})`;
        this.pdBTStyle.paddingTop = data.style_setting.pd_position_config.pd_style[0]['value'] + 'px';
        this.pdBTStyle.paddingBottom = data.style_setting.pd_position_config.pd_style[1]['value'] + 'px';
        this.pdLRStyle.paddingLeft = data.style_setting.pd_position_config.pd_style[2]['value'] + 'px';
        this.pdLRStyle.paddingRight = data.style_setting.pd_position_config.pd_style[3]['value'] + 'px';
        this.fontStyle.fontSize = data.style_setting.style_config.link.font_size+'px';
        this.fontStyle.color = data.style_setting.style_config.link.color;
        this.fontStyle.fontWeight = data.style_setting.style_config.link.font_weight;
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
      console.log(12133131)
     if(this.$store.state.adminConfig.defaultArray[this.num]){
        this.pageData = JSON.parse(JSON.stringify(this.$store.state.adminConfig.defaultArray[this.num]));
        this.setConfig(this.pageData);
      }
    }, 20);
  },
};
</script>
<style scoped>
</style>