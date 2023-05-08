<template>
  <div>
    <el-card class="box-card">
      <CleanForm
        :tableOptionWidth="200"
        :showCheckbox="true"
        :searShow="true"
        :showIndex="true"
        :showColumnHandle="true"
        :showColumnSetting="false"
        :field-list="headList"
        :api="getFromApi01"
        :queryParam="queryDetailParam"
        ref="queryStaSumDetails"
        :page="false"
        :dialogPage="true"
      >
      <template slot="searchBar">
        <!-- 这里是写搜索表单的地方 -->
        <el-form size="mini" :inline="true" ref="batchJsForm" label-width="120px">
          <!-- 表格上的查询条件 -->
          <el-row>
            <el-col :span="14">
              <el-form-item label="姓名">
                <el-input v-model.trim="queryDetailParam.batchName" clearable style="width: 180px;" />
                <el-button style="margin-left: 20px;" v-throttle="[doTest,1000, 'click', '这个是传递的参数']"   class="newButtonColor SearchBTN">自定义指令节流</el-button>
                <el-button  size="mini" class="SearchBTN otherBTN">清空</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item>

                <el-button class="newButtonColor SearchBTN" @click="doDownload" >下载模板</el-button>

                <el-button class="newButtonColor SearchBTN" @click="doFullScreen" >全屏按钮</el-button>
                <el-button size="mini" class="SearchBTN newButtonColor" @click="doCopay" >文本复制</el-button>
                <el-button  size="mini" class="SearchBTN newButtonColor">文件上传</el-button>
                <!-- <FileUpload></FileUpload> -->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template slot="tableTopOptionLeft" >
        <!-- 这里是写表格上方的按钮 -->
        <el-button class="newButtonColor SearchBTN" >表格左侧的插槽</el-button>
      </template>
      <template slot="tableTopOptionRight" >
        <!-- 这里是写表格上方的按钮 -->
        <el-button class="newButtonColor SearchBTN" @click="dialogTrue" >表格右侧的插槽</el-button>
      </template>
      <template #tableOption="{row}">
              <!-- <slot name="tableOption" @click="doTableOption(row)" /> -->
              <el-button type="danger" @click="doTableOption(row)" > 最后一列的插槽</el-button>
            </template>
      </CleanForm>
    </el-card>
    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  v-if="dialogVisible"
  :destroy-on-close="true"

  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
import "@/mock/labMock/index.js";
import { getFromApi01,download,getQueryAllApply } from "@/api/labApi/fromApi.js";
import axios from 'axios'
export default {
  name: "LabProjectIndex",

  data() {
    return {
      getFromApi01,
      dialogVisible:false,
      queryDetailParam: {batchName:''},
      headList: [
        {
          name: "姓名",
          value: "batchName",
          noSort: true,
        },
        { name: "国家", value: "unitCode", noSort: true },
        { name: "地区", value: "areaCode", noSort: true },
        { name: "开始时间", value: "validTime", noSort: true },
        { name: "出发时间", value: "buyTime", noSort: true },
        { name: "总额", value: "subsidyEstimate", noSort: true },
        { name: "一月流量", value: "month1", noSort: true },
        { name: "二月流量", value: "month2", noSort: false },
      ],
    };
  },

  mounted() {},

  methods: {
     doTest(e){
      console.log(e)
      console.log('点击')

    },
    dialogTrue(){
      this.dialogVisible = true
    },
    async doDownload(){
      let excelName = '电量导入模板.xlsx'
            const res = await download();
            const link = document.createElement("a");
            let blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            link.style.display = "none";
            link.href = URL.createObjectURL(blob);
            link.download = excelName; //下载的文件名
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
    },
    doCopay(){
      // 浏览器复制api
      navigator.clipboard.writeText('复制的内容')
    },
    requestFullScreen(){
      var de = document.documentElement;
      if (de.requestFullscreen) {
        de.requestFullscreen();
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen();
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen();
      }
    },
    // Q:解释一下 requestFullScreen这个函数的作用
    // A:这个函数是用来全屏的，但是这个函数是浏览器自带的，所以要判断一下浏览器的兼容性
    doFullScreen(){
      // 判断是不是全屏状态
      if (document.fullscreenElement) {
        // 如果是全屏，就退出全屏
        document.exitFullscreen();
      } else {
        // 如果不是全屏，就全屏
        this.requestFullScreen();
      }
      // document.documentElement.webkitRequestFullScreen()
    }
  },
};
</script>

<style lang="scss" scoped>
</style>