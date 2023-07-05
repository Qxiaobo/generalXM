<template>
  <div>
    <el-card class="box-card">
      <div class="titleHead">自定义指令的演示</div>
      <el-divider></el-divider>
      <!-- 节流指令演示 -->
      <div class="itemDemo">
        <el-button
          type="primary"
          v-waves
          v-throttle="[doThrottle, 1000, 'click', '这个是传递的参数']"
          >节流指令演示</el-button
        >
        <el-divider content-position="left">
          v-throttle="[函数名(例如：doThrottle),1000, 'click',
          '这个是传递的参数']" >>>
          前面三个参数固定，函数要传递的参数从第四个开始都是</el-divider
        >
      </div>
      <!-- 复制指令演示 -->
      <div class="itemDemo">
        <el-button
          type="primary"
          style="display: inline-block"
          v-copyDirective="copyText"
          >复制指令演示</el-button
        >
        <el-input
          style="display: inline-block; width: 40%"
          v-model="copyInput"
          placeholder="复制之后可以粘贴在此处进行验证"
        ></el-input>
        <el-divider content-position="left">
          v-copyDirective="copyText" >>>copyText指要复制的文本</el-divider
        >
      </div>
            <!-- 水印指令演示 -->
        <div class="itemDemo">
        <el-button
          type="primary"
          style="display: inline-block"
          >水印指令演示</el-button
        >
        <div v-waterMarker="{text:'lab版权所有',font:'12px',textColor:'rgba(180, 180, 180, 0.4)'}" style="width: 600px;height: 300px;"></div>
        <el-divider content-position="left">
          v-waterMarker="{text:'lab版权所有',textColor:'rgba(180, 180, 180, 0.4)'}"  >>>text:水印文本内容；font:'水印文字大小' textColor:'水印文本颜色'</el-divider
        >
        <el-button  type="primary"  v-waves class="item">波纹按钮自定义指令</el-button>
        <el-button type="primary" v-waves="'pink'" class="item">波纹按钮可传颜色自定义指令</el-button>
        <el-divider content-position="left">
          v-waves="'pink'"  >>>pink为颜色 </el-divider
        >
        <div>
    <h3>上边的是使用vue-lazyload插件</h3>
    <h3>下边的是使用自定义指令</h3>
    <br />
    <div class="imgWrap">
      <div class="imgBox" v-for="(img,index) in list"  :key="index">
        <img v-lazy="img.src" />
      </div>
    </div>
    <h3>分隔线</h3>
    <h3>分隔线</h3>
    <h3>分隔线</h3>
    <h1>白日依山尽</h1>
    <h1>黄河入海流</h1>
    <h1>欲穷千里目</h1>
    <h1>更上一层楼</h1>
    <h1>白日依山尽</h1>
    <h1>黄河入海流</h1>
    <h1>欲穷千里目</h1>
    <h1>更上一层楼</h1>
    <h1>白日依山尽</h1>
    <h1>黄河入海流</h1>
    <h1>欲穷千里目</h1>
    <h1>更上一层楼</h1>
    <h1>白日依山尽</h1>
    <h1>黄河入海流</h1>
    <h1>欲穷千里目</h1>
    <h1>更上一层楼</h1>
    <img class='imgLazy' v-lazyload="'http://ashuai.work:10000/imgSrc/doupo.png'" />
    <img class='imgLazy' v-lazyload="'http://ashuai.work:10000/imgSrc/douluo.png'" />
    <img class='imgLazy' v-lazyload="'http://ashuai.work:10000/imgSrc/tunshi.png'" />
  </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "LabProjectIndex",

  data() {
    return {
      copyText: "这个是复制的结果",
      copyInput: "",
      LazyLoad:require('@/assets/images/login_bg.jpg'),
      list: [
        {
          src: "http://ashuai.work:10000/imgSrc/html.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/css.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/js.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/nodejs.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/webpack.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/vue.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/react.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/angular.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/ie.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/chrome.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/firefox.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/safari.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/edge.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/http.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/uniapp.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/wx.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/leetcode.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/java.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/spring.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/mybatis.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/redis.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/mysql.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/oracle.png",
        },
        {
          src: "占位",
        },
      ],
    };
  },

  mounted() {},

  methods: {
    doThrottle(e) {
      this.$message.success("节流成功");
    },
  },
};
</script>

<style lang="scss" scoped>
.titleHead {
  color: rgba(64, 158, 255);
  font-size: 32px;
  font-weight: 700;
}
.itemDemo {
  padding: 10px;
}
.item {
  font-size: 14px;
  // width: 140px;
  padding: 0 8px;
  height: 40px;
  line-height:40px;
  border-radius: 6px;
  text-align: center;
  border: 1px solid #aaa;
  margin-bottom: 18px;
  cursor: pointer;
}


// 图片懒加载
.imgWrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  box-sizing: border-box;
  .imgBox {
    box-sizing: border-box;
    margin-bottom: 24px;
    padding: 8px;
    border: 2px solid pink;
    img {
      width: 480px;
      display: inline-block;
      // height: 320px;
      transition: all 1.8s;
    }
    // 加上一个透明度过渡动画
    img[lazy="loaded"] {
      animation: fade 1.8s;
    }
  }
  // 障眼法...
  .imgBox:last-child {
    height: 0;
    opacity: 0;
    visibility: hidden;
    border: none;
    box-sizing: border-box;
    img {
      height: 0;
      width: 280px;
    }
  }
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.imgLazy {
  width: 240px;
  margin-bottom: 12px;
}
</style>