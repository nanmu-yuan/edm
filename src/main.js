import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import VueLazyload from 'vue-lazyload'
import {post,jsonp,queryProductBySpu} from './http'
import domToImage from 'dom-to-image'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.prototype.domToImage = domToImage;
Vue.prototype.get = queryProductBySpu;
Vue.prototype.jsonp = jsonp;
Vue.prototype.post = post;
Vue.prototype.axios = axios;
Vue.use(VueQuillEditor)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('./assets/images/loading.gif'),
  attempt: 1
  })
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
