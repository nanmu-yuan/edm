// 路由表
import templateFactory from '../views/tempate/templateTactory.vue'
import templateList from '../views/tempate/templateList.vue'
import home from '../views/tempate/Home.vue'
const routes = [
    {
        path:'',
        redirect: '/home/templateList'
    },
    {
        path:'/home',
        name:'home',
        meta: { title: 'Statistics', icon: 'el-icon-s-data' },
        component:home,
        children:[
            {
                path:'',
                redirect: 'templateList',
                meta: { title: 'Trigger Statistics' }
            },
            {
              path: 'templateList',
              name: 'templateList',
              component: templateList,
              meta: { title: 'Trigger Statistics' }
            }, {
              path: 'templateFactory',
              name: 'templateFactory',
              meta: { title: 'Trigger Statistics' },
              component: templateFactory,
            },
        ]
    },

]
export default routes