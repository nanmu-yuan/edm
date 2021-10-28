<template>
  <div>
    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="">
      <tbody>
        <tr>
          <td :style="bgStyle">
            <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto; ">
              <tbody>
                <tr>
                  <td style="font-size:0;line-height:0;padding-bottom:20px;padding-left:20px;padding-right:20px;padding-top:20px;text-align:center;">
                    <a target="_blank" :href="linkText" style="text-decoration: none;">
                      <span class="image-placeholder" style="" v-if="!imageUrl">
                        <span class="placeholder-style" style="width: 600px; height: 300px;">
                          <span class="placeholder-inner">
                            <img class="placeholder-img-large"  src="https://sources.aopcdn.com/edm/images//20211020/1634722588624.png" width="100"><br>
                          </span>
                        </span>
                      </span>
                      <img v-else v-lazy ="imageUrl" alt="" width ='600'>
                    </a>
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
  name: "banner",
  cname: "banner",
  configName: "c_banner",
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
        name: "banner",
        timestamp: this.num,
        content_setting: {
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
          style_config:{
            background: {
                bgImage: '',
                pattern:'',
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

          }
        },
      },
      pageData: {},
      titleText: "",
      linkText: "",
      imageUrl: '',
      bgStyle: {
        backgroundColor:'#fff',
        backgroundImage:'url()',
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
        //console.log(nval);
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
        this.linkText = 'https://'+data.content_setting.link_config.value
        this.imageUrl = data.content_setting.image_config.value;
        this.bgStyle.backgroundColor = data.style_setting.style_config.background.color;
        this.bgStyle.backgroundImage = `url(${data.style_setting.style_config.background.bgImage})`;
        this.pdStyle.paddingTop = data.style_setting.pd_position_config.pd_style[0]['value'] + 'px';
        this.pdStyle.paddingBottom = data.style_setting.pd_position_config.pd_style[1]['value'] + 'px';
        this.pdStyle.paddingLeft = data.style_setting.pd_position_config.pd_style[2]['value'] + 'px';
        this.pdStyle.paddingRight = data.style_setting.pd_position_config.pd_style[3]['value'] + 'px';
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if(this.$store.state.adminConfig.defaultArray[this.num]){
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
img[lazy="loading"]{
  display:block;
  width:50px !important;
  height:50px !important;
  margin:0 auto;
  }
</style>