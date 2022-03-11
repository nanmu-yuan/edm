<template>
  <div class="header-box">
    <div class="header-content">
      <div class="r-menu">
        <div class="add-site-box">
           <el-button size="small"  @click="addSite">添加站点</el-button>
        </div>
        <div class="select-site-box" v-if="isShow">
          <el-select size="small"  v-model="siteName" filterable placeholder="请选择" @change ="select">
            <el-option v-for="item in siteOptions" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span v-if="false" style="float: right; color: #8492a6; font-size: 10px;margin-top:12px" class="el-icon-delete"></span>
            </el-option>
          </el-select>
        </div>
        <div class="add-site-box">
          <el-button size="small"  @click="settingUtm">设置UTM参数信息</el-button>
        </div>
      </div>
      <div class="l-menu" v-if="isShow">
           <div class="add-site-box">
           <el-button size="small"  @click="goBack" icon="el-icon-back">返回</el-button>
        </div>
      </div>
    </div>
    <ydialog :centerDialogVisible="isDialog"></ydialog>
    <utmdialog :utmdialogData="utmdialogData"></utmdialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {EventBus} from '../util/eventBus.js'
import ydialog from "../components/commonBtn/ydialog";
import utmdialog from '../components/commonBtn/utmDialog.vue'
export default {
  name: "Theader",
  props: {
    siteList: {
      type: Object,
    },
  },
   computed: {
    ...mapState("siteConfig", ["currentSiteName","siteInfo"]),
  },
  data() {
    return {
      isDialog: {
        type: false,
      },
      utmdialogData:{
        type:false
      },
      siteOptions: [],
      siteName:this.$store.state.siteConfig.currentSiteName,
      isShow:false
    };
  },
  methods: {
    addSite() {
      this.isDialog.type = true;
    },
    goBack(){
      this.$router.go(-1)
    },
    panel(){
      this.drawer.type = true;
    },
    select(value){
      this.$store.commit('siteConfig/UPDATESITENAME',{
        id:value
      });
    },
    settingUtm(){
      this.utmdialogData.type = true;
    },
    dataConfig(data) {
      let list = Object.keys(data).map((key) => {
        return {
          value:key,
          label:data[key]['name']
        }
      });
     this.siteOptions = list;
    }
  },
  watch: {
    siteList: {
      handler(nval) {
        if (nval) {
          this.dataConfig(nval);
        }
      },
      deep: true,
    },
    currentSiteName:{
      handler(nval){
        this.siteName = nval;
      },
      deep:true
    },
    siteInfo:{
      handler(nval){
      },
    },
    $route:{
      handler(nval){
        if(nval.name == 'templateList'){
          this.isShow = false
        }else{
          this.isShow = true
        }
      },
      deep:true,
      immediate:true
    }
  },
  components: {
    ydialog,
    utmdialog
  },
  mounted(){
     EventBus.$on('isShowGoBack',(res)=>{
       this.isShow = res;
     })
  }
};
</script>
<style scoped>
.header-box {
  height: 62px;
  background: #363636;
  padding: 0 20px;
}
.header-content {
  position: relative;
  width: 100%;
}
.r-menu {
  position: absolute;
  right: 0px;
  display: flex;
  top: 16px;
}
.l-menu{
    position: absolute;
    left  : 0px;
    display: flex;
    top: 16px;
}
.add-site-box {
  margin: 0px 8px;
}
</style>