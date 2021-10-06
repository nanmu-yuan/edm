import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
//引入elementui 组件库
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(VueRouter);
Vue.use(elementUI);
const router = new VueRouter({
    mode:'history',
    routes
})
export default router