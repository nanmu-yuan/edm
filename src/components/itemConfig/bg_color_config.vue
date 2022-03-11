<template>
    <div class="warp-box">
        <el-form :inline="true">
            <div class="title">BACKGROUND</div>
            <el-form-item>
                <div class="bg-box"></div>
            </el-form-item>
            <el-form-item label="background color">
                <el-color-picker v-model="configData.bgColor" show-alpha @active-change="activeChange"></el-color-picker>
            </el-form-item>
            <el-form-item label="background image">
                <el-upload class="avatar-uploader" :data="params" action="/api/v3/base_template/upload/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import MXKpayEncrypt from "../../util/crypto";
export default {
    name: "bg_color_config",
    props: {
        configObj: {
            type: Object,
        },
        configName: {
            type: String
        }
    },
    data() {
        return {
            configData: {},
        }
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
    watch: {
        configObj: {
            handler(nval) {
                this.configData = nval['style_setting'][this.configName];
            },
            deep: true,
        },
    },
    methods: {
        activeChange(data) {
            this.configData['bgColor'] = data;
        },
        handleAvatarSuccess(res) {
            this.configData['imageUrl'] =  res && res.data &&res.data.data&&res.data.data.user_url;
        },
        beforeAvatarUpload(file) {
            // const isJPG = file.type === "image/jpeg";
            // const isLt2M = file.size / 1024 / 1024 < 2;

            // if (!isJPG) {
            //     this.$message.error("上传头像图片只能是 JPG 格式!");
            // }
            // if (!isLt2M) {
            //     this.$message.error("上传头像图片大小不能超过 2MB!");
            // }
            // return isJPG && isLt2M;
            return true
        },
    },
};
</script>
<style scoped>
.bg-box {
    width: 35px;
    height: 35px;
    border: 1px solid gray;
    border-radius: 50%;
}
.warp-box{
         border-top: 1px solid #fefefe;
    }
.title{
    margin: 8px 0 15px 0;
    padding: 2px 0;
    text-align: center;
    background: #E4E7ED;
    border-radius: 4px;
}
</style>