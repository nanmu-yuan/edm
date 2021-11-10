<template>
  <div class="warp-box">
    <el-divider>ADD LINK</el-divider>
    <div class="add-item-box" v-for="(item,index)  of  configData.linkArr" :key="index">
      <el-collapse>
        <el-collapse-item name="1">
          <template slot="title">
            <div class="add-collapse-box">
              <span>{{item.textItem.value}}</span>
              <span @click.stop="removeItem(item,index)" class="icon el-icon-delete"></span>
            </div>
          </template>
          <el-form class="add-box">
            <el-form-item :label="item.linkItem.label">
              <el-input v-model="item.linkItem.value"></el-input>
            </el-form-item>
            <el-form-item :label="item.textItem.label">
              <el-input v-model="item.textItem.value"></el-input>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="add-btn-box">
      <el-button @click="addItem" :disabled="addBtnDisable">add</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "add_item_config",
  props: {
    configObj: {
      type: Object,
    },
    configName: {
      type: String,
    },
    num: {
      type: String,
    },
  },
  data() {
    return {
      defaultData: {},
      configData: {},
      copyItemData: {},
      addBtnDisable: false,
    };
  },
  methods: {
    addItem() {
      if (this.configData.linkArr.length >= 4) {
        return;
      }
      this.configData.linkArr.push(
        JSON.parse(JSON.stringify(this.copyItemData))
      );
    },
    removeItem(data, index) {
      if (this.configData.linkArr.length <= 1) {
        return;
      }
      this.configData.linkArr.splice(index, 1);
    },
  },
  created() {
    this.defaultData = this.configObj;
    this.copyItemData = JSON.parse(
      JSON.stringify(
        this.$store.state.adminConfig.defaultArray[this.num]["content_setting"][
          "add_item_config"
        ].linkArr[0]
      )
    );
  },
  watch: {
    configObj: {
      handler: function (nval) {
        this.configData = nval["content_setting"][this.configName];
        if (this.configData.linkArr.length >= 4) {
          this.addBtnDisable = true;
        } else {
          this.addBtnDisable = false;
        }
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.warp-box {
  border-top: 1px solid #fefefe;
}
.add-box {
  padding: 0 20px 20px 20px;
}
::v-deep .el-form-item {
  margin-bottom: 0px !important;
}
::v-deep .el-button {
  width: 100% !important;
}
.add-btn-box {
  text-align: center;
  padding: 15px 100px;
}
.add-btn-box > div {
  border: 1px solid #dcdfe6;
  height: 35px;
  line-height: 35px;
  cursor: pointer;
}
.add-collapse-box {
  width: 100%;
  text-align: center;
  position: relative;
}
.icon {
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 16px;
}
.title{
    margin: 8px 0 15px 0;
    padding: 2px 0;
    text-align: center;
    background: #E4E7ED;
    border-radius: 4px;
}
</style>
