/*
 * @Author: liuaobo 3376679936@qq.com
 * @Date: 2023-04-23 14:26:40
 * @LastEditors: liuaobo 3376679936@qq.com
 * @LastEditTime: 2023-04-24 11:13:55
 * @FilePath: \lab-project\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from '../views/HomeView.vue'

// 重写push方法
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};
// q:解释一下上面的代码
// a:这是为了解决vue-router在3.0版本以上重复点击路由报错的问题
// q:为什么会报错
// a:因为vue-router在3.0版本以上使用了promise的方式处理路由跳转,如果不处理,重复点击路由会报错
// q:为什么要用call
// a:因为vue-router的源码中并没有直接调用push方法,而是调用了一个名为transitionTo的方法,所以我们要用call来改变this指向
// q:为什么要用catch
// a:因为promise的catch方法可以捕获错误,如果不用catch,重复点击路由会在控制台报错,但是代码不会报错
// q:为什么要return
// a:因为vue-router的源码中的transitionTo方法返回了一个promise
// q:为什么要return routerPush.call
// a:因为routerPush.call返回的是一个promise,如果不return,routerPush方法的返回值就是undefined,这样的话,重复点击路由就会报错  重写replace方法

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    title: "首页",
    component: () => import("../views/home/homePage"),
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        title: "首页组件",
        component: () => import("../views/home/homeHome"),
      },
    ],
  },
  {
    path: "/",
    name: "homePage",
    title: "傅红福",
    icon:'aichong06',
    component: () => import("../views/home/homePage"),
    children: [
      // {
      //   path: "comT",
      //   name: "comT",
      //   title: "傅红福组件一",
      //   component: () => import("../views/fhfCom/comT"),
      // },
      {
        path: "tabelTransfer",
        name: "tabelTransfer",
        title: "表格穿梭框",
        icon:'biaoge1',
        component: () => import("../views/fhfCom/tabelTransfer/index.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "liuaobo",
    title: "点点VS叉叉--lab",
    icon:'aichong02',
    component: () => import("../views/home/homePage"),
    children: [
      {
        path: "labCom",
        name: "labCom",
        // labCom: "labCom",
        title: "表格展示",
        icon:'biaoge1',
        component:  () => import("../views/labCom/cleanForm/index.vue")
      },
      {
        path: "qrCode",
        name: "qrCode",
        // labCom: "qrCode",
        title: "二维码生成",
        icon:'erweima',
        component: () => import("../views/labCom/qrCode/index.vue"),
      },
      {
        path: "verificationCode",
        name: "verificationCode",
        // labCom: "qrCode",
        title: "登录页面",
        icon:'jinrongxianxingge-',
        component: () => import("@/views/labCom/verificationCode/index.vue"),
      },
      {
        path: "directiveDemo",
        name: "directiveDemo",
        // labCom: "qrCode",
        title: "自定义指令",
        icon:'yuedu',
        component: () => import("@/views/labCom/directiveDemo/index.vue"),
      },
      {
        path: "uploadFile",
        name: "uploadFile",
        title: "文件上传",
        icon:'shangchuan1',
        component: () => import("@/views/labCom/uploadFile/index.vue"),
      },
    ],
  },
];
export default routes;
