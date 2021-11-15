<template>
  <div style="display:flex;flex-wrap: wrap;">
    <div class="box-item" v-for="(item,index) of baseList" :key='index'>
      <el-image :src="item.json_text.baseImg" style="width: 200px;">
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
      </el-image>
      <div class="tool-box">
        <span @click="show(item.id)">show</span>
        <span @click="del(item.id)">delete</span>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "templateList",
  inject:['reload'],
  data() {
    return {
      baseList: [],
    };
  },
  methods: {
    show(id) {
      this.$router.push({
        path: `/home/templateFacyory`,
        query: {
          id: id,
        },
      });
    },
    del(id) {
        var self = this;
      $.ajax({
        type: "delete",
        url: `http://smartsend.beta.seamarketings.com/api/v3/base_template/${id}/`,
        headers: {
          Authorization:
            "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjM3MjQxMzUwLCJlbWFpbCI6IiJ9.OdbB3syxrWaVhXm5Gq_M_3Om9eg_DVTFtME6GdsBPEk",
        },
        success: function (res) {
               self.reload()
        },
      });
    },
  },
  created() {
    var self = this;
    const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
    $.ajax({
      type: "get",
      url: "http://smartsend.beta.seamarketings.com/api/v3/base_template/",
      headers: {
        Authorization:
          "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjM3MjQxMzUwLCJlbWFpbCI6IiJ9.OdbB3syxrWaVhXm5Gq_M_3Om9eg_DVTFtME6GdsBPEk",
      },
      success: function (res) {
        loading.close();
        let originData = res.data.results;
        originData.map(item=>{
          item.json_text = JSON.parse(item.json_text)
        })
        self.baseList = originData;
      },
    });
  },
};
</script>
<style scoped>
.box-item {
  height: 200px;
  width: 12.5%;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}
.tool-box{
  position: absolute;
  bottom: 8px;
  right: 2px;
}
.tool-box >span{
  display: inline-block;
  margin: 0 5px;

}
</style>