<template>
  <div class="query-detail">
    <div class="query-table">
      <el-table
        :data="tableData"
        :cell-style="styleBack"
        border
        :header-cell-style="getRowClass"
      >
        >
        <el-table-column
          v-for="(item, index) of columns"
          :prop="item.prop"
          :label="item.label"
          :type="item.type"
          :width="item.width"
          align="center"
          :key="index"
        ></el-table-column>

      </el-table>

    </div>
  </div>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => [
      ],
    },
    tableData: {
      type: Array,
      default: () => [
      ],
    },
 
  },
  methods: {
  //   exportAllData() {
  //     this.$emit("exportAllData");
  //   },
  //   handleSelectionChange(val) {
  //     this.$emit("handleSelectionChange", val);
  //   },
  //   handleSizeChange(val) {
  //     this.$emit("handleSizeChange", val);
  //   },
  //   handleCurrentChange(val) {
  //     this.$emit("handleCurrentChange", val);
  //   },
  //   aclick(btn, val) {
  //     this.$emit("handleClick", btn, val);
  //   },
  //   btnClicks(val) {
  //     this.$emit("btnClicks", val);
  //   },
    getRowClass() {
      return "background:#EEF4F4!important; color:#333333;font-size:14px;height:51px;text-align:center;width:200px;border-color:#D6EAEB";
    },
    styleBack({ rowIndex }) {
      if ((rowIndex + 1) % 2 === 0) {
        return "background:#EEF4F4 !important; font-size:14px; height:51px !important;text-align:center";
      } else {
        return "background:#ffffff !important; font-size:14px;height:51px !important;text-align:center";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.query-detail {
 v-deep .query-table {
    text-align: center;

    .cell {
      display: flex;
      justify-content: center;
    }
  }

  .query-pagination {
    margin-top: 20px;
    height: 36px;
    //text-align: center;
  }
}

.el-button {
  margin: 0 5px;
}

.divedAlias {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}
</style>
