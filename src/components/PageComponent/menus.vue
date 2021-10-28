<template>
  <div class="cb  cb-menu">
    <table border="0" cellspacing="0" cellpadding="0" width="100%" style="background-color:#fff;" bgcolor="#fff" background="">
      <tbody>
        <tr>
          <td style="padding-left:0px;padding-right:0px;">
            <table border="0" cellspacing="0" cellpadding="0" width="100%" :style="bgStyle" bgcolor="#fff" background="">
              <tbody>
                <tr>
                  <td style="border-bottom:1px solid #eaeaea;border-top:1px solid #eaeaea;">
                    <div style="display: table; margin: 0 auto;">
                      <div style="display: table-row;">
                        <div v-for="(item,index) of titleAndLink" :key="index" style="display: table-cell;">
                          <table border="0" cellspacing="0" cellpadding="0" width="100%" style="text-align: center;">
                            <tbody>
                              <tr>
                                <td  :style="pdStyle">
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
        name: "menus",
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
        this.pdStyle.paddingTop = data.style_setting.pd_position_config.pd_style[0]['value'] + 'px';
        this.pdStyle.paddingBottom = data.style_setting.pd_position_config.pd_style[1]['value'] + 'px';
        this.pdStyle.paddingLeft = data.style_setting.pd_position_config.pd_style[2]['value'] + 'px';
        this.pdStyle.paddingRight = data.style_setting.pd_position_config.pd_style[3]['value'] + 'px';
        this.fontStyle.fontSize = data.style_setting.style_config.link.font_size+'px';
        this.fontStyle.color = data.style_setting.style_config.link.color;
        this.fontStyle.fontWeight = data.style_setting.style_config.link.font_weight;
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