<template>
  <div class="warp-box">
    <el-divider>{{configData.title}}</el-divider>
    <el-form>
      <el-form-item>
        <el-upload class="avatar-uploader" :data="params" action="/api/v3/base_template/upload/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <el-button>SELECT IMAGE</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import MXKpayEncrypt from "../../util/crypto";
export default {
  name: "image_config",
  props: {
    configObj: {
      type: Object,
    },
    configName: {
      type: String,
    },
  },
  data() {
    return {
      defaultData: {},
      configData: {},
    };
  },
  computed: {
    params: {
      get() {
        let staumtime = new Date().getTime();
        let cache = `${staumtime}.png_${staumtime}`;
        return {
          filename: MXKpayEncrypt(cache),
        };
      },
      set() {},
    },
  },
  created() {
    this.defaultData = this.configObj;
  },
  watch: {
    configObj: {
      handler: function (nval) {
        this.configData = nval["content_setting"][this.configName];
      },
      deep: true,
    },
  },
  methods: {
    handleAvatarSuccess(res) {
      this.configData["value"] = res && res.data && res.data.data&&res.data.data.user_url;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
  },
};
</script>
<style scoped>
.warp-box {
  border-top: 1px solid #fefefe;
}
</style>