<template>
  <div id="particle-container" style="height: 750px">
    <!-- <vue-particles
            class="par-box"
            color="#409EFF"
            :particleOpacity="0.7"
            :particlesNumber="80"
            shapeType="circle"
            :particleSize="4"
            linesColor="#409EFF"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
    ></vue-particles> -->
    <!-- 登录页面的整体盒子 -->
    <div class="login-container">
      <!-- 登录的盒子 -->
      <div class="login-box">
        <!-- 标题的盒子 -->
        <div class="title-box">SanTianDaYu—LiangTianShaiWang</div>

        <!-- 登录的表单区域 -->
        <el-form
          class="title-form"
          :model="loginForm"
          :rules="loginRules"
          ref="loginRef"
        >
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              maxlength="10"
              minlength="1"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              maxlength="15"
              minlength="6"
            ></el-input>
          </el-form-item>
          <el-form-item prop="verifyCode">
            <el-input
              style="width: 60%;float: left;"
              v-model="loginForm.verifyCode"
              type="password"
              placeholder="请输入验证码"
              maxlength="15"
              minlength="6"
            ></el-input>
            <!-- <span class="verifyCodeSpan" > -->
              <canvas  style="display: inline-block; width: 38%; background:#fff;height: 60px; margin-left: 2%;" id="canvas" @click="handleCanvas"></canvas>
            <!-- </span> -->
            
          </el-form-item>
          <el-form-item>
            <button class="btn-login" @click="login">登录</button>
            <!-- <div class="loginBtn"   @click="login">
      <input type="text" placeholder="登录">
      <span class="bottom"></span>
      <span class="right"></span>
      <span class="top"></span>
      <span class="left"></span>
    </div> -->
            <el-link type="info" @click="$router.push('/reg')">去注册</el-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
    <script>
// import { doLogin } from '@/api/myPart'
export default {
  name: "Login",
  mounted() {
    this.handleCanvas();
  },
  data() {
    let yzm = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      // 登录表单的数据对象
      loginForm: {
        username: "",
        password: "",
        verifyCode: "",
      },
      show_num: "",
      yanzheng_arr: [],
      // 登录表单的验证规则对象
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            pattern: /^[a-zA-Z][a-zA-Z0-9]{0,9}$/,
            message: "用户名必须是1-10的字母数字,数字不能开头",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^\S{6,15}$/,
            message: "密码必须是6-15的非空字符",
            trigger: "blur",
          },
        ],
        verifyCode: [{ validator: yzm, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 实现登陆
    async login(event) {
      // 阻止默认事件, 提交表单
      event.preventDefault();
      // 1. 绑定事件函数
      // 2. 表单校验
      this.$refs.loginRef.validate(async (valid) => {
        if (!valid) return; // 校验失败
        // 3.1 校验通过，发送请求
        // console.log('ok')
        // const res  = await doLogin(this.loginForm)
        // console.log(res)
        // 3.2 校验失败，提示用户
        // if (res.code != 200) return this.$message.error(res.message)
        // 3.3 校验成功，提示用户
        // this.$message.success(res.message)
        // console.log(res)
        // 4. 保存token res.token    保存vuex中
        // this.$store.commit('函数名',res.token)
        // this.$store.commit('user/updateToken', res.token)
        // 4.1 存到本地存储
        // localStorage.setItem('token', res.token)
        // 5. 跳转到首页
        // this.$router.push('/')

        //  await  this.$store.dispatch('user/userLogin', this.loginForm)
        // this.$router.push('/')
        if (this.show_num.join('') == this.loginForm.verifyCode.toLowerCase()) {
            // let params = {
            //   userName: this.ruleForm.userName,
            //   passWord: this.ruleForm.password
            // }
            // getToken(params).then(res => {
            //   if (res.code == '000000') {
            //     let token = res.data.accessToken
            //     // this.$cookie.set("token", token);
            //     localStorage.setItem("token", token);
            //     this.$router.push("/Catalogue").catch(() => { })
            //   }
            // })
          } else {
            this.$message.error('验证码错误')
          }
      });
    },
    handleCanvas() {
      this.draw(this.yanzheng_arr);
    },
    draw(show_num) {
      var canvas_width = document.querySelector("#canvas").clientWidth;
      var canvas_height = document.querySelector("#canvas").clientHeight;
      var canvas = document.getElementById("canvas"); //获取到canvas
      var context = canvas.getContext("2d"); //获取到canvas画图
      canvas.width = canvas_width;
      canvas.height = canvas_height;
      var sCode = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
      var aCode = sCode.split(",");
      var aLength = aCode.length; //获取到数组的长度
      //4个验证码数
      for (var i = 0; i <= 3; i++) {
        var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
        var deg = (Math.random() * 20 * Math.PI) / 180; //产生0~30之间的随机弧度
        var txt = aCode[j]; //得到随机的一个内容
        show_num[i] = txt.toLowerCase();// 依次把取得的内容放到数组里面
        this.show_num = show_num;
        // console.log(this.show_num,'this.show_num')
        var x = 10 + i * 15; //文字在canvas上的x坐标
        var y = 30 + Math.random() * 8; //文字在canvas上的y坐标
        context.font = "bold 52px 微软雅黑";
        context.translate(x, y);
        context.rotate(deg);
        context.fillStyle = this.randomColor();
        context.fillText(txt, 0, 10);

        context.rotate(-deg);
        context.translate(-5, -y);
      }
      //验证码上显示6条线条
      for (var i = 0; i <= 5; i++) {
        context.strokeStyle = this.randomColor();
        context.beginPath();
        context.moveTo(
          Math.random() * canvas_width,
          Math.random() * canvas_height
        );
        context.lineTo(
          Math.random() * canvas_width,
          Math.random() * canvas_height
        );
        context.stroke();
      }
      //验证码上显示31个小点
      for (var i = 0; i <= 30; i++) {
        context.strokeStyle = this.randomColor();
        context.beginPath();
        var x = Math.random() * canvas_width;
        var y = Math.random() * canvas_height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
      }

      //最后把取得的验证码数组存起来，方式不唯一
      var num = show_num.join("");
      this.true_code = num
    },
    randomColor() {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
  },
};
</script>
    
    <style lang="less" scoped>
    .verifyCodeSpan{
      display: inline-block;
      width:40%;
      background:#fff;
      height: 100%;
    }
button:hover {
  background: purple;
}
button {
  min-height: 53px;
  margin: 0;
  // margin-top: 20px;
  min-width: 166px;
  border-radius: 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  position: relative;
  cursor: pointer;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(-12.74%, rgba(110, 239, 255, 0.5)),
    color-stop(56.76%, rgba(106, 224, 255, 0.271))
  );
  background: linear-gradient(
    90deg,
    rgba(110, 239, 255, 0.5) -12.74%,
    rgba(106, 224, 255, 0.271) 56.76%
  );
  border: 2px solid #acf7ff;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
}

