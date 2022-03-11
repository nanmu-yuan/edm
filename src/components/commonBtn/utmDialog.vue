<template>
  <div>
    <el-dialog
      :visible.sync="utmdialogData.type"
      width="60%"
      :show-close="false"
      title="参数设置"
    >
      <span>
        <el-form ref="form" :model="form" label-width="105px">
          <el-form-item label="当前参数信息">
            <el-input
              v-model="utmData"
              disabled
              type="textarea"
              :rows="3"
            ></el-input>
            <p style="line-height: 16px; font-size: 10px; color: #909399">
              <span style="color: red">注 :</span>
              当前显示的参数，不覆盖Preheader、Footer、SplitLine
              组件，若需设置可复制添加；Product产品更换参数需删除后重新上传
            </p>
          </el-form-item>
          <el-form-item label="Campaign">
            <el-input v-model="form.utm_campaign"></el-input>
          </el-form-item>
          <el-form-item label="Term">
            <el-input v-model="form.utm_term"></el-input>
          </el-form-item>
          <el-form-item label="自定义时间">
            <el-date-picker v-model="form.time" value-format="yyyyMMdd" format="yyyyMMdd" type="date" placeholder="选择日期">
            </el-date-picker>
             <p style="line-height: 16px; font-size: 10px; color: #909399">
              <span style="color: red">注 :</span>
              系统默为当天的时间，设置后的时间优先级最高，删除则显示为默认时间。
            </p>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="utmdialogData.type = false">关闭弹框</el-button>
        <el-button type="primary" @click="submit">确认设置</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "utmdialog",
  props: {
    utmdialogData: {
      type: Object,
    },
  },
  computed: {
    ...mapState("siteConfig", ["track"]),
  },
  data() {
    return {
      form: {
        utm_campaign: "",
        utm_term: "",
        time: "",
      },
      utmData: "",
    };
  },
  watch: {
    track: {
      handler(nval) {
        this.utmData = nval;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    submit() {
      this.$store.commit("siteConfig/UPDATESITENAME", {
        utm_campaign: this.form.utm_campaign,
        utm_term: this.form.utm_term,
        time:this.form.time
      });
      this.utmdialogData.type = false;
      this.$message({
        message: "参数设置成功",
        type: "success",
      });
    },
  },
  created() {},
};
</script>
<style scoped>
</style\