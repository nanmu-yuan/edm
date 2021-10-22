<template>
  <div>
    <el-dialog title="Add Site" :visible.sync="centerDialogVisible.type" width="30%" center>
      <span>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="平台">
            <el-select v-model="form.region" placeholder="请选择平台">
              <el-option label="cloud" value="cloud"></el-option>
              <el-option label="shopify" value="shopify"></el-option>
              <el-option label="meSystem" value="meSystem"></el-option>
               <el-option label="Independence" value="Independence"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="站点id">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="站点名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cance">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
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
  methods: {
    cance() {
      this.centerDialogVisible.type = false;
    },
    submit() {},
  },
  data() {
    return {
      form: {
        name: "123",
        region:'asd'
      },
    };
  },
};
</script>
<style scoped>
</style>