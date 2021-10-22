<template>
  <div class="header-box">
    <div class="header-content">
      <div class="r-menu">
        <div class="add-site-box">
          <el-button @click="addSite">add site</el-button>
        </div>
        <div class="select-site-box">
          <el-select v-model="value" filterable placeholder="请选择">
            <el-option v-for="item in siteOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <ydialog :centerDialogVisible="isDialog"></ydialog>
  </div>
</template>
<script>
import ydialog from "@/components/commonBtn/ydialog";
export default {
  name: "Theader",
  props: {
    siteList: {
      type: Object,
    },
  },
  data() {
    return {
      isDialog: {
        type: false,
      },
      siteInfo: "",
      value: "",
      siteOptions: [],
    };
  },
  methods: {
    addSite() {
      this.isDialog.type = true;
    },
    dataConfig(data) {
      let list = Object.keys(data.api).map((item) => {
        return {
          value: item,
          label: item,
        };
      });
     this.siteOptions = list;
    },
  },
  watch: {
    siteList: {
      handler(nval) {
        if (nval) {
          this.dataConfig(nval);
        }
      },
      deep: true,
    },
  },
  components: {
    ydialog,
  },
};
</script>
<style scoped>
.header-box {
  height: 50px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 5px 20px;
}
.header-content {
  position: relative;
  width: 100%;
}
.r-menu {
  position: absolute;
  right: 0px;
  display: flex;
}
.add-site-box {
  margin-right: 15px;
}
</style>