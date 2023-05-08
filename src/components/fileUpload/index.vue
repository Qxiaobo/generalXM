<template>
  <div>
    <el-upload
      ref="upload"
      action="#"
      class="upload-demo"
      :on-change="onChange"
      :before-upload="beforeUpload"
      multiple
      :limit="5"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :http-request="uploadFile"
      :auto-upload="false"
    >
      <el-button size="mini" class="uploadBtn">选择文件</el-button>
      <el-button style="margin-left: 20px;" size="small" @click="onSubmit" 
        type="primary">确认上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import {getFromApi01} from "@/api/labApi/fromApi";
export default {
  name: "LabProjectIndex",

  data() {
    return {
      formDate:new FormData(), //载体
      fileList: [], //展示的文件列表
    };
  },

  mounted() {},

  methods: {
    handleExceed(){

    },
    onChange(){

    },
    beforeUpload(){

    },
    // onSubmit() {
    //   this.formDate = new FormData(); //初始化定义
    //   this.$refs.upload.submit();
    // },
    uploadFile(file) {
      //参数file文件就是传入的文件流，添加进formDate中
      this.formDate.append("files", file.file);
    },
    // async onSubmit() {
    //   // this.formDate = new FormData(); //初始化定义
    //   this.$refs.upload.submit(); //内部会循环submit，有多少文件就循环几次，每次submit会执行uploadFile方法
    //   //submit了之后就可以直接将formData当作参数传给服务器
    //   //我这里是一个调用api的例子，根据你们实际接口来
    //   await getFromApi01(this.formDate).then((res) => {
    //     if (res.code === 200) {
    //       this.$message({
    //         message: "上传成功",
    //         type: "success",
    //       });
    //     }
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
</style>