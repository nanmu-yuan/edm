<template>
  <div class="warp-box">
    <el-divider>Wangeditor</el-divider>
    <el-form>
      <el-form-item>
        <editor  v-model="configData.content" :isClear="isClear" @change="change"> </editor>
      </el-form-item>
    </el-form>
  </div>
</template>
  <script>
  import editor from '../commonBtn/editor'
export default {
  name: "editor_config",
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
       isClear: false,
        detail:""
    };
  },
  methods: {
change(val) {
   
      
    },
  },
  created() {
    this.defaultData = this.configObj;
  },
  components:{
    editor
  },
  watch: {
    configObj: {
      handler: function (nval) {
        this.configData = nval["content_setting"][this.configName];
      },
      deep: true,
    },
  }
};
</script>
  <style scoped>
.warp-box {
  border-top: 1px solid #fefefe;
}
.title {
  margin: 8px 0 15px 0;
  padding: 2px 0;
  text-align: center;
  background: #e4e7ed;
  border-radius: 4px;
}
</style>