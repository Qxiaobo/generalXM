<template>
  <div>
    <el-card class="box-card">
      <div class="titleHead">自定义指令的演示</div>
      <el-divider></el-divider>
      <!-- 节流指令演示 -->
      <div class="itemDemo">
        <el-button type="primary" v-waves v-throttle="[doThrottle, 1000, 'click', '这个是传递的参数']">节流指令演示</el-button>
        <el-divider content-position="left">
          v-throttle="[函数名(例如：doThrottle),1000, 'click',
          '这个是传递的参数']" >>>
          前面三个参数固定，函数要传递的参数从第四个开始都是</el-divider>
      </div>
      <!-- 防抖指令演示 -->
      <div class="itemDemo">
        <el-button type="primary" v-waves v-debounce="{ fn: debounce, event: 'click', time: 500 ,args:['这个是传递的第一个参数','第二个']}">防抖指令演示</el-button>
        <el-divider content-position="left">
          v-debounce="{ fn: debounce, event: 'click', time: 500 ,args:['这个是传递的第一个参数','第二个']} >>>
          debounce:函数名, event:事件类型,time,防抖时间,args:['传递的参数']</el-divider>
      </div>
      <!-- 复制指令演示 -->
      <div class="itemDemo">
        <el-button type="primary" style="display: inline-block" v-copyDirective="copyText">复制指令演示</el-button>
        <el-input style="display: inline-block; width: 40%" v-model="copyInput" placeholder="复制之后可以粘贴在此处进行验证"></el-input>
        <el-divider content-position="left">
          v-copyDirective="copyText" >>>copyText指要复制的文本</el-divider>
      </div>

            <!-- 热键指令演示 -->
            <div class="itemDemo">
        <el-button type="primary" v-hotkey="{
      'space': space
      }" style="display: inline-block" >敲击键盘space</el-button>
       
        <el-divider content-position="left">
          v-hotkey="{'space': space}"" >>>{'space': space} 键名：按键名，值：胡会触发的函数   </el-divider>
      </div>
        <!-- 热键指令演示 -->
        <!-- <div class="itemDemo">
        <el-input v-validate-input="'text'" v-model="inputValue"  placeholder=""></el-input>
       
        <el-divider content-position="left">
          v-validate-input="'number'" >>>可选参数，number为限制只能输入数字，text限制只能输入文字 </el-divider>
      </div> -->


      <!-- ellipsis指令演示 -->
      <div v-ellipsis="3" style="width: 300px">
        文本超出测试文本超出测试文本超出测试文本超出测试文本超出测试文本超出测试文本超出测试文本超出测试文本超出测试文本超出测试文本超出测试文本超出测试文本超出测试文本超出测试文本超出测试文本超出测试文本超出测试文本超出测试
      </div>
      <el-divider content-position="left">
        v-ellipsis="3" >>>3指的是3行之后再进行隐藏 </el-divider>



      <!-- 水印指令演示 -->
      <div class="itemDemo">
        <el-button type="primary" style="display: inline-block">水印指令演示</el-button>
        <div v-waterMarker="{ text: 'lab版权所有', font: '12px', textColor: 'rgba(180, 180, 180, 0.4)' }"
          style="width: 600px;height: 300px;"></div>
        <el-divider content-position="left">
          v-waterMarker="{text:'lab版权所有',textColor:'rgba(180, 180, 180, 0.4)'}" >>>text:水印文本内容；font:'水印文字大小'
          textColor:'水印文本颜色'</el-divider>
        <el-button type="primary" v-waves class="item">波纹按钮自定义指令</el-button>
        <el-button type="primary" v-waves="'pink'" class="item">波纹按钮可传颜色自定义指令</el-button>
        <el-divider content-position="left">
          v-waves="'pink'" >>>pink为颜色 </el-divider>
        <div>
          <h3>上边的是使用vue-lazyload插件</h3>
          <h3>下边的是使用自定义指令</h3>
          <br />
          <div class="imgWrap">
            <div class="imgBox" v-for="(img, index) in list" :key="index">
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
          <img class='imgLazy'
            v-lazyload="'https://th.bing.com/th/id/R.7be36dcd069015484226035c9d652d26?rik=AfJdxg4v%2bNHBZg&riu=http%3a%2f%2fimage.biaobaiju.com%2fuploads%2f20180802%2f00%2f1533140556-PQtuVqgYrk.jpg&ehk=4sSJmhwLOvsAOcjXiQayocDD1chCPGZYvvJZmqlWKko%3d&risl=&pid=ImgRaw&r=0'" />
          <img class='imgLazy' v-lazyload="'https://pic.qqtn.com/up/2017-9/2017091814264612264.jpg'" />
          <img class='imgLazy' v-lazyload="'https://th.bing.com/th/id/OIP.OixcxS8Zgcwp7MiAXZmzCAHaFj?pid=ImgDet&rs=1'" />
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
      LazyLoad: require('@/assets/images/login_bg.jpg'),
      inputValue: "",
      inputConfig: {
        allowNumbers: true, // 是否允许输入数字
        allowText: false,    // 是否允许输入文字
      },
      list: [
        {
          src: "https://pic4.zhimg.com/80/v2-b321552574cb31f963fdb1c4f804243f_1440w.webp",
        },
        {
          src: "https://pic1.zhimg.com/80/v2-bf1fd38a5cb3246ef19c1cf8093d7ee8_1440w.webp",
        },
        {
          src: "https://pic3.zhimg.com/80/v2-b84773f44ed64bc81ec4da391eb6a82a_1440w.webp",
        },
        {
          src: "https://pic2.zhimg.com/80/v2-7f1073689bf0655ab32e89e59227604d_1440w.webp",
        },
        {
          src: "https://img2.woyaogexing.com/2022/04/04/973c1dc3756447b4b03d4e0810201011!400x400.jpeg",
        },
        {
          src: "https://img2.woyaogexing.com/2022/04/04/0bd6ff5a786c4afa98cfc005dbb28049!400x400.jpeg",
        },
        {
          src: "https://img2.woyaogexing.com/2022/04/04/8851107fd43f4f78becbd68dc02a9fe3!400x400.jpeg",
        },
        {
          src: "https://img2.woyaogexing.com/2022/04/04/ab65819e60584cd9b96c56d58d7a5c14!400x400.jpeg",
        },
        {
          src: "https://img2.woyaogexing.com/2022/04/04/ab65819e60584cd9b96c56d58d7a5c14!400x400.jpeg",
        },
        {
          src: "https://img2.woyaogexing.com/2022/04/04/8851107fd43f4f78becbd68dc02a9fe3!400x400.jpeg",
        },
        {
          src: "https://pic3.zhimg.com/80/v2-b84773f44ed64bc81ec4da391eb6a82a_1440w.webp",
        },
        {
          src: "https://pic2.zhimg.com/80/v2-7f1073689bf0655ab32e89e59227604d_1440w.webp",
        },
        {
          src: "https://img2.woyaogexing.com/2022/04/04/973c1dc3756447b4b03d4e0810201011!400x400.jpeg",
        },
        {
          src: "https://pic3.zhimg.com/80/v2-b84773f44ed64bc81ec4da391eb6a82a_1440w.webp",
        },
        {
          src: "https://pic2.zhimg.com/80/v2-7f1073689bf0655ab32e89e59227604d_1440w.webp",
        },
        {
          src: "https://img2.woyaogexing.com/2022/04/04/973c1dc3756447b4b03d4e0810201011!400x400.jpeg",
        },
        {
          src: "https://pic4.zhimg.com/80/v2-b321552574cb31f963fdb1c4f804243f_1440w.webp",
        },
        {
          src: "https://pic1.zhimg.com/80/v2-bf1fd38a5cb3246ef19c1cf8093d7ee8_1440w.webp",
        },
        {
          src: "https://pic3.zhimg.com/80/v2-b84773f44ed64bc81ec4da391eb6a82a_1440w.webp",
        },
        {
          src: "https://img2.baidu.com/it/u=4094265719,4205469683&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
        },
        {
          src: "https://p1.itc.cn/images01/20210621/58aad194d3f34d87ac4b424037111d62.jpeg",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Ff5f976ad-3252-4664-9a58-9964afc9c83e%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1692237466&t=9096e30022f94110d29801fc68191008",
        },
        {
          src: "https://img2.baidu.com/it/u=4094265719,4205469683&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
        },
        {
          src: "占位",
        },
      ],
    };
  },

  mounted() { },

  methods: {
    doThrottle(e) {
      this.$message.success(e);
    },
    debounce(e,i) {
      this.$message.success(e+i);
    },
    space(){
      this.$message.success('已经敲击键盘space')
    }
  },
};
</script>

<style lang="scss" scoped>

.itemDemo {
  padding: 10px;
}

.item {
  font-size: 14px;
  // width: 140px;
  padding: 0 8px;
  height: 40px;
  line-height: 40px;
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