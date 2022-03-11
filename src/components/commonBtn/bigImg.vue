<template>
  <div id="big-img">
    <el-dialog :visible.sync="dialogData.type" width="40%" :show-close="false">
      <div class="tool-nav">
        <div class="nav-item"><span class="el-icon-circle-check" @click="show"></span></div>
        <div class="nav-item"><span class="el-icon-delete" @click="del"></span></div>
        <div class="nav-item"><span class="el-icon-circle-close" @click="close"></span></div>
      </div>
      <div class="bigImg-box">
        <el-image :src="dialogData.bigImg">
          <div slot="placeholder" class="image-slot">
            loading<span class="dot">...</span>
          </div>
        </el-image>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "bigImg",
  props: ["dialogData"],
  inject: ["reload"],
  data() {
    return {};
  },
  methods: {
    show() {
        let id = this.dialogData.id;
      this.$router.push({
        path: `/home/templateFactory`,
        query: {
          id: id,
        },
      });
      console.log(456789)
    },
    del() {
      var self = this;
      this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         let id = this.dialogData.id;
         self.$axios.delete(`/api/v3/base_template/${id}/`).then((res) => {
         self.reload();
      });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          }); 
        })
    },
    close() {
      this.dialogData.type = false;
    },
  },
  created() {},
};
</script>
<style scoped>
.bigImg-box {
  height: 650px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.tool-nav {
  display: flex;
  position: absolute;
  top: 8px;
  right: 40px;
  width: 90px;
}
.nav-item {
  width: 30px;
  height: 30px;
  font-size: 30px;
  cursor: pointer;
  margin: 2px 5px;
}
.nav-item:hover {
  color: #4db159;
  font-weight: bold;
}

</style>