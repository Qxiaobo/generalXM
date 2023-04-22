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
    component: () => import('../views/home/homePage'),
    redirect: '/home',
    children:[
      {
        path:'/home',
        name:'home',
        component:()=>import("../views/home/homeHome")
      },
      {
        path:'/com1',
        name:'com1',
        component:()=>import("../views/com/comPage")
      },
      {
        path:'/comT',
        name:'comT',
        component:()=>import("../views/comT/comT")
      },
    ]
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  // {
  //   // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面
  //   path: '/my-page/*', // vue-router@4.x path的写法为：'/my-page/:page*'
  //   name: 'my-page',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/myPage.vue'),
  // },
]

// const router = new VueRouter({
//   base: window.__MICRO_APP_BASE_ROUTE__ || "/",
//   routes
// })

export default routes
