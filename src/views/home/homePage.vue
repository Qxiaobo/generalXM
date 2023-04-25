<template>
  <div>
    <div class="headerTop">
      M78星云管理系统
    </div>
<!-- <div class="glass-container" id="glass">

</div> -->

    <el-container style="position: relative;">
      <el-header height="100px" style="overflow-y: hidden;">
          <vue-particles class="par-box"  color="#fff" :particleOpacity="0.7" :particlesNumber="300" shapeType="circle"
            :particleSize="2" linesColor="#fff" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="50"
            :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
          </vue-particles>
      </el-header>
      <el-container >
        <el-aside style="width: 400px;" >
          <el-menu :default-active="$route.path" background-color="#fff" active-text-color="#1890ff"
            class="el-menu-vertical-demo" text-color="#000" router>
            <el-submenu :index="'/' + item.name" v-for="(item, index) in routerList" :key="index">
              <template slot="title">
                <span slot="title" class="menu-title">{{ item.title }}</span>
              </template>
              <el-menu-item :index="'/' + j.path" @click="toEveryRouter(j)" :title="j.title"
                v-for="(j, i) in item.children" :key="i" class="everyRouter">{{ j.title }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-main >
          <div class="navWrap"  >
            <template v-for="(i, j) in navList">
              <div :key="j" :class="currentNav == i.path ? 'currentNav' : 'everyNav'" @click="clickNav(i.path)">
                {{ i.title }}
                <div class="closeWrap" v-if="i.path != 'home'">
                  <i class="iconfont icon-guanbi imgActive" @click.stop="closeNav(j)"></i>
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
    console.log(routerList, '路由')
  },
  computed: {
    ...mapState({
      currentNav: (state) => state.currentNav,
      navList: (state) => state.navList,
    }),
  },
  methods: {
    ...mapMutations(["navListChange", "navListChangeClose", "clickEveryNav"]),
    closeNav(index) {
      // console.log(index,'面包屑索引');
      this.navListChangeClose(index)
      this.$router.push("/" + this.currentNav)
    },
    toEveryRouter(item) {
      // console.log(item,'菜单');
      this.navListChange(item)
    },
    clickNav(path) {
      // console.log(path,"面包屑路径");
      this.clickEveryNav(path)
      this.$router.push("/" + this.currentNav)
    }
  },
}
</script>
<style lang="scss" scoped>

// .glass-container{
//   position: absolute;
//   top: -10px;
//   left: 0;
//     width: 100%;
//     height: 100px;
//     color: white;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 20px;
//     border-radius: 10px;
//     backdrop-filter: blur(5px);
//     background-color: rgba(0,191,255, 0.075);
//     box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
//     border: 2px rgba(255,255,255,0.4) solid;
//     border-bottom: 2px rgba(40,40,40,0.35) solid;
//     border-right: 2px rgba(40,40,40,0.35) solid;
// }
.par-box{
  z-index: -1;
}
.el-header {
  // background-color: purple;
  color: #333;
  line-height: 100px;
  font-size: 26px;
}

  .headerTop{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: rgb(126,119,246);
    // background: linear-gradient(256deg, rgba(126,119,246,1) 0%, rgba(188,86,223,1) 35%, rgba(0,212,255,1) 100%);
    font-family: chuanqi;
    font-size: 68px;
    line-height: 100px;
    padding-left: 40px;
    // 渐变颜色字体
    color: #fff;
    text-shadow: 1px 1px 1px #000;
  }
  .headerTop::after{
    display: inline-block;
    content: '';
    // position: absolute;
    // top: 100%;
    // left: 0;
    width: 160px;
    height: 60px;
    // background: #000;
    background-image: url('https://3o.hk/images/2023/04/24/c3115fc4-4b6f-47b6-a001-4922cd00f373.png') !important;
    background-size: 100% 100%;
  }


.el-aside {
  background-color: #D3DCE6;
  // height: 100vh;
  // height: calc(100vh - 116px);
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
  text-align: center;
  line-height: 20px;
  position: absolute;
  right: -10px;
  top: -10px;

}

.imgActive {
  font-size: 20px;
}

.closeWrap:hover {
  .imgActive {
    display: block;
  }

  .imgUnactive {
    display: none;
  }
}
</style>
