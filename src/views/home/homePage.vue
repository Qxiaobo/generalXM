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
              @click="toEveryRouter(j)"
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
          <div class="navWrap">
            <template v-for="(i, j) in navList">
              <div :key="j" :class="currentNav == i.path ? 'currentNav' : 'everyNav'" @click="clickNav(i.path)">
                {{ i.title }}
                <div class="closeWrap" v-if="i.path">
                  <img src="@/assets/icon/guanbi.png" alt="" class="imgUnactive">
                  <img src="@/assets/icon/guanbi (1).png" alt="" class="imgActive" @click.stop="closeNav(j)">
                </div>
              </div>
            </template>
            <div></div>
          </div>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { mapState } from "vuex";
import routerList from "@/router/index.js";
export default {
  data() {
    return {
      routerList,
    }
  },
  mounted() {
    console.log(routerList,'路由')
  },
  computed: {
    ...mapState({
      currentNav: (state) => state.currentNav,
      navList: (state) => state.navList,
    }),
  },
  methods: {
    ...mapMutations(["navListChange", "navListChangeClose","clickEveryNav"]),
    closeNav(index) {
      // console.log(index,'面包屑索引');
      this.navListChangeClose(index)
      this.$router.push("/"+this.currentNav)
    },
    toEveryRouter(item) {
      // console.log(item,'菜单');
      this.navListChange(item)
    },
    clickNav(path){
      // console.log(path,"面包屑路径");
      this.clickEveryNav(path)
      this.$router.push("/"+this.currentNav)
    }
  },
}
</script>
<style lang="scss" scoped>
.el-header {
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
  padding: 0;
}

.el-aside::-webkit-scrollbar {
  width: 0 !important;
}

.el-menu-vertical-demo {
  padding-left: 20px;
  padding-right: 20px;
}

.navWrap {
  width: 100%;
  height: 50px;
  background-color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
}

.everyNav {
  height: 30px;
  line-height: 30px;
  margin-left: 10px;
  border: 1px solid rgb(125, 125, 125);
  border-radius: 4px;
  padding: 0 10px;
  cursor: pointer;
  position: relative;
}

.everyNav:hover {
  color: #1296db;
  border: 1px solid #1296db;
}

.currentNav {
  height: 30px;
  line-height: 30px;
  margin-left: 10px;
  border-radius: 4px;
  padding: 0 10px;
  cursor: pointer;
  position: relative;
  color: #1296db;
  border: 1px solid #1296db;
}

.closeWrap {
  width: 20px;
  height: 20px;
  position: absolute;
  right: -10px;
  top: -10px;

}

.imgUnactive {
  width: 20px;
  height: 20px;
}

.imgActive {
  display: none;
  width: 20px;
  height: 20px;
}

.closeWrap:hover {
  .imgActive {
    display: block;
  }

  .imgUnactive {
    display: none;
  }
}</style>
