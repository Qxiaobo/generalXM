<template>
  <div>
    <el-card class="box-card">
      <div class="titleHead">文件上传&&下拉框新增选项&&导入导出表格</div>
      <el-divider></el-divider>
      <FileUpload
        :individual="true"
        :url="'http://192.168.0.110:8080/add/file'"
        :fileData="fileData"
      ></FileUpload>
      <el-divider></el-divider>

      <FileUploadS
        :url="'http://192.168.0.110:8080/add/file'"
        :fileData="fileData"
      ></FileUploadS>
      <el-divider></el-divider>

      <SelectAdd :labelslist="selectList" val="value" label="label">
      </SelectAdd>
      <el-divider></el-divider>
      <el-upload
        class="upload-demo"
        action=""
        ref="upload"
        :on-change="handleChange"
        :file-list="fileListUpload"
        :limit="1"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        :auto-upload="false"
      >
        <el-button size="small" type="primary">导入表格预览</el-button>
        <div slot="tip" class="el-upload__tip">
          只 能 上 传 xlsx / xls 文 件
        </div>
      </el-upload>
      <el-button size="small" type="primary" @click="doExport"
          >导出</el-button
        >
      <div id="tableHtml"></div>
    </el-card>
  </div>
</template>

<script>
import FileUploadS from "@/components/fileUpload/indexNum.vue";

import download from '@/utils/xlsxFile' 
import * as xlsx from "xlsx";
export default {
  name: "LabProjectIndex",
  components: {
    FileUploadS,
  },

  data() {
    return {
      outdata:null,
      fileListUpload: [],
      outdataExport:[],
      selectList: [
        {
          value: "1",
          label: "小红",
        },
        {
          value: "2",
          label: "小明",
        },
        {
          value: "3",
          label: "小李",
        },
        {
          value: "4",
          label: "小张",
        },
        {
          value: "5",
          label: "小刘",
        },
      ],
      fileData: {
        name: "file",
        info: "上传文件测试",
      },
    };
  },

  mounted() {},

  methods: {
    doExport(e) {
      // console.log(this.outdataExport,'this.outdata')
    
      download(this.outdataExport,'人员信息.xlsx')//导出的文件名
    
    },
    handleChange(file, fileList) {
      this.fileTemp = file.raw;
      if (this.fileTemp) {
        if (
          this.fileTemp.type ==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          this.fileTemp.type == "application/vnd.ms-excel"
        ) {
          this.importfxx(this.fileTemp);
          this.$refs.upload.clearFiles();
        } else {
          this.$message({
            type: "warning",
            message: "附件格式错误，请删除后重新上传！",
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请上传附件！",
        });
      }
    },

    handleRemove(file, fileList) {
      this.fileTemp = null;
    },
    importfxx(obj) {
      let _this = this;
      // 通过DOM取文件数据
      this.file = obj;
      let rABS = false; //是否将文件读取为二进制字符串
      let f = this.file;
      let reader = new FileReader();
      //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function (f) {
        let binary = "";
        let rABS = false; //是否将文件读取为二进制字符串
        let wb; //读取完成的数据
        let reader = new FileReader();
        reader.onload = function (e) {
          let bytes = new Uint8Array(reader.result);
          let length = bytes.byteLength;
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          console.log(binary, "binarybinary");
          let XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64",
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary",
            });
          }

          // this.outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //转换为数据(数组对象)
          // 将读取到的数据转换成html
          this.outdata = XLSX.utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]]); //转换为html
          console.log( this.outdataExport)
          document.querySelector("#tableHtml").innerHTML = this.outdata;

          _this.outdataExport = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //转换数据
          // this.tableToHtml(XLSX.utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]]))
          // console.log(this.outdata, "outdataoutdata");
        };
        reader.readAsArrayBuffer(f);
      };

      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#tableHtml {
  width: 100%;
  height: 600px;
  overflow: auto;
}
.titleHead {
  color: rgba(64, 158, 255);
  font-size: 32px;
  font-weight: 700;
}
.itemDemo {
  padding: 10px;
}
#tableHtml ::v-deep table {
  // color: red;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  border-collapse: collapse;
  margin: auto;
}

#tableHtml ::v-deep table td {
  border-left: 1px solid #000;
  border-top: 1px solid #000;
  white-space: nowrap;
  text-align: center;
  padding: 0.5rem;
}

#tableHtml ::v-deep tbody tr:nth-of-type(1) {
  font-weight: bold;
  font-size: 20px;
}
</style>
