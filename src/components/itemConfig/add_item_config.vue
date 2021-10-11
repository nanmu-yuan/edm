<template>
  <div class="warp-box">
    <div class="add-item-box" v-for="(item,index)  of  configData.linkArr" :key="index">
      <el-collapse>
        <el-collapse-item name="1">
          <template slot="title">
           <div class="add-collapse-box">
               <span>LINK</span>
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
      <div @click="addItem">add</div>
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
  },
  data() {
    return {
      defaultData: {},
      configData: {},
      copyItemData:{},
      m1: ''
    };
  },
  methods:{
      addItem(){
          this.configData.linkArr.push(JSON.parse(JSON.stringify(this.copyItemData[0])))
      },
      removeItem(data,index){
          console.log(data,index)
          this.configData.linkArr.splice(index,1)
      }
  },
  created() {
    this.defaultData = this.configObj;
    console.log(this.configObj,99999)
    //this.copyItemData = JSON.parse(JSON.stringify(this.defaultData["content_setting"][this.configName]['linkArr']));
  },
  watch: {
    configObj: {
      handler: function (nval) {
        this.configData = nval["content_setting"][this.configName];
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
.add-collapse-box{
    width: 100%;
    text-align: center;
    position: relative;
}
.icon{
    position: absolute;
    right: 15px;
    top: 15px;
    font-size: 16px;
}
</style>
