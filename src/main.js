import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import request from './http'
import router from './router' 
import store from './store/index.js'
import './assets/icon/iconfont.css'
import {get,post,jsonp,tpPost,queryProductBySpu} from './http'

import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
//edm
import axios from 'axios'
Vue.prototype.get = get;
Vue.prototype.post = post;
Vue.prototype.jsonp = jsonp
Vue.prototype.axios = axios;

/***
 * 
 */
//template
Vue.prototype.tpPost = tpPost;
Vue.prototype.get = queryProductBySpu;
import VueLazyload from 'vue-lazyload'
import domToImage from 'dom-to-image';
Vue.prototype.domToImage = domToImage;
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('./assets/images/e-loading.gif'),
  attempt: 1
  })

  /*** */
Vue.use(ElementUI,{locale});
Vue.prototype.$axios = request;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')