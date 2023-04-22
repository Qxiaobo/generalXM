import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homePage',
    title:'傅红福',
    component: () => import('../views/home/homePage'),
    children:[
      {
        path:'comT',
        name:'comT',
        title:'组件一',
        component:()=>import("../views/comT/comT")
      },
    ]
  },
  {
    path: '/',
    name: 'liuaobo',
    title:'刘澳波',
    component: () => import('../views/home/homePage'),
    children:[
      {
        path:'com1',
        name:'com1',
        title:'组件一',
        component:()=>import("../views/com/comPage")
      }
    ]
  },
]
export default routes
