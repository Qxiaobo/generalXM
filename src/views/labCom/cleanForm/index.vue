<template>
  <div>
    <el-card class="box-card">
      <CleanForm
        :tableOptionWidth="400"
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
            <el-col :span="18">
              <el-form-item label="姓名">
                <el-input v-model.trim="queryDetailParam.batchName" clearable style="width: 180px;" />
                <el-button style="margin-left: 20px;" class="newButtonColor SearchBTN">查询</el-button>
                <el-button  size="mini" class="SearchBTN otherBTN">清空</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button class="newButtonColor SearchBTN" >新增</el-button>
                <el-button size="mini" class="SearchBTN newButtonColor">修改</el-button>
                <el-button @click="batchJsAdd('3')" size="mini" class="SearchBTN newButtonColor">删除</el-button>、
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
        <el-button class="newButtonColor SearchBTN" >表格右侧的插槽</el-button>
      </template>
      <template #tableOption="{row}">
              <!-- <slot name="tableOption" @click="doTableOption(row)" /> -->
              <el-button type="danger" @click="doTableOption(row)" > 最后一列的插槽</el-button>
            </template>
      </CleanForm>
    </el-card>
  </div>
</template>

<script>
import "@/mock/labMock/index.js";
import { getFromApi01 } from "@/api/labApi/fromApi.js";

export default {
  name: "LabProjectIndex",

  data() {
    return {
      getFromApi01,
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
        { name: "二月流量", value: "month2", noSort: true },
      ],
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>