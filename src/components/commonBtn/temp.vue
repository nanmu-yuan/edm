<template>
    <div class="temp-box">
        <div class="temp-box-item" v-for="(item, index) in listData" :key="index" @click = "show(item.id)">
            <el-image :src="item.json_text.baseImg">
                <div slot="placeholder" class="image-slot">
                  loading<span class="dot">...</span>
                </div>
              </el-image>
        </div>
    </div>
</template>
<script>
import {EventBus} from '../../util/eventBus.js'
  export default {
      name:'temp',
      props:{
        baseList: {
            type: Array,
        },
      },
      data () {
          return {
           listData:[]
          }
      },
      methods: {
        show(id){
        let self = this;
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.axios.get(`/api/v3/base_template/${id}/`).then(res =>{
          EventBus.$emit('modifyTempConfig',res);
                loading.close();
        })
        }
      },
      watch:{
        baseList:{
            handler(nval){
                this.listData = nval;
            },
            deep:true,
            immediate:true
        }
      },
      created() {
      },
    }
</script>
  <style scoped>
.temp-box{
    display: flex;
    flex-wrap: wrap;
    position: relative;
}
.temp-box-item{
    position: relative;
    width: 200px;
    height: 200px;
    margin: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: all .2s linear;
  }
  .temp-box-item:hover{
    transform: translate3d(0,-2px,0);
    z-index: 14;
    border: 2px solid #4db159;
    box-sizing: border-box;

  }
  </style>