<template>
  <div class="warp-box">
    <el-form :inline="true">
      <div class="title">FONT STYPE</div>
      <el-form-item v-for="(c_item,c_key) in configData">
        <div style="display:flex;" >
          <div>
            <el-popover placement="left" :title="c_key" width="250" trigger="click">
              <el-form ref="form" label-width="90px">
                <el-form-item label="Text color">
                  <el-color-picker v-model="configData[c_key].color" size="small" @active-change="activeChange($event,c_key)"></el-color-picker>
                </el-form-item>
                <el-form-item label="Font Size">
                  <el-input-number style="width:100px" size="mini" v-model="configData[c_key].font_size"></el-input-number>
                </el-form-item>
                <el-form-item label="Font Weight">
                  <el-select v-model="configData[c_key].font_weight " size="small">
                    <el-option v-for="item of options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Top padding" v-if="configData[c_key].top_padding">
                  <el-input-number style="width:100px" size="mini" v-model="configData[c_key].top_padding"></el-input-number>
                </el-form-item>
                <el-form-item label="Top bottom" v-if="configData[c_key].bottom_padding">
                  <el-input-number style="width:100px" size="mini" v-model="configData[c_key].bottom_padding"></el-input-number>
                </el-form-item>
                <el-form-item label="Border width" v-if="configData[c_key].border_width>=0">
                  <el-input-number style="width:100px" size="mini" v-model="configData[c_key].border_width"></el-input-number>
                </el-form-item>
                <el-form-item label="Border radius" v-if="configData[c_key].border_radius>=0">
                  <el-input-number style="width:100px" size="mini" v-model="configData[c_key].border_radius"></el-input-number>
                </el-form-item>
                <el-form-item label="Border color" v-if="configData[c_key].border_color">
                  <el-color-picker v-model="configData[c_key].border_color" size="small" @active-change="borderActiveChange($event,c_key)"></el-color-picker>
                </el-form-item>
              </el-form>
              <div class="bg-box" slot="reference" :style="{'color':configData[c_key].color}">A</div>
            </el-popover>
          </div>
          <div>
            <span style="color:#909399">{{c_key}}</span>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "font_config",
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
      configData: {},
      color1: "RED",
      options:[
          {
              labe:'Normal',
              value:'normal'
          },
          {
              labe:'Bold',
              value:'bold'
          }
      ]
    };
  },
  watch: {
    configObj: {
      handler(nval) {
        this.configData = nval["style_setting"][this.configName];
      },
      deep: true,
    },
  },
  methods: {
      activeChange(data,c_key){
         this.configData[c_key].color = data;
      },
      borderActiveChange(data,c_key){
        this.configData[c_key].border_color = data;
      }
  },
};
</script>
<style scoped>
.bg-box {
  width: 35px;
  height: 35px;
  border: 1px solid gray;
  border-radius: 50%;
  margin: 0 15px 15px 0;
  cursor: pointer;
  text-align: center;
  font-size: 18px;
  line-height: 35px;
}
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
::v-deep .el-form-item {
  margin-bottom: 0px;
}
</style>