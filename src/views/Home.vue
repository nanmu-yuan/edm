<template>
  <div>
    <div class="t-header-box">
      <el-row>
        <Theader></Theader>
      </el-row>
    </div>
    <div class="t-body-box">
      <el-row>
        <el-col :span="6" style="z-index: 30000; position: relative">
          <draggable
            class="dragArea list-group"
            v-model="leftMenu"
            animation="300"
            :group="{ name: 'people', pull: 'clone', put: 'false' }"
            :clone="cloneDom"
            :sort="false"
            style="display: flex"
            @change="log"
          >
            <div
              class="leftMenu-item"
              v-for="(element, index) of leftMenu"
              :key="index"
              @click="addDom(element, index)"
            >
              <div>{{ element.cname }}</div>
            </div>
          </draggable>
        </el-col>
        <el-col :span="10" style="z-index: 30000; position: relative">
          <div style="margin-top: 20px">
            <table
              border="0"
              cellspacing="0"
              cellpadding="0"
              width="100%"
              style="background-color: #f2f2f2"
              bgcolor="#f2f2f2"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="min-width: 290px"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                              width="640px"
                              align="center"
                              class="mobile-wide"
                              style="width: 640px; margin: 0 auto"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    bgcolor="#ffffff"
                                    style="background-color: #ffffff"
                                    class="zone zone-content ui-sortable"
                                  >
                                    <draggable
                                      group="people"
                                      ghost-class="ghost"
                                      class="dragArea list-group"
                                      v-model="middlePage"
                                      @add="add"
                                      @change="log"
                                    >
                                      <transition-group>
                                        <div
                                          v-for="(item, index) of middlePage"
                                          :key="index"
                                          @click="bingConfig(item, index)"
                                          class="content-block-wrapper"
                                        >
                                          <div class="content-block-template">
                                            <component
                                              :is="item.name"
                                              :num="item.num"
                                              :index="index"
                                            ></component>
                                          </div>
                                          <div class="content-block-overlay">
                                            <div
                                              class="overlay-background"
                                            ></div>
                                            <div
                                              :class="[
                                                'overlay-edited',
                                                activeIndex == index
                                                  ? 'show'
                                                  : 'hidden',
                                              ]"
                                            >
                                              <div
                                                class="
                                                  overlay-edited-background
                                                "
                                              ></div>
                                            </div>
                                          </div>
                                        </div>
                                      </transition-group>
                                    </draggable>
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
        </el-col>
        <el-col :span="8">
          <div style="width: 100%"></div>
          <el-drawer
            :visible.sync="drawer"
            :direction="direction"
            :modal="false"
            :wrapperClosable="false"
            :modal-append-to-body="false"
          >
            <div v-for="(item, index) of rightConfig" :key="index">
              <component
                :is="item.configName"
                :num="item.num"
                :index="index"
                :activeIndex="activeIndex"
              ></component>
            </div>
          </el-drawer>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Theader from "../components/Theader.vue";
