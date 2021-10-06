<template>
  <div>
    <el-form :inline="true">
       <el-form-item>
         <div class="bg-box"></div>
      </el-form-item>
      <el-form-item label="background color">
        <el-color-picker
          v-model="configData.bgColor"
          show-alpha
          @active-change = "activeChange"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="background image">
        <el-upload
          class="avatar-uploader"
          action='https://admin.fashionmia.net/opbm.php?a=EdmImages&m=Api'
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <i  class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "bg_color_config",
  props: {
    configObj: {
      type: Object,
    },
    configName:{
        type:String
    }
  },
  data () {
      return {
        configData:{},
      }
  },
  watch: {
    configObj: {
      handler(nval) {
        this.configData = nval['style_setting'][this.configName];
      },
      deep: true,
    },
  },
  methods: {
      activeChange(data){
          this.configData['bgColor'] = data;
      },
    handleAvatarSuccess(res) {
      this.configData['imageUrl'] = res.data.img;
      this.configData['bgColor'] = '#fff'
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>
<style scoped>
.bg-box{
  width: 35px;
  height: 35px;
  border: 1px solid gray;
  border-radius: 50%;
}
</style>