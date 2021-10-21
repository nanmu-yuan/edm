<template>
  <div class="banner">
    <table border="0" cellspacing="0" cellpadding="0" width="100%">
      <tbody>
        <tr>
          <td class="mobile-desktop" style="" bgcolor="" background="">
            <table border="0" cellspacing="0" cellpadding="0" width="100%">
              <tbody>
                <tr>
                  <td style="padding-bottom:20px;padding-left:20px;padding-right:20px;padding-top:20px;">
                   <div v-if="rowNum==1">
                       <colum1 :list="productList"></colum1>
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
import { mapState } from "vuex";
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
            list:[]
          }
        },
        style_setting: {
          bg_color_config: {
            title: "background",
            bgColor: "#fff"
          },
             select_config: {
            title: "TYPE",
            options: [
              {
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
      rowNum:'4',
      bgStyle: {
        background: ''
      },
      pdStyle: {
        paddingTop: '',
        paddingBottom: '',
        paddingLeft: '',
        paddingRight: '',
      },
      productList:[]
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
        this.rowNum = data.style_setting.select_config.value;
        this.bgStyle.background = data.style_setting.bg_color_config.bgColor;
        this.pdStyle.paddingTop = data.style_setting.pd_position_config.pd_style[0]['value'] + 'px';
        this.pdStyle.paddingBottom = data.style_setting.pd_position_config.pd_style[1]['value'] + 'px';
        this.pdStyle.paddingLeft = data.style_setting.pd_position_config.pd_style[2]['value'] + 'px';
        this.pdStyle.paddingRight = data.style_setting.pd_position_config.pd_style[3]['value'] + 'px';
        this.productList = data.content_setting.spu_config.list;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
     if(this.$store.state.adminConfig.defaultArray[this.num]){
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