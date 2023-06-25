<template>
  <div class="box-wrapper">
    <el-table 
      border
      :data="tableData" 
      :header-cell-style="headerCellStyle"
      :span-method="spanMergeMethod"
      style="width: 80%">
    <el-table-column 
      prop="no" 
      label="项目编号" 
      align="center"
      > 
    </el-table-column>
    <el-table-column 
      prop="name" 
      label="项目名称" 
      align="center"
      > 
    </el-table-column>
    <el-table-column 
      prop="stageName" 
      label="阶段名称"
      align="center"> 
    </el-table-column>
    <el-table-column 
      prop="date" 
      label="开始时间"
      align="center"> 
    </el-table-column>
    <el-table-column 
      prop="status" 
      label="状态"
      align="center"> 
    </el-table-column>
    <el-table-column align="center" label="操作">
      <template>
        <el-button type="text"   size="small">编辑</el-button>
      </template>
    </el-table-column>
    <el-table-column align="center" label="操作" >
      <template>
        <el-button type="danger" size="small">删除项目</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      tableData: [],
      spanArr: [],
      list: [
        {
          openid: '20a',
          no: '#33390',
          name: '项目A',
          stages: [
             { stageName: '阶段一', date: '2016-05-02', status: '已结束' },
             { stageName: '阶段二', date: '2020-05-02', status: '已结束' },
             { stageName: '阶段三', date: '2022-05-02', status: '建设中' },
          ]
        },
        {
          openid: '21b',
          no: '#33391',
          name: '项目B',
          stages: [
             { stageName: '阶段一', date: '2016-05-02', status: '已结束' },
             { stageName: '阶段二', date: '2020-05-02', status: '已结束' },
             { stageName: '阶段三', date: '2022-05-02', status: '建设中' },
          ]
        },
      
      ],
    };
  },
  mounted(){
    this.tableData = this.dataListConvert(this.list);
    this.rowSpan(this.tableData);
  },
  methods: {
    dataListConvert(list){
      const arr = [];
      list.forEach(item => {
        const { no, openid, name, stages } = item;
        if (item.stages.length === 1) {
          arr.push({ no, openid, name, ...stages[0] });
        } else {
          stages.forEach(stage => {
            arr.push({  no, openid, name, ...stage });
          });
        }
      });
      return arr;
    },

    /* 合并表头最后两项*/
    headerCellStyle({ row, columnIndex }){
      // 这里 row[5] 为表头倒数第二列, row[6] 为倒数第一列
      // row[5].colSpan = 2;
      // row[6].colSpan = 0;
      // if (columnIndex === 6) {
      //   return 'display: none';
      // }
      row[1].colSpan = 2;
      // row[1].colSpan = 1;
      if (columnIndex === 0) {
        return 'display: none';
      }
    },
    /*
     * 用来返回 this.spanArr数组，用来定义表格每一行的 rowspan
     * rowspan的值：0 代表消失，1代表独占一行，2以上的值代表合并了若干行
     */
    rowSpan(list){
      list.forEach((item, index) => {
        if (index === 0) {
          // 第一行，直接给数组push一个1，表示自己先占一行
          this.spanArr.push(1);
          // 表示数组的第一个元素
          this.position = 0;
        } else {
          if (list[index].openid === list[index - 1].openid){
            // 如果第二行与第一行相等，则this.position就+1,当有n行与前一行相同时，this.position就为n,表示向下合并n行
            this.spanArr[this.position] += 1;
            // this.spanArr.push(0)表示第二行消失
            this.spanArr.push(0);
          } else {
            // 如果第二行与第一行不相等的话，那么this.spanArr.push(1);就让第二行自己独占一行；
            // this.position = index意思就是把指针拿到index这行来
            this.spanArr.push(1);
            this.position = index;
          }
        }
      });
    },
    /**
     * element-ui table方法，实现合并行或者列
     * @param row
     * @param column
     * @param rowIndex
     * @param columnIndex
     * @return {{colspan: number, rowspan: *}}
     */
    spanMergeMethod({ rowIndex, columnIndex }) {
      // 需要合并的列的Index值，这里是第一，第二和最后一列的index值
      const mergeColumnIndex = [0, 1, 6];
      const needMerge = mergeColumnIndex.includes(columnIndex);
      if (needMerge) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return { rowspan: _row, colspan: _col };
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.box-wrapper {
  margin:  0 auto;
  width: 1200px;
}
</style>
