import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import VueLazyload from 'vue-lazyload'
import {get,post,jsonp} from './http'
Vue.prototype.get = get;
Vue.prototype.post = post;
Vue.prototype.jsonp = jsonp
Vue.prototype.axios = axios
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
