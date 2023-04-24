/*
 * @Author: liuaobo 3376679936@qq.com
 * @Date: 2023-04-22 15:50:13
 * @LastEditors: liuaobo 3376679936@qq.com
 * @LastEditTime: 2023-04-24 09:55:32
 * @FilePath: \lab-project\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import App from "./App.vue";
import routes from "./router";
import VueRouter from 'vue-router'
import store from "./store";
import "./styles/index.scss";
import '@/mock/data.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VScaleScreen from 'v-scale-screen';

import VueParticles from 'vue-particles'
Vue.use(VueParticles) 

Vue.component('v-scale-screen', {
  name: 'v-scale-screen',
  ...VScaleScreen
});

Vue.use(VScaleScreen, {
  designWidth: 750, // 设计稿宽度
  designHeight: 1334, // 设计稿高度
});

Vue.use(ElementUI);
const router = new VueRouter({
  // 👇 设置基础路由，子应用可以通过window.__MICRO_APP_BASE_ROUTE__获取基座下发的baseroute，如果没有设置baseroute属性，则此值默认为空字符串
  base: window.__MICRO_APP_BASE_ROUTE__ || "/",
  routes,
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
