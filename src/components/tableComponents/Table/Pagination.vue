<template>
    <div>
      <!-- 分页组件 -->
      <el-pagination
        v-if="listInfo && listInfo.query"
        :current-page.sync="listInfo.query.current"
        :page-size="listInfo.query.size"
        :total="listInfo.pageTotal"
        :page-sizes="listInfo.pageSizes"
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <!-- 可选：自定义分页按钮 -->
      </el-pagination>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Pagination',
    props: {
      listInfo: Object
    },
    methods: {
      // 分页相关方法
      handleSizeChange(val) {
        this.$emit('sizeChange', val)
      },
      handleCurrentChange(val) {
        this.$emit('currentChange', val)
      }
    }
  }
  </script>
  
  <style scoped>
  /* 分页组件样式 */
  </style>
  