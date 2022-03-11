<template>
  <div>
    <el-dialog title="Add Site" :visible.sync="centerDialogVisible.type" width="30%" center>
      <span>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="平台" prop="site_type" :rules="[
          { required: true, message: '不能为空'},
        ]">
            <el-select v-model="form.site_type" placeholder="请选择平台">
              <el-option label="cloud" value="cloud"></el-option>
              <el-option label="shopify" value="shopify"></el-option>
              <el-option label="meSystem" value="meSystem"></el-option>
              <el-option label="Independence" value="Independence"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="站点id" v-if="form.site_type !='meSystem'" prop="site_id" :rules="[
          { required: true, message: '不能为空'},
        ]">
            <el-input v-model="form.site_id"></el-input>
          </el-form-item>
          <el-form-item v-else label="API" prop="site_type" :rules="[
          { required: true, message: '不能为空'}
        ]">
            <el-input v-model="apiUrl"></el-input>
          </el-form-item>
          <el-form-item label="站点名称" prop="site_name" :rules="[
          { required: true, message: '不能为空'},
        ]">
            <el-input v-model="form.site_name"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cance">取 消</el-button>
        <el-button type="primary" @click="submit('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { EventBus } from "../../util/eventBus.js";
export default {
  name: "ydialog",
  props: {
    dialogData: {
      type: Object,
    },
    centerDialogVisible: {
      type: Object,
    },
  },
  data() {
    return {
      apiUrl: "",
      form: {
        site_name: "",
        site_type: "",
        site_id: "",
      },
    };
  },
  methods: {
    cance() {
      this.centerDialogVisible.type = false;
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addFun();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addFun() {
      let id = this.form.site_id,
        api_url = "",
        pld = this.form.site_type;
      if (pld == "cloud") {
        api_url = `http://cloud-api.orderplus.com/api/goods/list?siteId=${id}&processCurrency=true&spu=`;
      } else if (pld == "shopify") {
        api_url = `http://lms.orderplus.com/api/bamboo/siteProduct/getPDMSpdSpuInfoList?siteId=${id}&spus=`;
      } else if (pld == "meSystem") {
        api_url = `${this.apiUrl}`;
        this.form.site_id = new Date().getTime();
      }
      let postData = Object.assign(this.form, {
        api_url,
      });
      this.axios.post("/api/edm/site/add/", {
          ...postData,
        })
        .then((res) => {  
          EventBus.$emit("query");
          this.centerDialogVisible.type = false;
          this.$refs["form"].resetFields();
          this.$notify({
            title: "成功",
            message: "站点添加成功!",
            type: "success",
          });
        });
    },
  },
  created() {},
};
</script>
<style scoped>
</style>