button:before {
  content: "";
  width: 4px;
  height: 28px;
  background: #409eff;
  border: 2px solid #acf7ff;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
  position: absolute;
  border-top: 0;
  border-left: 0;
  border-bottom: 0;
  bottom: -7px;
  left: 4px;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}

button:after {
  content: "";
  position: absolute;
  left: -2px;
  bottom: -2px;
  border-top: 15px solid transparent;
  border-left: 15px solid #fffcf7;
}

::v-deep .el-input__inner {
  height: 60px;
  line-height: 60px;
}
.loginBtn {
  margin-top: 10px;
  position: relative;
  width: 100%;
  font-size: 24px;
  input {
    cursor: pointer;
    text-align: center;
    width: 100%;
    color: #fff;
    font-size: inherit;
    font-family: inherit;
    background-color: purple;
    padding: 0.35em 0.45em;
    border: 1px solid transparent;
    transition: background-color 0.3s ease-in-out;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    color: #fff;
    font-size: 30px;

    font-weight: 700;
    text-shadow: 1px 1px 2px black;
  }

  span {
    position: absolute;
    background-color: #fc2f70;
    transition: transform 0.1s ease;
  }

  .bottom,
  .top {
    height: 1px;
    left: 0;
    right: 0;
    transform: scaleX(0);
  }

  .left,
  .right {
    width: 1px;
    top: 0;
    bottom: 0;
    transform: scaleY(0);
  }

  .bottom {
    bottom: 0;
    transform-origin: bottom right;
  }

  input:focus ~ .bottom {
    transform-origin: bottom left;
    transform: scaleX(1);
  }

  .right {
    right: 0;
    transform-origin: top right;
    transition-delay: 0.05s;
  }

  input:focus ~ .right {
    transform-origin: bottom right;
    transform: scaleY(1);
  }

  .top {
    top: 0;
    transform-origin: top left;
    transition-delay: 0.15s;
  }

  input:focus ~ .top {
    transform-origin: top right;
    transform: scaleX(1);
  }

  .left {
    left: 0;
    transform-origin: bottom left;
    transition-delay: 0.25s;
  }

  input:focus ~ .left {
    transform-origin: top left;
    transform: scaleY(1);
  }
}

.login-container {
  width: 100%;
  background: url("@/assets/images/login_bg.jpg") center;
  background-size: cover;
  height: 100%;

  .login-box {
    width: 500px;
    height: 470px;
    background-color: rgba(255, 255, 2555, 0.2);
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;

    .title-box {
      height: 120px;
      line-height: 120px;
      font-family: "Times New Roman", Times, serif;
      font-size: 28px;
      color: #fff;
      text-align: center;
    }
    .title-form {
      // margin-top: 10px;
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>
    