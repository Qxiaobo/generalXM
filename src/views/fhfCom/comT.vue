<template>
  <div>
    <el-table
      :data="tableData"
      :span-method="arraySpanMethod"
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

    <el-table
      :data="tableData"
    :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px">
      <!-- <el-table-column
        :render-header="renderHeader"
       > -->
      <el-table-column
        prop="menuRow1"
        width="180">
      </el-table-column>
        <el-table-column
        prop="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="数值 1（元）">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="数值 2（元）">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="数值 3（元）">
      </el-table-column>
      <!-- </el-table-column> -->

    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          id: '12987122',
          name: '王小虎1',
          menuRow1:'存量情况',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎2',
          amount1: '165',
          // menuRow1:'存量情况',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          // menuRow1:'存量情况',
          name: '王小虎3',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎4',
          // menuRow1:'存量情况',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        },
         {
          id: '12987126',
          name: '王小虎5',
          amount1: '539',
          menuRow1:'今年年完成情况',

          // menuRow1:'存量情况',

          amount2: '4.1',
          amount3: 15
        },
        {
          id: '12987126',
          name: '王小虎6',
          amount1: '539',
          // menuRow1:'今年年完成情况',

          // menuRow1:'存量情况',

          amount2: '4.1',
          amount3: 15
        },
        {
          id: '12987126',
          name: '王小虎7',
          amount1: '539',
          // menuRow1:'存量情况',
          // menuRow1:'今年年完成情况',


          amount2: '4.1',
          amount3: 15
        },
        {
          id: '12987126',
          name: '王小虎8',
          amount1: '539',
          // menuRow1:'存量情况',
          // menuRow1:'今年年完成情况',

          amount2: '4.1',
          amount3: 15
        },
        {
          id: '12987126',
          name: '王小虎9',
          amount1: '539',
          menuRow1:'增量情况',

          // menuRow1:'存量情况',
          amount2: '4.1',
          amount3: 15
        },
        {
          id: '12987126',
          name: '王小虎10',
          amount1: '539',
          // menuRow1:'存量情况',
          // menuRow1:'增量情况',

          amount2: '4.1',
          amount3: 15
        },
        {
          id: '12987126',
          name: '王小虎11',
          amount1: '539',
          // menuRow1:'增量情况',

          // menuRow1:'存量情况',
          amount2: '4.1',
          amount3: 15
        },
        {
          id: '12987126',
          name: '王小虎12',
          amount1: '539',
          // menuRow1:'增量情况',

          // menuRow1:'存量情况',
          amount2: '4.1',
          amount3: 15
        },
        {
          id: '12987126',
          name: '王小虎13',
          amount1: '539',
          // menuRow1:'存量情况',
          menuRow1:'总体情况',

          amount2: '4.1',
          amount3: 15
        },
        {
          id: '12987126',
          name: '王小虎8',
          amount1: '539',
          // menuRow1:'总体情况',

          // menuRow1:'存量情况',
          amount2: '4.1',
          amount3: 15
        },
        {
          id: '12987126',
          name: '王小虎8',
          amount1: '539',
          // menuRow1:'总体情况',

          // menuRow1:'存量情况',
          amount2: '4.1',
          amount3: 15
        }
        
      ]
      };
    },
    methods: {
      renderHeader(h, { column }){
        return h('div', {style:'height:42px;line-height:42px;text-align:center;'} ,[
          h('span', { style:'font-size:32px', },'新能源一次调频功能推进情况汇总表')
        ])
      },
      // arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      //   // console.log(row,'row')
      //   // console.log(column,'column')
      //   console.log(rowIndex,'rowIndex')
      //   if (rowIndex % 2 === 0) {
      //     if (columnIndex === 0) {
      //       return [1, 2];
      //     } else if (columnIndex === 1) {
      //       return [0, 0];
      //     }
      //   }
      // },

      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        console.log(rowIndex,'rowIndex')
        console.log(columnIndex,'columnIndex')
        if (columnIndex === 0) {
          console.log('第一列')
          if (rowIndex % 2 === 0) {
            return [4,1]
          } else if(rowIndex == 13){
            return [3,1]
          }
          return
        }
      }
    }
  };
</script>
<style scoped>
  .wrap{
    width: 100%;
    height: calc(100% - 52px);
    /* background-color: rgb(175, 251, 104); */
    box-sizing: border-box;
  }
</style>
