<template>
  <div>
    <div class="t-body-box">
      <el-row>
        <el-col :span="16" class="warp-box">
          <div class="warp-scroll-hidden">
            <div class="deformation">
              <div class="tools">
                <div class="tool-item">
                  <el-button size="small"  icon="el-icon-zoom-in" style="font-size: 16px;" @click = "deformation('1')"></el-button>
                </div>
                <div class="tool-item">
                  <el-button size="small" icon="el-icon-refresh" style="font-size: 16px;" @click = "deformation('2')"></el-button>
                </div>
                <div class="tool-item">
                  <el-button size="small" icon="el-icon-zoom-out" style="font-size: 16px;" @click = "deformation('0')"></el-button>
                </div>
              </div>
            </div>
            <div class="mid-content-box" :style="{background:E_theme}">
              <div :style="{transform:`scale(${deData})`,transformOrigin: 'center 0'}">
                <div ref="template">
                  <table border="0" cellspacing="0" cellpadding="0" width="100%" :style="{background:E_theme}">
                    <tbody>
                      <tr>
                        <td>
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 290px;">
                            <tbody>
                              <tr>
                                <td>
                                  <div  ref="templateDemo">
                                    <table border="0" cellspacing="0" cellpadding="0" width="640px" align="center" class="mobile-wide" style="width: 640px; margin: 0 auto">
                                      <tbody>
                                        <tr>
                                          <td bgcolor="#ffffff" style="background-color: #ffffff;">
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
                                                          <div class="action-handle remove-handle" title="Copy" @click.stop="copy(item,index)">
                                                            <i class="el-icon-copy-document" style="font-size:24px"></i>
                                                          </div>
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
            </div>
          </div>
          <el-backtop target=".mid-content-box"></el-backtop>
        </el-col>
        <el-col :span="8">
          <div class="menu-warp">
            <div class="menu-box">
              <el-tabs v-model="activeName" center  type="card" >
                <el-tab-pane label="模板组件" name="first" >
                  <div class="menu-item">
                    <draggable class="dragArea list-group" v-model="leftMenu" animation="300" :group="{ name: 'people', pull: 'clone', put: 'false' }" :clone="cloneDom" :sort="false" style="display: flex;flex-wrap:wrap;justify-content: center;" @change="log">
                      <div class="leftMenu-item" v-for="(element, index) of leftMenu" :key="index" @click="addDom(element, index)">
                        <div>{{ element.cname }}</div>
                      </div>
                    </draggable>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="主题设计" name="second">
                  <el-form :inline="true">
                    <el-form-item label="背景色">
                        <el-color-picker v-model="E_theme" show-alpha  @active-change="activeChange" @change="colorChange"></el-color-picker>
                    </el-form-item>
                </el-form>
                </el-tab-pane>
              </el-tabs>
              <drawer :isDrawer='drawer' @isDrawer="isDrawer">
                <div>
                  <div v-for="(item, index) of rightConfig" :key="index">
                    <component :is="item.configName" :num="item.num" :index="index" :activeIndex="activeIndex">
                    </component>
                  </div>
                </div>
              </drawer>
                <div style="position:absolute;bottom:20px">
                <save @save='save' @saveTemplate='saveTemplate' @saveAsTemplate="saveAsTemplate" :isShowEditSave="isShowEditSave"></save>
                </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="Template Name" :visible.sync="dialogVisible" width="30%">
      <span>
        <div class="sub-title-box">
          <el-form :inline="true" :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm">
            <el-form-item label="name" prop="name" required>
              <el-input v-model="ruleForm.name" style="width:100%"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">cancl</el-button>
        <el-button type="primary" @click="changeTitle('ruleForm')">submit</el-button>
      </span>
    </el-dialog>
    <el-dialog title="HTML source code" :visible.sync="htmlDialogVisible" width="60%" :show-close="false">
        <div>
          <el-input class="error"  type="textarea" :rows="25" style = "width: 100%;" v-model="htmlCode"></el-input>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="preview">预览</el-button>
        <el-button @click="copyHtml" :data-clipboard-text="htmlCode" class="copy-code-button">复制</el-button>
        <el-button @click="cancl">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import $ from "jquery";