import draggable from "vuedraggable";
import pageCom from "../components/PageComponent";
import rConfig from "../components/rightConfig";
export default {
  name: "Home",
  data() {
    return {
      leftMenu: [],
      middlePage: [],
      rightConfig: [],
      drawer: false,
      direction: "rtl",
      activeIndex: 100,
    };
  },
  components: {
    Theader,
    draggable,
    ...pageCom,
    ...rConfig,
  },
  methods: {
    objToArry(data) {
      let obj = Object.keys(data);
      let arr = obj.map((key) => data[key]);
      return arr;
    },
    cloneDom(data) {
      return {
        ...data,
      };
    },
    add() {
      console.log(789);
      this.togoDrawer();
    },
    log(mData) {
      if (mData.added) {
        let data = mData.added.element,
          timestamp = new Date().getTime();
        data.num = `${timestamp}`;
        this.rightConfig = [];
        this.activeIndex = mData.added.newIndex;
        let temp = JSON.parse(JSON.stringify(data));
        this.rightConfig.push(temp);
        this.$store.commit("adminConfig/DEFAULTARRAYSORT", mData.added);
        this.$store.commit("adminConfig/SETCONFIGNAME", data.name);
      }
      if (mData.moved) {
        let data = mData.moved.element;
        this.$store.commit("adminConfig/DEFAULTARRAYSORT", mData.moved);
        this.rightConfig = [];
        this.activeIndex = mData.moved.newIndex;
        let temp = JSON.parse(JSON.stringify(data));
        this.rightConfig.push(temp);
        this.togoDrawer();
      }
    },
    configLeftMenu() {},
    //中间组件绑定数据
    bingConfig(data, index) {
      this.rightConfig = [];
      let temp = JSON.parse(JSON.stringify(data));
      this.rightConfig.push(temp);
      let cachIndex = this.activeIndex;
      this.$store.commit("adminConfig/SETCONFIGNAME", temp.name);
      if (cachIndex != index) {
        this.togoDrawer();
      }
      this.activeIndex = index;
    },
    togoDrawer() {
      this.drawer = false;
      setTimeout(() => {
        this.drawer = true;
      });
    },
    // 左侧选择组件
    addDom(dom) {
      //添加时间戳
      let timestamp = new Date().getTime();
      dom.num = `${timestamp}`;
      //指控右侧配置页面
      this.rightConfig = [];
      // 复制
      let copyDom = JSON.parse(JSON.stringify(dom));
      this.middlePage.push(copyDom);
      this.activeIndex = this.middlePage.length - 1;
      this.rightConfig.push(copyDom);
      //保存当前激活状态组件名称
      this.$store.commit("adminConfig/SETCONFIGNAME", copyDom.name);
      // 保存默认组件配置 defaultConfig
      this.$store.commit("adminConfig/ADDARRAY", {
        num: dom.num,
        val: dom.data().defaultConfig,
      });
      this.togoDrawer();
      console.log(this.$store.state.adminConfig.defaultArray);
    },
    // 获取默认数据
    getDefaultConfig() {
      let data = {
        1632553456150: {
          name: "preheader",
          timestamp: "1632553456150",
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
            type_config: {
              title: "TYPE",
              value: "123",
            },
          },
        },
        1632553456923: {
          name: "preheader",
          timestamp: "1632553456923",
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
            type_config: {
              title: "TYPE",
              value: "123",
            },
          },
        },
        1632553457443: {
          name: "preheader",
          timestamp: "1632553457443",
          content_setting: {
            text_config: {
              title: "TEXT",
              value: "hahahah1231231312a",
            },
            link_config: {
              title: "LINK",
              value: "link",
            },
          },
          style_setting: {
            type_config: {
              title: "TYPE",
              value: "123",
            },
          },
        },
      };
      let dataArr = this.objToArry(data);
      dataArr.map((item) => {
        this.leftMenu.map((el) => {
          if (item.name == el.name) {
            el.num = item.timestamp;
            let temp = JSON.parse(JSON.stringify(el));
            this.middlePage.push(temp);
            this.$store.commit("adminConfig/ADDARRAY", {
              num: item.timestamp,
              val: item,
            });
          }
        });
      });
    },
  },
  created() {
    this.leftMenu = this.objToArry(pageCom);
  },
  mounted() {
    this.$nextTick(this.configLeftMenu());
    //this.getDefaultConfig()
  },
};
</script>
<style scoped>
.leftMenu-item {
  width: 100px;
  height: 30px;
  border: 1px solid #fefefe;
  background: gray;
  line-height: 30px;
  text-align: center;
}
::v-deep .el-drawer__wrapper {
  top: 60px !important;
}
.activeItem {
  border: 2px dashed #80f35c;
  box-sizing: border-box;
}
.content-block-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.content-block-overlay:hover .overlay-background {
  display: block;
}
.content-block-wrapper {
  position: relative;
}
.overlay-edited {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px dashed #4db159;
  box-sizing: border-box;
}
.overlay-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(102, 102, 102, 0.25);
  display: none;
}
.overlay-edited-background {
  background: #fff;
  opacity: 0;
  width: 100%;
  height: 100%;
}
.hidden {
  display: none;
}
.show {
  display: block;
}
.ghost {
  background: #d7f0da;
  width: 640px;
  height: 50px;
}
</style>