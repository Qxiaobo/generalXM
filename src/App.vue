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
}
</style>