import save from "../../components/commonBtn/save.vue";
import temp from "../../components/commonBtn/temp.vue";
import drawer from "../../components/commonBtn/drawer.vue";
import draggable from "vuedraggable";
import pageCom from "../../components/PageComponent/index";
import rConfig from "../../components/rightConfig/index";
import MXKpayEncrypt from "../../util/crypto";
import Clipboard from 'clipboard'
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
      htmlUrl:'',
      baseList: [],
      dialogVisible: false,
      htmlDialogVisible:false,
      isShowEditSave:true,
      htmlCode:'',
      deData:1,
      E_theme:'#f2f2f2',
      ruleForm: {
        name: "",
      },
      activeName: 'first',
      rules: {
        name: [
          { required: true, message: "please input name", trigger: "blur" },
        ],
      },
    };
  },
  components: {
    draggable,
    save,
    drawer,
    ...pageCom,
    ...rConfig,
    temp,
  },
  methods: {
    copyHtml(){
      console.log('start....')
      var clipboard = new Clipboard('.copy-code-button') // 这里可以理解为选择器，选择上面的复制按钮
    clipboard.on('success', e => {
      this.$message({
          message: '复制成功',
          type: 'success'
        });
        // 释放内存
        clipboard.destroy()
    })
    clipboard.on('error', e => {
        // 不支持复制
        this.$message.error('复制失败');
        // 释放内存
        clipboard.destroy()
    })
    },
    activeChange(color) {
            this.E_theme= color;
        },
    colorChange(color){
      this.E_theme= color;
        },
    isDrawer(nval) {
      this.drawer = nval;
      this.activeIndex = 100;
    },
    cancl(){
      this.htmlDialogVisible = false;
      setTimeout(() => {
        this.isShowPlacehold = true;
      }, 20);
    },
    save() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.isShowPlacehold = false;
      let temp = this.$refs.template.innerHTML.replace(
        /data-v-[^"]*"[^"]*"/g,
        ""
      );
      let newTemp = temp.replace(/data-we-[^"]*"[^"]*"/g,
        "")
      let baseHtml = `<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"><head>
                        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
                        <title>${this.$store.state.siteConfig.currentSiteName}</title>
                        </head>
                       <body style="margin:0;background:${this.E_theme}">${newTemp}</body></html>`;
      let newHtml = baseHtml.replace(/<[\/]?(p)(:?\s+(:?class|style)=(['"])[^'"]*['"])*>/g, function(m, m1) { 
        return m.replace('p', 'div')
        });
      let staumtime = new Date().getTime();
      let cache = `${this.$store.state.siteConfig.currentSiteName}.html_${staumtime}`;
      let params = {
        template: newHtml,
        site_name: MXKpayEncrypt(cache),
      };
      this.promise(params).then((res) => {
        loading.close();
        this.$notify({
          title: "成功",
          message: "模板生成成功",
          type: "success",
        });
        this.htmlUrl = res.data.data.user_url;
        this.clearToolFunHtml()
      });
    },
    clearToolFunHtml(){
      setTimeout(()=>{
        let temp = this.$refs.template.innerHTML.replace(
        /data-v-[^"]*"[^"]*"/g,
        ""
      );
       let newTemp = temp.replace(/data-we-[^"]*"[^"]*"/g,
        "")
      let baseHtml = `<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"><head>
                        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
                        <title>${this.$store.state.siteConfig.currentSiteName}</title>
                        </head>
                       <body style="margin:0;background:${this.E_theme}" >${newTemp}</body></html>`;
        // 正则替换footer 中的p标签
      let newHtml = baseHtml.replace(/<[\/]?(p)(:?\s+(:?class|style)=(['"])[^'"]*['"])*>/g, function(m, m1) { 
        return m.replace('p', 'div')
        });
    this.preHtmlCode(newHtml)
      },200)
    },
    preview(){
      window.open(this.htmlUrl, "_blank");
    },
    promise(params) {
      return new Promise((soleve) => {
        $.ajax({
          type: "post",
          url: "/api/v3/base_template/upload/",
          data: {
            content: params.template,
            filename: params.site_name,
          },
          success: function (res) {
            soleve(res);
          },
        });
      });
    },
    preHtmlCode(html){
      let self = this;
      $.ajax({
            type: 'POST',
            url: 'https://tool.oschina.net/action/format/html',
            headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},
            data:{
              html:html,
              fhtml:''
            },
            success: function(data, status, xhr){
              self.htmlDialogVisible = true
              self.htmlCode = JSON.parse(data).fhtml
            }
          }
    )
    },
    changeTitle(formName) {
      let self = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          self.toImage(this.$refs.templateDemo, loading, this.ruleForm.name);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    saveTemplate() {
      this.isShowPlacehold = false;
      const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
      console.log(this.$refs.templateDemo);
      this.toImage(this.$refs.templateDemo, loading);
    },
    saveAsTemplate(){
      this.dialogVisible = true;
      this.isShowPlacehold = false;
    },
    toImage(dom, loading, name) {
      let self = this;
      this.domToImage.toPng(dom).then((dataUrl) => {
        let png = self.dataURLtoFile(dataUrl, "image/png");
        let formData = new FormData();
        let fileOfBlob = new File([png], new Date() + ".png"); // 重命名了
        formData = new FormData();
        let staumtime = new Date().getTime();
        let cache = `${this.$store.state.siteConfig.currentSiteName}.png_${staumtime}`;
        formData.append("content", fileOfBlob);
        formData.append("filename", MXKpayEncrypt(cache));
        this.axios({
          method: "POST",
          url: "/api/v3/base_template/upload/",
          data: formData,
          headers: {
            "content-type": "multipart/form-data",
          },
        }).then((res) => {
          let imgUrl = res.data.data.data.user_url;

          self.pullData(imgUrl, loading, name);
        });
      });
    },
    upload(png) {
      let self = this;
    },
    // 将base64转换为blob
    dataURLtoFile(dataURI, type) {
      let binary = atob(dataURI.split(",")[1]);
      let array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type: type });
    },
    pullData(dataUrl, loading, name) {
      let id = this.$route.query.id;
      let json_text = {
        base_template: this.$store.state.adminConfig.defaultArray,
        baseImg: dataUrl,
      };
      const params = {
        title: name,
        json_text: JSON.stringify(json_text),
      };
      this.modifyAndCreateFun(params, id,loading,name);
    },
    modifyAndCreateFun(params, id,loading,name) {
      let self = this;
      if (id && !name) {
        this.axios
          .put(`/api/v3/base_template/${id}/`, {
            json_text: params.json_text,
          })
          .then((res) => {
            loading.close();
            self.queryTempList();
            self.isShowPlacehold = true;
            self.$router.push({
              path: `/home/templateList`,
            });
          });
      } else {
        this.axios
          .post("/api/v3/base_template/", {
            title: params.title,
            json_text: params.json_text,
          })
          .then((res) => {
            loading.close();
            self.queryTempList();
            self.isShowPlacehold = true;
            self.$router.push({
              path: `/home/templateList`,
            });
          });
      }
    },
    objToArry(data) {
      if (!data) return [];
      let obj = Object.keys(data);
      let arr = obj.map((key) => data[key]);
      return arr;
    },
    cloneDom(data) {
      return {
        ...data,
      };
    },
    start(el, index) {},
    remove(el, index) {
      this.rightConfig.splice(0, 1);
      this.middlePage.splice(index, 1);
      this.$store.commit("adminConfig/REMOVEARR", el);
      this.drawer = false;
    },
    copy(el, index) {
      let timestamp = new Date().getTime();
      let copyDom = JSON.parse(JSON.stringify(el));
      this.rightConfig = [];
      copyDom.num = `${timestamp}`;
      this.middlePage.splice(index, 0, copyDom);
      this.rightConfig.splice(index, 0, copyDom);
      this.$store.commit("adminConfig/SETCONFIGNAME", copyDom.name);
      let copyData = JSON.parse(
        JSON.stringify(this.$store.state.adminConfig.defaultArray[el.num])
      );
      copyData["timestamp"] = timestamp.toString();
      this.$store.commit("adminConfig/COPYDEFAULTARRAY", {
        num: timestamp,
        val: copyData,
        index: index,
      });
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
      console.log(123456);
      let id = this.$route.query.id;
      var self = this;
      if (!id) return;
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.axios.get(`/api/v3/base_template/${id}/`).then((res) => {
        let data = JSON.parse(res.data.data.json_text);
        loading.close();
        self.middlePage = [];
        let dataArr = self.objToArry(data.base_template);
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
      });
    },
    queryTempList() {
      let self = this;
      this.axios.get(`/api/v3/base_template/`).then((res) => {
        let originData = res.data.data.results;
        originData.map((item) => {
          item.json_text = JSON.parse(item.json_text);
        });
        self.baseList = originData.reverse();
      });
    },
    deformation(type){
        if(type == '1' && this.deData <= 1.5){
          this.deData +=0.1
        }else if(type == '0' && this.deData >= 0.3){
          this.deData -=0.1
        }else if(type == '2'){
          this.deData =1
        }
        
  },
  },
  created() {
    this.leftMenu = this.objToArry(pageCom);
    this.$route.query.id?this.isShowEditSave = true:this.isShowEditSave=false;
  },
  mounted() {
    let self = this;
    console.log(789)
    this.$nextTick(this.configLeftMenu());
    this.getDefaultConfig();
    //清空state默认缓存
    this.$store.commit("adminConfig/CLEARNDEFAULTARRAY");
  },
};
</script>
<style scoped>


.warp-box {
  position: relative;
  
}
.warp-scroll-hidden {
  position: relative;
  z-index: 0;
  width: 100%;
  height: calc(100vh - 62px);
}

.mid-content-box {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  position: relative;
  background: #f2f2f2;
}

.leftMenu-item {
  width: 85px;
  height: 51px;
  border: 1px solid #dcdfe6;
  line-height: 51px;
  text-align: center;
  margin: 8px;
  color: #606266;
  padding: 8px;
  font-size: 14px;
  cursor: all-scroll;
  border-radius: 2px;
  background: #f9f9f9;
}

.leftMenu-item:hover {
  background: #dcdfe6;
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
  background: #4db159;
  width: 120px;
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
  background: url(../../assets/images/overlay-action-handle.png) no-repeat;
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

.menu-item {
  position: relative;
}

.menu-box {
  position: relative;
  height: calc(100vh - 77px);
  z-index: 0;
  padding-left: 56px;
  padding-top: 15px;
  padding-right: 56px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.deformation{
  position: absolute;
    left: 43px;
    top: 77px;
    z-index: 1;
}
.tools{
  width: 50px;
}
.tool-item{
  margin: 2px;
  font-size: 14px;
}

</style>