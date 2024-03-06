<template>
    <div>
      <SearchBar :queryParam="queryParam" @search="handleSearch" />
      <Table
        :fieldList="fieldList"
        :loading="loading"
        :tableData="tableData"
        :totalValue="totalValue"
        :showIndex="showIndex"
        :showCheckbox="showCheckbox"
        :showColumnSetting="showColumnSetting"
        :showExportBtn="showExportBtn"
        :showRefreshBtn="showRefreshBtn"
        :showColumnHandle="showColumnHandle"
        :dialogPage="dialogPage"
        :page="page"
        :listInfo="listInfo"
        :tableHeight="tableHeight"
        @sortChange="handleSortChange"
        @currentChange="handleCurrentChange"
        @sizeChange="handleSizeChange"
      />
    </div>
  </template>
  
  <script>
  import SearchBar from './SearchBar.vue'
  import Table from './Table.vue'
  import Pagination from './Pagination.vue'
  
  export default {
    name: 'Index',
    components: {
      SearchBar,
      Table,
      Pagination
    },
    data() {
      return {
        queryParam: {},
        fieldList: [],
        loading: false,
        tableData: [],
        totalValue: [],
        showIndex: true,
        showCheckbox: true,
        showColumnSetting: true,
        showExportBtn: true,
        showRefreshBtn: true,
        showColumnHandle: true,
        dialogPage: false,
        page: true,
        listInfo: {},
        tableHeight: ''
      }
    },
    methods: {
      handleSearch() {
        // 处理搜索操作
      },
      handleSortChange(sort) {
        // 处理排序操作
      },
      handleCurrentChange(val) {
        // 处理当前页变化操作
      },
      handleSizeChange(val) {
        // 处理每页条数变化操作
      }
    }
  }
  </script>
  
  <style scoped>
  /* 样式 */
  </style>
  