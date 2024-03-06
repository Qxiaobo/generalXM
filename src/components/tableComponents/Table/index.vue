<template>
    <div class="table-wrap">
      <!-- 表格内容 -->
      <el-table :data="tableData" v-loading="loading" border stripe @sort-change="handleSortChange">
        <!-- 表格列的配置 -->
      </el-table>
      <!-- 分页组件 -->
      <Pagination v-if="page" :listInfo="listInfo" @currentChange="handleCurrentChange" @sizeChange="handleSizeChange" />
    </div>
  </template>
  
  <script>
  import Pagination from './Pagination.vue'
  
  export default {
    name: 'Table',
    components: {
      Pagination
    },
    props: {
      fieldList: Array,
      loading: Boolean,
      tableData: Array,
      totalValue: Array,
      showIndex: Boolean,
      showCheckbox: Boolean,
      showColumnSetting: Boolean,
      showExportBtn: Boolean,
      showRefreshBtn: Boolean,
      showColumnHandle: Boolean,
      dialogPage: Boolean,
      page: Boolean,
      listInfo: Object,
      tableHeight: String
    },
    methods: {
      // 表格相关方法
      handleSortChange(sort) {
        this.$emit('sortChange', sort)
      },
      handleCurrentChange(val) {
        this.$emit('currentChange', val)
      },
      handleSizeChange(val) {
        this.$emit('sizeChange', val)
      }
    }
  }
  </script>
  
  <style scoped>
  /* 表格样式 */
  </style>
  