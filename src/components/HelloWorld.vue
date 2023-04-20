<template>
  <div>

    <!-- 需要携带以下参数 -->
    <!-- ref 用于获取组件触发API -->
    <!-- auto-upload 关闭自动上传 -->
    <!-- http-request 设置自定义上传的函数 -->
    <!-- on-change 图片列表改变时触发的函数 -->
    <!-- multiple 允许上传多个文件 -->
    <el-upload ref="upload" :auto-upload="false" :file-list="uploadFiles" :http-request="uploadFile" :on-success="success"
      :on-error="error" :on-change="changeFileLength" multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">点击上传文件</div>
    </el-upload>
    <!-- 上传时点击的按钮 -->
    <el-button @click="upload" type="primary">上传文件</el-button>
    <el-button @click="doTest" type="success"> mesg测试</el-button>
    <el-button @click="doTest1" type="success"> element</el-button>
    <el-button @click="progress" type="danger"> 开始</el-button>
    <el-button @click="jieshu" type="danger"> 结束</el-button>


    <el-progress :percentage="(fake.progress*100).toFixed(2)"></el-progress>
  <!-- <h1>{{ fake.progress }}</h1> -->
    
    <!-- <Message  text="Hello, world!" type="success" ></Message> -->
  </div>
</template>
  
<script>
import axios from 'axios'
import Vue from "vue";
// import Message from "./message/message.vue";
import Messages from "./message/index.js";
import Fakeprogress from 'fake-progress'


export default {
  name: "uploadCT",
  components: {
    // Message
  },
  data() {
    return {
      fake: new Fakeprogress({
        timeConstant: 60000,
        // autoStart:true
      }),
      // 上传文件的列表
      uploadFiles: [],
      // 上传文件的个数
      filesLength: 0,
      isShow: false,
      // 上传需要附带的信息
      info: {
        id: "",
        name: "",
      },


    }
  },
  created() {
    // 在实例中添加 $message 方法
    // this.$mes = options => {
    //   const duration = options.duration || 3000;
    //   const type = options.type || 'info';
    //   const message = options.message || '';
    //   const div = document.createElement('div');
    //   const classes = `el-message el-message-${type} el-message-enter`;
    //   div.className = classes;
    //   div.innerHTML = `<p>${message}</p>`;
    //   document.body.appendChild(div);
    //   setTimeout(() => {
    //     div.classList.remove('el-message-enter');
    //     div.classList.add('el-message-leave');
    //     setTimeout(() => {
    //       document.body.removeChild(div);
    //     }, 300);
    //   }, duration - 3005);
    // };
  },
  methods: {
    progress(){
      this.fake.start()
      // setTimeout(() => {
      //   this.fake.end()
      // }, 5000);
    },
    jieshu(){
      this.fake.end()
    },
    doTest() {
      // this.isShow = true
      console.log(Messages, 'Messages')
      Messages.error('测试',222000)

    },
    doTest1() {
      // this.isShow = true
      console.log(Messages, 'Messages')
      this.$message({
          message: '警告哦，这是一条警告消息',
          type: 'warning',
          duration:0
        });


    },
    // 修改当前文件列表长度
    changeFileLength(file, fileList) {
      this.filesLength = fileList.length
    },
    success() {
      alert('成功')
      this.$refs.upload.clearFiles();
    },
    error() {
      alert('失败')
      this.$refs.upload.clearFiles();
    },
    // 用户点击上传调用
    upload() {
      // 触发上传 调用配置 :http-request="uploadFile"
      // 即触发 uploadFile函数
      Vue.prototype.$message.success('测试')
      this.$refs.upload.submit();
      setTimeout(() => {

        this.uploadFiles = []
      })

      // 上传完成后执行的操作 ...
    },

    // 该函数还是会被调用多次
    // 每次param参数传入一个文件
    uploadFile(param) {
      // 将文件加入需要上传的文件列表
      this.uploadFiles.push(param.file)
      // 当uploadFiles长度等于用户需要上传的文件数时进行上传
      if (this.uploadFiles.length == this.filesLength) {
        // 创建FormData上传
        let fd = new FormData()
        // 将全部文件添加至FormData中
        this.uploadFiles.forEach(file => {
          console.log(file, 'file')
          fd.append('file', file)
          //   fd.append("id", file.uid)
          // fd.append("name", this.name)

        })
        fd.append('applyId', '1231231231')
        //   fd.append('file', file.uid)
        for (var value of fd) {
          console.log(value, '对象');
        }
        // 将附加信息添加至FormData
        // fd.append("id", this.info.id)
        // fd.append("name", this.info.name)
        // 配置请求头
        // let token = JSON.parse(window.sessionStorage.getItem('user'))
        // // let token = Vue.cookie.get('token');

        // const config = {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   }
        // }
        // if (token) {
        //   config.headers['Authorization'] = "Bearer " + token.access_token // 请求头带上token
        // }
        axios({
          method: 'post',
          // url: 'http://192.168.100.191/gateway/subsidy/upload/applyFile',
          url: 'http://192.168.99.110:8064/upload/applyFile',
          data: fd,
          headers: {
            // 'Authorization':"Bearer " + token.access_token,
            "Content-Type": "multipart/form-data",
            // "Accept": "multipart/form-data",
          }
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)

        })
        // let url = 'http://192.168.99.113:8064/upload/applyFile'
        // let headers = {
        //       // 'Authorization':"Bearer " + token.access_token,
        //       "Content-Type": "multipart/form-data;",
        //       // "Accept": "multipart/form-data",
        //   }
        // let params = {files:fd}
        // // console.log(files,'files')
        // axios.post(
        //   // method: 'post',
        //   // url: 'http://192.168.100.191/gateway/subsidy/upload/applyFile',
        //   url,
        //   params,
        //   headers
        // ).then(res => {
        //   console.log(res)
        // })
        // 上传文件
        // axios.post("http://192.168.100.191/gateway/subsidy/upload/applyFile", fd, config).then(res => {
        //     console.log(res)
        //     /*上传成功处理*/
        // }).catch(err => {/*报错处理*/ });
      }
    }
  }
}
</script>
<style lang="scss"  >
.xtx-message {
  width: 300px;
  height: 50px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  margin-left: -150px;
  top: 25px;
  line-height: 50px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;

  i {
    margin-right: 4px;
    vertical-align: middle;
  }

  .text {
    vertical-align: middle;
  }
}

.down {
  &-enter {
    &-from {
      transform: translate3d(0, -75px, 0);
      opacity: 0;
    }

    &-active {
      transition: all 0.5s;
    }

    &-to {
      transform: none;
      opacity: 1;
    }
  }
}
</style>
  