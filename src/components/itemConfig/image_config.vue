<template>
  <div class="warp-box">
    <el-divider>{{configData.title}}</el-divider>
    <el-form>
      <el-form-item>
        <el-upload class="avatar-uploader" action="https://admin.fashionmia.net/opbm.php?a=EdmImages&m=Api" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
         <el-button>SELECT IMAGE</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
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
      this.configData["value"] = res.data.img;
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
.warp-box{
       border-top: 1px solid #fefefe;
    }
</style>