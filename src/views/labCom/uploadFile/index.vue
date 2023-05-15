
<template>
    <div>
      <el-card class="box-card">
        <div class="titleHead">文件上传</div>
      <el-divider></el-divider>
        <FileUpload :individual="true" :url="'http://192.168.0.110:8080/add/file'" :fileData="fileData"  ></FileUpload>
      <el-divider></el-divider>

        <FileUploadS :url="'http://192.168.0.110:8080/add/file'"  :fileData="fileData"  ></FileUploadS>
      </el-card>
    </div>
  </template>
  
  <script>
  import FileUploadS from "@/components/fileUpload/indexNum.vue";
  export default {
    name: "LabProjectIndex",
    components: {
      FileUploadS,
    },

    data() {
      return {
        fileData: {
          name: "file",
          info: "上传文件测试",
      }
    }
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
  </style>