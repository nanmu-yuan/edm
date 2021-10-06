<template>
  <table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tbody>
      <tr>
        <td :style="bgColor">
          <table border="0" cellspacing="0" cellpadding="0" width="100%">
            <tbody>
              <tr>
                <td
                  style="
                    padding-bottom: 15px;
                    padding-left: 20px;
                    padding-right: 20px;
                    padding-top: 15px;
                  "
                >
                  <table
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td :style="titleStyle">
                          <span>{{ titleText }}</span>
                          <a target="_blank" href="" :style="linkStyle"
                            ><span> {{ linkText }}</span></a
                          >
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
import { mapState } from "vuex";
export default {
  name: "preheader",
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
        console.log(data, 123456);
      },
      deep: true,
    },
  },
  data() {
    return {
      defaultConfig: {
        name: "preheader",
        timestamp: this.num,
        content_setting: {
          text_config: {
            title: "TEXT",
            value: "hahahaha",
          },
          link_config: {
            title: "LINK",
            value: "link",
          },
        },
        style_setting: {
          select_config: {
            title: "TYPE",
            options: [
              {
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
          bg_color_config: {
            title: "background",
            bgColor: "#fff",
            imageUrl: "",
          },
        },
      },
      pageData: {},
      titleText: "",
      linkText: "",
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
        backgroundImage:'',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      },
    };
  },
  methods: {
    setConfig(data) {
      if (data) {
        this.titleText = data.content_setting.text_config.value;
        this.linkText = data.content_setting.link_config.value;
        this.titleStyle["textAlign"] = data.style_setting.select_config.value;
        this.bgColor["background"] = data.style_setting.bg_color_config.bgColor;
        this.bgColor['backgroundImage'] = `url(${data.style_setting.bg_color_config.imageUrl})`;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.pageData = this.$store.state.adminConfig.defaultArray[this.num];
      this.setConfig(this.pageData);
    });
  },
};
</script>