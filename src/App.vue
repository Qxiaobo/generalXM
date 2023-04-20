<template>
  <div id="app">
    <v-scale-screen :size="size" :boxStyle="{background:'null'}" >

    <!-- <micro-app name="my-app" url="http://localhost:8080/"></micro-app> -->
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/my-page/">my-page</router-link>

    </nav>
    <router-view />
</v-scale-screen>

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
        width: 750,
        height: 1334,
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
