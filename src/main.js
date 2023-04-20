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
// import microApp from "@micro-zoe/micro-app";

// microApp.start();

// Vue.config.productionTip = false;


// main.js

// const App = new Vue({
//   el: '#app',
//   components: {
//     Message,
//   },
//   template: `
//     <div id="app">
//       <button @click="showMessage">Show Message</button>
//     </div>
//   `,
//   methods: {
//     showMessage() {
//       this.$refs.message.success('Hello World!');
//     },
//   },
//   mounted() {
//     const message = this.$refs.message;
//     message.success = function (text, duration = 2000) {
//       message.$emit('show', { type: 'success', text, duration });
//     };
//     message.error = function (text, duration = 2000) {
//       message.$emit('show', { type: 'error', text, duration });
//     };
//     message.warning = function (text, duration = 2000) {
//       message.$emit('show', { type: 'warning', text, duration });
//     };
//   },
// });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
