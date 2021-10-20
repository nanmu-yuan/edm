<template>
  <div>
    <div class="t-body-box">
      <el-row>
        <el-col :span="6" style="z-index: 30000; position: relative">
          <draggable class="dragArea list-group" v-model="leftMenu" animation="300" :group="{ name: 'people', pull: 'clone', put: 'false' }" :clone="cloneDom" :sort="false" style="display: flex" @change="log">
            <div class="leftMenu-item" v-for="(element, index) of leftMenu" :key="index" @click="addDom(element, index)">
              <div>{{ element.cname }}</div>
            </div>
          </draggable>
        </el-col>
        <el-col :span="10" style="z-index: 30000; position: relative">
          <div class="warp-scroll-hidden">
            <div class="mid-content-box">
              <el-backtop target=".mid-content-box"></el-backtop>
              <table border="0" cellspacing="0" cellpadding="0" width="100%" style="background-color: #f2f2f2" bgcolor="#f2f2f2">
                <tbody>
                  <tr>
                    <td>
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 290px">
                        <tbody>
                          <tr>
                            <td>
                              <div id="template">
                                <table ref="template" border="0" cellspacing="0" cellpadding="0" width="640px" align="center" class="mobile-wide" style="width: 640px; margin: 0 auto">
                                  <tbody>
                                    <tr>
                                      <td bgcolor="#ffffff" style="background-color: #ffffff" class="zone zone-content ui-sortable">
                                        <draggable animation="300" :scroll="true" group="people" chosenClass="chosen" ghost-class="ghost" class="dragArea list-group" v-model="middlePage" @add="add" @change="log">
                                          <transition-group>
                                            <div v-for="(item, index) of middlePage" :key="index" @click="bingConfig(item, index)" class="content-block-wrapper">
                                              <div class="content-block-template">
                                                <component :is="item.name" :num="item.num" :index="index"></component>
                                              </div>
                                              <div v-if="isShowPlacehold" class="content-block-overlay">
                                                <div class="overlay-background"></div>
                                                <div :class="['overlay-edited',activeIndex == index? 'show': 'hidden',]">
                                                  <div class="overlay-edited-background"></div>
                                                </div>
                                                <div class="overlay-actions">
                                                  <div class="overlay-actions-middle">
                                                    <div class="overlay-actions-middle-wrapper clearfix">
                                                      <div class="action-handle remove-handle" title="Remove" @click.stop="remove(item,index)">
                                                        <i class="el-icon-delete" style="font-size:24px"></i>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </transition-group>
                                        </draggable>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
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
          </div>
        </el-col>
        <el-col :span="8">
          <div style="width: 100%"></div>
          <el-drawer :visible.sync="drawer" :direction="direction" :modal="false" :wrapperClosable="false" :modal-append-to-body="false">
            <div v-for="(item, index) of rightConfig" :key="index">
              <component :is="item.configName" :num="item.num" :index="index" :activeIndex="activeIndex"></component>
            </div>
            <div class="save-box">
              <save @save='save' @saveTemplate='saveTemplate'></save>
            </div>
          </el-drawer>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import save from "../components/commonBtn/save";
import draggable from "vuedraggable";
import pageCom from "../components/PageComponent";
import rConfig from "../components/rightConfig";
export default {
  name: "templateFactory",
  data() {
    return {
      leftMenu: [],
      middlePage: [],
      rightConfig: [],
      drawer: false,
      direction: "rtl",
      activeIndex: 100,
      isShowPlacehold: true,
    };
  },
  components: {
    draggable,
    save,
    ...pageCom,
    ...rConfig,
  },
  methods: {
    save(data) {
      console.log(data);
      this.isShowPlacehold = false;
      let temp = $("#template").html();
      let params = {
        template: temp,
        site_name: "berrylook",
      };
      $.ajax({
        type: "post",
        url: "https://admin.fashionmia.net/opbm.php?a=EdmHtml&m=Api",
        data: {
          html: params.template,
          site_name: params.site_name,
        },
        success: function (res) {
          //var data = JSON.parse(res)
          console.log(res);
        },
      });
    },
    saveTemplate() {
      var self = this;
      let json_text = {
        base_template: this.$store.state.adminConfig.defaultArray,
        img: 123,
      };
      const params = {
        title: "berrylook12321",
        json_text: JSON.stringify(json_text),
        template: "12312",
      };
      $.ajax({
        type: "post",
        url: "http://smartsend.beta.seamarketings.com/api/v3/base_template/",
        headers: {
          Authorization:
            "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjM1MjI5NjQyLCJlbWFpbCI6IiJ9.Foj2rGAWMP0tHmnaEJcrEiYEQ2L2s61ZpPyNyMMm9Hg",
        },
        data: {
          title: params.title,
          json_text: params.json_text,
        },
        success: function () {
          self.$router.push({
            path: `/home/templateList`,
          });
        },
      });
    },
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
    start(el, index) {
      console.log(el, index);
    },
    remove(el, index) {
      console.log("move.....");
      this.rightConfig.splice(0, 1);
      this.middlePage.splice(index, 1);
      this.$store.commit("adminConfig/REMOVEARR", el);
      console.log(this.activeIndex);
      this.drawer = false;
    },
    add() {
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
        console.log("move");
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
    },
    // 获取默认数据
    getDefaultConfig() {
      let id = this.$route.query.id;
      var self = this;
      $.ajax({
        type: "get",
        url: `http://smartsend.beta.seamarketings.com/api/v3/base_template/${id}/`,
        headers: {
          Authorization:
            "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjM1MjI5NjQyLCJlbWFpbCI6IiJ9.Foj2rGAWMP0tHmnaEJcrEiYEQ2L2s61ZpPyNyMMm9Hg",
        },
        success: function (res) {
          //var data = JSON.parse(res)
          let data = JSON.parse(res.data.json_text);
          console.log(data);
          let dataArr = self.objToArry(data);
          dataArr.map((item) => {
            self.leftMenu.map((el) => {
              if (item.name == el.name) {
                el.num = item.timestamp;
                let temp = JSON.parse(JSON.stringify(el));
                self.middlePage.push(temp);
                self.$store.commit("adminConfig/ADDARRAY", {
                  num: item.timestamp,
                  val: item,
                });
              }
            });
          });
        },
      });
    },
  },
  created() {
    this.leftMenu = this.objToArry(pageCom);
  },
  mounted() {
    this.$nextTick(this.configLeftMenu());
    this.getDefaultConfig();
  },
};
</script>
<style scoped>
.warp-scroll-hidden {
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);
  overflow: hidden;
}
.mid-content-box {
  margin-top: 30px;
  overflow-y: scroll;
  height: 100%;
  position: relative;
  right: -18px;
}
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
.content-block-overlay:hover .overlay-actions {
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
  background: red;
  opacity: 1;
  height: 80px;
}
.overlay-actions {
  text-align: center;
  position: absolute;
  width: 100%;
  height: 100%;
  display: none;
}
.overlay-actions-middle {
  float: right;
  margin-right: 70px;
  display: inline-block;
  margin-top: -5px;
}
.action-handle {
  width: 40px;
  height: 40px;
  background: url(../assets/images/overlay-action-handle.png) no-repeat;
  line-height: 40px;
  text-align: center;
  display: block;
  float: left;
  margin: 0 2px;
  cursor: pointer;
}
.save-box {
  position: absolute;
  bottom: 20px;
}
.chosen {
  width: 100%;
}
</style>