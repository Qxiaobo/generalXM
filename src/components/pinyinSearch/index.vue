<template>
    <div >
      <el-select 
          v-model="value"
          filterable
          :filter-method="PinyinMatchFun"
          placeholder="请选择"
          clearable
      >
          <el-option
          v-for="item in commonAddr"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
          </el-option>
      </el-select>
  
  
  
    </div>
  </template>
  <script>
  import PinyinMatch from "pinyin-match"
  export default {
    name: "app",
    data() {
      return {
      // 数据源
        commonAddr: [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          },
          {
            value: "选项3",
            label: "蚵仔煎"
          },
          {
            value: "选项4",
            label: "龙须面"
          },
          {
            value: "选项5",
            label: "北京烤鸭"
          }
        ],
      // 复制一份数据
        copycommonAddr: [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          },
          {
            value: "选项3",
            label: "蚵仔煎"
          },
          {
            value: "选项4",
            label: "龙须面"
          },
          {
            value: "选项5",
            label: "北京烤鸭"
          }
        ],
  
        value: ""
      };
    },
    methods: {
    // 过滤方法, 接收一个输入框内容作为参数, 当输入框内容改变后会执行
      PinyinMatchFun(val) {
        if (val) {
        // 定义一个空数组用来存储过滤后的数据
          var result = [];
          // 开始循环过滤内容
          this.copycommonAddr.forEach(i => {
              // 调用 PinyinMatch.match 方法进行拼音与汉字匹配
            var m = PinyinMatch.match(i.label, val);
            if (m) {
            // 匹配成功则push到result数组中
              result.push(i);
            }
          });
          // 将过滤后的数组重新赋给下拉列表数据
          this.commonAddr = result;
        } else {
        // 如果输入框为空, 则将下拉列表数据还原
          this.commonAddr = this.copycommonAddr;
        }
      }
    }
  };
  </script>
  