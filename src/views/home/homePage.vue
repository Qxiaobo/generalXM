<template>
  <div>
    <el-container>
      <el-header height="100px">很强大的组件库</el-header>
      <el-container>
        <el-aside style="width: 400px">
        <el-menu
          :default-active="$route.path"
          background-color="#fff"
          active-text-color="#1890ff"
          class="el-menu-vertical-demo"
          text-color="#000"
          router
        >
          <el-submenu
            :index="'/' + item.path"
            v-for="(item, index) in routerList"
            :key="index"
          >
            <template slot="title">
              <!-- <img
                :src="require('@/assets/icon/' + item.icon + '.png')"
                alt=""
                class="menu-img"
              /> -->
              <span slot="title" class="menu-title">{{ item.title }}</span>
            </template>
            <el-menu-item
              :index="'/' + j.path"
              :title="j.title"
              v-for="(j, i) in item.children"
              :key="i"
              class="everyRouter"
              >{{ j.title }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import routes from "@/utils/menu";
import routerList from "@/router/index.js";

export default {
  data() {
    return {
      routerList,
      routes: routes.menu,
    }
  },
  mounted() {
    console.log(routerList,'路由')
    console.log(routes)

  },
  computed: {

  },
  methods: {

  },
}
</script>
<style scoped>
  .el-header{
    background-color: #B3C0D1;
    color: #333;
    line-height: 100px;
    font-size: 26px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    height: calc(100vh - 116px);
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
  .el-aside::-webkit-scrollbar {
  width: 0 !important;
}
  .el-menu-vertical-demo{
    padding-left: 20px;
    padding-right: 20px;
  }
</style>
