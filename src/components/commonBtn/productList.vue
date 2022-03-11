<template>
  <div>
    <el-dialog
      title="商品数据"
      :visible.sync="productListDialog.type"
      width="70%"
      :modal="false"
      :center="true"
      :fullscreen="true"
    >
       <el-table :data="productListDialog.dataList" border stripe style="width: 100%" max-height="800" row-key="goods_name">
        <el-table-column label="移动"  width="50">
          <template >
            <span><span class="el-icon-s-promotion handle"></span></span>
          </template>
        </el-table-column>
        <el-table-column label="图片" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px"><img height="70" :src="scope.row.img" alt=""></span>
          </template>
        </el-table-column>
        <el-table-column label="图片链接" width="180">
          <template slot-scope="scope">
               <el-input :autosize="{ minRows: 2, maxRows: 3}" type="textarea"  v-model="scope.row.img"/>
          </template>
        </el-table-column>
        <el-table-column label="名称" width="180">
          <template slot-scope="scope">
               <el-input :autosize="{ minRows: 2, maxRows: 3}" type="textarea"  v-model="scope.row.goods_name"/>
          </template>
        </el-table-column>
        <el-table-column label="地址" min-width="180">
          <template slot-scope="scope">
              <el-input :autosize="{ minRows: 2, maxRows: 3}" type="textarea"  v-model="scope.row.url"/>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="90">
          <template slot-scope="scope">
              <el-input style="width:80px" type="text" size='mini' v-model="scope.row.price"/>
          </template>
        </el-table-column>
        <el-table-column label="市场价" width="90">
          <template slot-scope="scope">
              <el-input type="text" style="width:80px" size='mini' v-model="scope.row.market_price"/>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import Sortable from 'sortablejs'
export default {
  name: "productList",
  props: {
    ProductDialogVisible: {
      type: Object,
    },
  },
  data() {
    return {
      productListDialog: this.ProductDialogVisible,
    };
  },
  watch:{
    ProductDialogVisible:{
      handler(nval){
        if(nval['dataList']&&nval['dataList']['length']){
         setTimeout(()=>{
           this.rowDrop()
         },50)
        }
      },
      deep:true
    }
  },
   methods: {
    // 行拖拽
    rowDrop () {
      const tbody = document.querySelector('.el-table__body tbody')
      if(!tbody) return;
      const self = this;
      Sortable.create(tbody, {
        animation: 150,
        handle: '.handle',
        scroll: true,
        onEnd ({ newIndex, oldIndex }) {
          const currRow = self.productListDialog.dataList.splice(oldIndex, 1)[0]
          self.productListDialog.dataList.splice(newIndex, 0, currRow);
           self.$message({ type: 'success',message:'排序成功'});
        }
      })
    },
  },
  mounted () {
    this.rowDrop()
  },
};
</script>
<style scoped>
  .handle{
    cursor:all-scroll;
    color: blueviolet;
    font-size: 28px;
  }
</style>