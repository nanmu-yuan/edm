<template>
  <div class="warp-box">
    <el-form :inline="true">
      <el-divider>STYLE</el-divider>
      <el-form-item v-for="(c_item,c_key) in configData">
        <div style="display:flex;">
          <div>
            <el-popover placement="left" width="270" trigger="click">
              <div class="pop-title">{{c_key}}</div>
              <div>
                 <el-form ref="form" label-width="150px">
                <el-form-item label="color" v-if="configData[c_key].color !=undefined">
                  <el-color-picker v-model="configData[c_key].color" size="small"
                    @active-change="activeChange($event,c_key,'color')"></el-color-picker>
                </el-form-item>
                <el-form-item label="Bottom border color" v-if="configData[c_key].border_bottom_color !=undefined">
                  <el-color-picker v-model="configData[c_key].border_bottom_color" size="small"
                    @active-change="activeChange($event,c_key,'border_bottom_color')"></el-color-picker>
                </el-form-item>
                <el-form-item label="Bottom border style" v-if="configData[c_key].border_bottom_style !=undefined">
                  <el-select v-model="configData[c_key].border_bottom_style" size="small" style="width: 100Px;">
                    <el-option v-for="item of borderStyleOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Bottom border width" v-if="configData[c_key].border_bottom_width !=undefined">
                  <el-input-number style="width:100px" size="mini" v-model="configData[c_key].border_bottom_width">
                  </el-input-number>
                </el-form-item>

                <el-form-item label="Top border color" v-if="configData[c_key].border_top_color !=undefined">
                  <el-color-picker v-model="configData[c_key].border_top_color" size="small"
                    @active-change="activeChange($event,c_key,'border_top_color')"></el-color-picker>
                </el-form-item>
                <el-form-item label="Top border style" v-if="configData[c_key].border_top_style !=undefined">
                  <el-select v-model="configData[c_key].border_top_style" size="small" style="width: 100Px;">
                    <el-option v-for="item of borderStyleOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Top border width" v-if="configData[c_key].border_top_width !=undefined">
                  <el-input-number style="width:100px" size="mini" v-model="configData[c_key].border_top_width">
                  </el-input-number>
                </el-form-item>


                <el-form-item label="Font Size" v-if="configData[c_key].font_size !=undefined">
                  <el-input-number style="width:100px" size="mini" v-model="configData[c_key].font_size">
                  </el-input-number>
                </el-form-item>
                <el-form-item label="Font Weight" v-if="configData[c_key].font_weight !=undefined">
                  <el-select v-model="configData[c_key].font_weight" size="small" style="width: 100Px;">
                    <el-option v-for="item of options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Font Weight" v-if="configData[c_key].border_style !=undefined">
                  <el-select v-model="configData[c_key].border_style" size="small" style="width: 100Px;">
                    <el-option v-for="item of borderStyleOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Top padding" v-if="configData[c_key].top_padding != undefined">
                  <el-input-number style="width:100px" size="mini" v-model="configData[c_key].top_padding">
                  </el-input-number>
                </el-form-item>
                <el-form-item label="Top bottom" v-if="configData[c_key].bottom_padding!= undefined">
                  <el-input-number style="width:100px" size="mini" v-model="configData[c_key].bottom_padding">
                  </el-input-number>
                </el-form-item>
                <el-form-item label="Border width" v-if="configData[c_key].border_width!= undefined">
                  <el-input-number style="width:100px" size="mini" v-model="configData[c_key].border_width">
                  </el-input-number>
                </el-form-item>
                <el-form-item label="Border radius" v-if="configData[c_key].border_radius!= undefined">
                  <el-input-number style="width:100px" size="mini" v-model="configData[c_key].border_radius">
                  </el-input-number>
                </el-form-item>
                <el-form-item label="border color" v-if="configData[c_key].border_color !=undefined">
                  <el-color-picker v-model="configData[c_key].border_color" size="small"
                    @active-change="activeChange($event,c_key,'border_color')"></el-color-picker>
                </el-form-item>
                <el-form-item label="Pattern" v-if="configData[c_key].pattern!= undefined">
                 <div class="pattern-box" :style="pattern"></div>
                  </el-input-number>
                </el-form-item>
                <el-form-item label="background color" v-if="configData[c_key].bgColor !=undefined">
                  <el-color-picker v-model="configData[c_key].bgColor" size="small"
                    @active-change="activeChange($event,c_key,'bgColor')"></el-color-picker>
                </el-form-item>
                <el-form-item label="background image" v-if="configData[c_key].bgImage!= undefined">
                  <el-upload class="avatar-uploader" action='https://admin.fashionmia.net/opbm.php?a=EdmImages&m=Api'
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <el-button size="small">select image</el-button>
                  </el-upload>
                  <span @click="del(c_key)" class="style-delete el-icon-delete"></span>
                </el-form-item>
              </el-form>
              </div>
              <div class="bg-box" slot="reference" :style="{'color':configData[c_key].color}">A</div>
            </el-popover>
          </div>
          <div style="width: 50px;margin-right: 15px;"><span style="color:#909399">{{c_key}}</span></div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: "style_config",
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
        pattern:{
          backgroundImage:'url()',
          backgroundSize: 'contain'
        },
        options: [{
            labe: 'Normal',
            value: 'normal'
          },
          {
            labe: 'Bold',
            value: 'bold'
          }
        ],
        borderStyleOptions:[{
          labe: 'None',
          value: 'none'
        },
        {
          labe: 'Solid',
          value: 'solid'
        },
        {
          labe: 'Dashed',
          value: 'dashed'
        },
        {
          labe: 'Dotted',
          value: 'dotted'
        }
      ]
      };
    },
    watch: {
      configObj: {
        handler(nval) {
          this.configData = nval["style_setting"][this.configName];
          this.pattern.backgroundImage=`url(${this.configData['background']['bgImage']})`
        },
        deep: true,
      },
    },
    methods: {
      activeChange(data,c_key,type) {
        if(type =='border_color'){
          this.configData[c_key].border_color = data;
        }else if(type =='bgColor'){
          this.configData[c_key].bgColor = data;
        }else if(type =='color'){
          this.configData[c_key].color = data;
        }else if(type =='border_bottom_color'){
          this.configData[c_key].border_bottom_color = data;
        }else if(type =='border_top_color'){
          this.configData[c_key].border_top_color = data;
        }
      },
      handleAvatarSuccess(res) {
        this.configData['background']['bgImage'] = res.data.img;
        this.pattern.backgroundImage = `url(${res.data.img})`
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
      del(c_key){
        this.configData[c_key]['bgImage']='';
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
    margin: 0 15px 15px 15px;
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

  ::v-deep .el-select {
    width: 100px;
  }

  ::v-deep .el-color-picker--small .el-color-picker__trigger {
    width: 100px;
  }

  .pop-title {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #E4E7ED;
    margin-bottom: 15px;
  }

  .style-box {
    width: 25%;
  }
  .style-delete{
    position: absolute;
    right: 5px;
    top: 12px;
    cursor: pointer;
  }
  .pattern-box{
    width: 97px;
    height: 25px;
    border: 1px solid#EBEEF5;
  }
  
</style>