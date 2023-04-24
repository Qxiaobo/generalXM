<!--
 * @Author: liuaobo 3376679936@qq.com
 * @Date: 2023-04-22 15:50:13
 * @LastEditors: liuaobo 3376679936@qq.com
 * @LastEditTime: 2023-04-24 11:20:04
 * @FilePath: \lab-project\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app">
    <!-- <v-scale-screen :size="size" :boxStyle="{background:'null'}" > -->
    <router-view />
<!-- </v-scale-screen> -->

  </div>
</template>

<script >
// import { createApp } from 'vue';
// import { registerMicroApps, start } from 'fusuma';

export default {
  name: 'App',
  data(){
    return {
      size: { // 适配尺寸
        width: 1980,
        height: 1080,
      },
    }
  },
  mounted() {
    // registerMicroApps([{
    //   name: 'my-microapp',
    //   entry: 'http://localhost:8080',
    //   container: this.$refs.microapp,
    //   activeRule: '/my-microapp',
    // }]);

    // start();
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  // 隐藏x轴滚动条
}
body{
  overflow-x: hidden;
}
</style>
