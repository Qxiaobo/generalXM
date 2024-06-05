<template>
  <div style="text-align: center; margin-top: 20px; height: 790px;">
    <!-- <p>二维码</p>  -->
    <button @click="doclick" class="custom-btn btn-3"  style="margin-bottom: 20px;" >
      <span>二维码</span>
    </button>
    <div>
      <el-input
        @blur="doBlur"
        v-model="QRlink"
        style="width: 300px"
        placeholder="输入二维码内容"
      ></el-input>
      <button @click="doWrite" class="custom-btn btn-3">
        <span>写入</span>
      </button>
    </div>
    <div
      style="
        background: skyblue;
        width: 220px;
        height: 220px;
        margin: 30px auto;
      "
    >
      <img
        :src="QRImgUrl"
        style="width: 200px; hight: 200px; transform: translateY(10px)"
      />
    </div>
    <div class="confirm" v-if="dialog">
      <img
        :src="QRImgUrl1"
        style="width: 200px; hight: 200px; transform: translateY(10px)"
      />
      <h1>罗贯中</h1>
      <p style="margin-bottom: 10px">大梦谁先觉？</p>
      <p style="margin-bottom: 10px">平生我自知。</p>
      <p style="margin-bottom: 10px">草堂春睡足，</p>
      <p>窗外日迟迟。</p>

      <button @click="Cancel">取消</button>
      <button autofocus @click="Confirm">确定</button>
    </div>
  </div>
</template>
  
  <script>
// import QRCode from "qrcode";
export default {
  data() {
    return {
      dialog: false,
      QRImgUrl: "",
      QRImgUrl1: "",
      QRlink: "https://juejin.cn/user/4297327038961560/posts",
    };
  },
  created() {
    this.getQRcode();
  },
  //     watch: {
  //     "QRlink": function(val) {
  //       this.getQRcode();
  //     },
  //     immediate: true
  //   },
  methods: {
    doWrite() {
      this.getQRcode();
    },
    doBlur(e) {
      this.getQRcode();
    },
    Confirm() {
      this.dialog = false;
    },
    Cancel() {
      this.dialog = false;
    },
    doclick() {
      this.dialog = true;
    },
    getQRcode() {
      let opts = {
        errorCorrectionLevel: "L", //容错级别
        type: "image/png", //生成的二维码类型
        quality: 0.3, //二维码质量
        margin: 5, //二维码留白边距
        width: 128, //宽
        height: 128, //高
        text: "http://www.baidu.com", //二维码内容
        color: {
          dark: "#666666", //前景色
          light: "#fff", //背景色
        },
      };
      //this.QRlink 生成的二维码地址url
      QRCode.toDataURL(this.QRlink, opts, (err, url) => {
        if (err) throw err;
        //将生成的二维码路径复制给data的QRImgUrl
        console.log(url);
        this.QRImgUrl = url;
      });
    },
  },
};
</script>
  
  <style>
.custom-btn {
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
}
.btn-3 {
  background: rgb(0, 172, 238);
  background: linear-gradient(
    0deg,
    rgba(0, 172, 238, 1) 0%,
    rgba(2, 126, 251, 1) 100%
  );
  width: 130px;
  height: 40px;
  line-height: 42px;
  padding: 0;
  border: none;
}
.btn-3 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.btn-3:before,
.btn-3:after {
  position: absolute;
  content: "";
  right: 0;
  top: 0;
  background: rgba(2, 126, 251, 1);
  transition: all 0.3s ease;
}
.btn-3:before {
  height: 0%;
  width: 2px;
}
.btn-3:after {
  width: 0%;
  height: 2px;
}
.btn-3:hover {
  background: transparent;
  box-shadow: none;
}
.btn-3:hover:before {
  height: 100%;
}
.btn-3:hover:after {
  width: 100%;
}
.btn-3 span:hover {
  color: rgba(2, 126, 251, 1);
}
.btn-3 span:before,
.btn-3 span:after {
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
  background: rgba(2, 126, 251, 1);
  transition: all 0.3s ease;
}
.btn-3 span:before {
  width: 2px;
  height: 0%;
}
.btn-3 span:after {
  width: 0%;
  height: 2px;
}
.btn-3 span:hover:before {
  height: 100%;
}
.btn-3 span:hover:after {
  width: 100%;
}

/* 弹窗 */

*,
*:after,
*:before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  /* background: #467fae; */
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
    "Helvetica", "Arial", "Lucida Grande", sans-serif;
}
@keyframes fade {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
.confirm {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  min-width: 280px;
  max-width: 500px;
  height: auto;
  background: #e2e2e2;
  border-radius: 10px;
  padding: 0;
  margin: 0;
  border-top: 1px solid white;
  animation: fade 0.5s ease 1 forwards;
}
.confirm h1 {
  text-align: center;
  font-size: 1.2rem;
  margin: 1.5rem 1rem 0.5rem;
}
.confirm p {
  text-align: center;
  font-size: 1rem;
  margin: 0 2rem 4.5rem;
}
.confirm button {
  background: transparent;
  border: none;
  color: #1678e5;
  height: 3rem;
  font-size: 1rem;
  width: 50%;
  position: absolute;
  bottom: 0;
  cursor: pointer;
}
.confirm button:nth-of-type(1) {
  border-top: 1px solid #b4b4b4;
  border-right: 1px solid #b4b4b4;
  left: 0;
  border-radius: 0 0 0 10px;
}
.confirm button:nth-of-type(2) {
  border-top: 1px solid #b4b4b4;
  right: 0;
  border-radius: 0 0 10px 0;
}
.confirm button:focus,
.confirm button:hover {
  font-weight: bold;
  background: #efefef;
}
.confirm button:active {
  background: #d6d6d6;
}
</style>
  