// 路由表
import templateFactory from '../views/templateFactory.vue'
import templateList from '../views/templateList.vue'
import home from '../views/Home.vue'
const routes = [
    {
        path:'',
        redirect: '/home/templateList'
    },
    {
        path:'/home',
        name:'home',
        component:home,
        children:[
            {
                path:'',
                component:templateList
            },
            {
                path:'templateList',
                name:'templateList',
                component:templateList
            },
            {
                path:'templateFacyory',
                name:'templateFacyory',
                component:templateFactory
            }
        ]
    },

]
export default routes