<template>
  <div style="display:flex">
    <div class="box-item" v-for="(item,index) of baseList" :key='index'>
      <p @click="show(item.id)">{{item.id}}</p>
      <p @click="del(item.id)">delete</p>
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
            "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjM1MjI5NjQyLCJlbWFpbCI6IiJ9.Foj2rGAWMP0tHmnaEJcrEiYEQ2L2s61ZpPyNyMMm9Hg",
        },
        success: function (res) {
               console.log(res);
               self.reload()
        },
      });
    },
  },
  created() {
    var self = this;
    $.ajax({
      type: "get",
      url: "http://smartsend.beta.seamarketings.com/api/v3/base_template/",
      headers: {
        Authorization:
          "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjM1MjI5NjQyLCJlbWFpbCI6IiJ9.Foj2rGAWMP0tHmnaEJcrEiYEQ2L2s61ZpPyNyMMm9Hg",
      },
      success: function (res) {
        self.baseList = res.data.results;
      },
    });
  },
};
</script>
<style scoped>
.box-item {
  height: 50px;
  width: 50px;
  border: 1px solid gray;
  margin: 5px;
  text-align: center;
  cursor: pointer;
}
</style>