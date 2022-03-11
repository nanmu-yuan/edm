<template>
  <div class="warp-box">
    <div class="srearch-box">
      <div class="search-right">
        <el-form :inline="true">
          <el-form-item>
             <el-input v-model="title" placeholder="请输入内容" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div style="display:flex;flex-wrap: wrap; align-content:space-between;padding:0 20px">
      <div class="box-item"  v-for="(item,index) of baseList" :key='index'>
        <div class="box-item-content">
          <el-image :src="item.json_text.baseImg" style="width: 250px;" lazy  fit="cover">
            <div slot="placeholder" class="image-slot" style="vertical-align: bottom;">
            <img src="../../assets/images/loading.gif" width="15%"  alt="" style="margin-top: 30px;">
            </div>
          </el-image>
          <div class="tool-box">
            <span @click="show(item)">Previews</span>
          </div>
          <div class="info-box">
            <span>{{item.title}}</span>
          </div>
        </div>
      </div>
      <div class="box-item">
        <div class="box-item-content">
          <div class="tool-box1">
            <span class="el-icon-plus" @click="Create"></span>
          </div>
        </div>
      </div>
      <biImg :dialogData="dialogData"></biImg>
    </div>
    <div class="pag-box" v-if="isShowPag">
      <el-pagination class="pag" background layout="prev, pager, next" :total="total" :page-size="17" @current-change="handleSizeChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import biImg from "../../components/commonBtn/bigImg.vue";
export default {
  name: "templateList",
  inject: ["reload"],
  data() {
    return {
      baseList: [],
      bigImg: "",
      total: 0,
      title: "",
      currentpagNum:1,
      isShowPag:false,
      dialogData: {
        type: false,
        bigImg: "",
        id: "",
      },
    };
  },
  methods: {
    search(){
      const num = this.currentpagNum;
      const title = this.title;
      this.queryList(num,title);
    },
    show(data) {
      this.dialogData.type = true;
      this.dialogData.bigImg = data.json_text.baseImg;
      this.dialogData.id = data.id;
    },
    Create() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
        this.$router.push({
          path: "/home/templateFactory",
        });
      }, 300);
    },
    handleSizeChange(val) {
      this.currentpagNum = val;
      if(this.title){
        this.queryList(val,this.title);
      }else{
         this.queryList(val);
      }
    },
    queryList(num,title) {
      let self = this;
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let url = title?`/api/v3/base_template/?page_size=17&page=${num}&title=${title}`:`/api/v3/base_template/?page_size=17&page=${num}`;
      this.$axios.get(url).then((res) => {
        let originData = res.data.data.results;
        this.total = res.data.data.count;
        originData.map((item) => {
          item.json_text = JSON.parse(item.json_text);
        });
        self.baseList = originData;
        loading.close();
        this.total-17>0?this.isShowPag = true:this.isShowPag = false;
      });
    },
  },
  created() {
    this.queryList(1);
  },
  components: {
    biImg,
  },
};
</script>
<style scoped>
.search-right{
  position: absolute;
  right: 16px;
}
.box-item-content{
    border: 1px solid #e4e7ed;
    text-align: center;
    position: relative;
    height: 100%;
    overflow: hidden;
    background: #ffff;
}
.srearch-box {
  position: relative;;
  margin-bottom: 8px;
  padding: 10px 0;
  height: 60px;
  background: #fff;
}
.info-box {
  position: absolute;
  bottom: 0px;
  padding: 2px 0;
  border-top: 1px solid #e4e7ed;
  background: #E4E7ED;
  opacity: 0.7;
  width: 100%;
  font-weight: bold;
}
.box-item {
  height: 220px;
  width: 16%;
  padding: 5px;
}
.box-item:hover .tool-box {
  display: block;
}
.tool-box {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #606266;
  opacity: 0.7;
  z-index: 5;
  top: 0px;
  line-height: 220px;
  color: black;
  font-weight: bold;
}
.tool-box1 {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #909399;
  opacity: 0.7;
  z-index: 5;
  top: 0px;
  line-height: 250px;
  color: black;
  font-weight: bold;
}
.tool-box1 > span {
  display: inline-block;
  margin: 0 5px;
  color: #fff;
  font-size: 60px;
  cursor: pointer;
}
.tool-box > span {
  display: inline-block;
  margin: 0 5px;
  color: #fff;
  font-size: 35px;
  cursor: pointer;
}
::v-deep  .el-image{
  transform: scale(1.8);
  transform-origin: center 0;
}
::v-deep .el-image .el-image__inner {
  position: relative;
}
.pag-box {
  position: relative;;
  background: #EBEEF5;
  top: 30px;
}
.pag {
  position: absolute;
  right: 20px;
}
.warp-box{
  background:#EBEEF5;
  height: calc(100vh - 62px)
}
</style>