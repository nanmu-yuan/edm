<template>
    <div class="warp-box">
      <el-divider>QuillEditor</el-divider>
      <el-form>
        <el-form-item >
            <quill-editor ref="myQuillEditor" v-model="configData.content" :options="editorOption" @change="onEditorChange($event)"/>
        </el-form-item>
      </el-form>
    </div>
  </template>
  <script>
const toolbarOptions = [
	['bold', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
	[{ color: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
	['link'], // 链接、图片、视频-----['link', 'image', 'video']
	[{ size: ['small', false, 'large', 'huge'] }], // 字体大小
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ align: [] }], // 对齐方式-----[{ align: [] }]
	['image'],
	[{ indent: '-1' }, { indent: '+1' }],
];
  export default {
      name:'editor_config',
      props: {
         configObj:{
             type:Object
         },
         configName:{
             type:String
         }
      },
      data () {
          return {
              defaultData: {},
              configData: {},
              editorOption: {
                  modules: {
                      toolbar: toolbarOptions,
                  },
                  placeholder: 'Variable input such as *[tr_variable]*',
              }
          }
      },
      methods: {
        onEditorChange({ quill, html, text }) {
			console.log(html)
		},
      },
      created () {
          this.defaultData = this.configObj
      },
      watch: {
          configObj:{
              handler:function(nval){
                 //this.defaultData = nval;
                 this.configData = nval['content_setting'][this.configName];
              },
              deep:true,
          }
      }
  }
  </script>
  <style scoped>
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