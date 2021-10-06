// 路由表
import Home from '../views/Home.vue'
const routes = [
    {
        path:'',
        redirect: '/home'
    },
    {
        path:'/home',
        name:'Home',
        component:Home
    }
]
export default routes