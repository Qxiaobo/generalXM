<template>
    <el-table
      :data="tableData"
     :span-method="(param)=>objectSpanMethod(param,tableData)"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="amount1"
        sortable
        label="数值 1">
      </el-table-column>
      <el-table-column
        prop="amount2"
        sortable
        label="数值 2">
      </el-table-column>
      <el-table-column
        prop="amount3"
        sortable
        label="数值 3">
      </el-table-column>
    </el-table>
</template>
<script>
function filterArray(item) {
  const valueArray = this.rule.filter(prop => {
    return item[prop] === this.data[prop]
  })
  if (valueArray.length === this.rule.length) {
    return true
  } else {
    return false
  }
}
  export default {
    data() {
      return {
        tableData: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }],
        // 配置spanRule来控制合并表格的规则
        spanRule: {
            rule: {
              // 第一列取id字段，若与下一行数据一致则合并
              0: ['id'],
              1:['name']
            }
      }
      };
    },
    methods: {
      // 表格合并
          objectSpanMethod({ row, column, rowIndex, columnIndex }, item) {
            if (Object.keys(this.spanRule.rule).includes(columnIndex.toString())) {
              // filter验证数组
              const currentTable = {
                rule: this.spanRule.rule[columnIndex],
                data: item[rowIndex]
              }
              // 该单元格是否被合并 true 合并， false : 不合并
              let chooseSpan = false
              if (rowIndex !== 0) {
                chooseSpan = filterArray.call(currentTable, item[rowIndex - 1])
              }
              if (chooseSpan) {
                return {
                  rowspan: 0,
                  colspan: 0
                }
              } else {
                return {
                  rowspan: item.filter(filterArray, currentTable).length,
                  colspan: 1
                }
              }
            }
          },
    }
  };
</script>
