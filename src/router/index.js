import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// 重写push方法
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homePage',
    title:'傅红福',
    component: () => import('../views/home/homePage'),
    redirect: '/home',
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
