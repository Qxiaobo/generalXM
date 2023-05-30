
<template>
  <div>
    <!-- 需要携带以下参数 -->
    <!-- ref 用于获取组件触发API -->
    <!-- auto-upload 关闭自动上传 -->
    <!-- http-request 设置自定义上传的函数 -->
    <!-- on-change 图片列表改变时触发的函数 -->
    <!-- multiple 允许上传多个文件 -->
    <el-upload
    class="upload-demo"
      ref="upload"
      :auto-upload="individual"
      :show-file-list="showFileList"
      :action="url"
      :http-request="uploadFile"
      :headers="headers"
      :on-change="changeFileLength"
      :multiple="!individual"
      :limit="individual ? 1 : limits"
      :data="fileData"
      :name="fileName"
    >
      <!-- <i class="el-icon-upload"></i> -->
      <!-- <div class="el-upload__text">点击上传文件</div> -->
      <el-button slot="trigger" size="small" type="primary">{{
        butName
      }}</el-button>

      <el-button
        style="margin-left: 20px"
        size="small"
        @click="upload"
        v-if="!individual"
        type="primary"
        >确认上传</el-button
      >
    </el-upload>
    <!-- 上传时点击的按钮 -->
    <!-- <el-button  @click="upload" type="primary" >上传文件</el-button> -->
  </div>
</template>
    
<script>
import axios from "axios";

export default {
  name: "uploadCT",
  props: {
    // 是否单个文件上传
    individual: {
      type: Boolean,
      default: false,
    },
    // 多个文件上传限定最多可上传几个文件
    limits: {
      type: Number,
      default: 5,
    },
    // 文件上传的地址
    url: {
      type: String,
      default: "#",
    },
    // 上传文件按钮的文字
    butName: {
      type: String,
      default: "上传文件",
    },
    // // 是否自动上传
    // autoUpload: {
    //   type: Boolean,
    //   default: false,
    // },
    // 是否显示文件列表
    showFileList: {
      type: Boolean,
      default: true,
    },
    // 上传时附带的额外参数
    fileData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 上传的文件字段名
    fileName: {
      type: String,
      default: "file",
    },
    // 单个文件限制最大上传
    maxSize: {
      type: Number,
      default: 20,
    },
    // 设置上传的请求头部,一般为token
    // 格式参照
    // {
    //     Authorization: "Bearer " + token.access_token,
    //     "Content-Type": "multipart/form-data",
    //   }
    headers: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  mounted() {
    // 替换 once() 方法
  },
  data() {
    return {
      // 上传文件的列表
      uploadFiles: [],
      // 上传文件的个数
      filesLength: 0,
    };
  },

  methods: {
    // 修改当前文件列表长度
    changeFileLength(file, fileList) {
      console.log(fileList,'fileList')
      this.filesLength = fileList.length;
      console.log(this.uploadFiles,'文件列表')
    },

    // 用户点击上传调用
    async upload() {
      // if (this.uploadFiles.length == this.filesLength) {
        await this.$refs.upload.submit();
      // }
    },
    // 该函数还是会被调用多次
    // 每次param参数传入一个文件
    uploadFile(param) {
      console.log(param,'param')

      console.log(this.uploadFiles,'this.uploadFiles')
      // 将文件加入需要上传的文件列表
      this.uploadFiles.push(param.file);
      console.log(this.uploadFiles,'this.uploadFiles')
      // if (this.uploadFiles.length > 100) {
      //   this.$message({
      //     message: "上传文件个数不得超过100个",
      //     type: "error",
      //     offset: 80,
      //   });
      //   return;
      // }
      // 当uploadFiles长度等于用户需要上传的文件数时进行上传
      if (this.uploadFiles.length == this.filesLength) {
        // 创建FormData上传
        let fd = new FormData();
        // 将全部文件添加至FormData中
        let fileName = this.uploadFiles.filter(
          (item) => item.size / 1024 / 1024 > 20
        );
        // console.log(fileName, "fileName");
        if (fileName.length > 0) {
          let a = fileName.map((item) => item.name);
          this.$message({
            message: `${a.join(",")}超过${this.maxSize}MB,建议压缩后上传`,
            type: "warning",
            offset: 80,
          });
          this.uploadFiles = [];
          this.$refs.upload.clearFiles();
          return;
        }

        this.uploadFiles.forEach((file) => {
          fd.append("file", file);
        });
        if(this.fileData ){
          for (let key in this.fileData) {
            fd.append(key, this.fileData[key]);
          }
        }

        // for (var value of fd) {
        //   console.log(value, "对象");
        // }
        // 将附加信息添加至FormData
        // 配置请求头
        // let token = JSON.parse(window.sessionStorage.getItem("user"));
        // // let token = Vue.cookie.get('token');

        // const config = {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   }
        // }
        //   if (token) {
        //     config.headers['Authorization'] = "Bearer " + token.access_token // 请求头带上token
        //   }

        axios({
          method: "post",
          url: this.url,
          data: fd,
          headers: {
            // Authorization: "Bearer " + token.access_token,
            "Content-Type": "multipart/form-data",
          },
        }).then((res) => {
          this.uploadFiles = [];
          this.$refs.upload.clearFiles();
          if (res.data.code == "000000") {
            this.$message({
              message: "上传成功",
              type: "success",
              offset: 80,
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: "上传失败",
            type: "error",
            offset: 80,
          });
        });
      }
    },
  },
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped >
</style>