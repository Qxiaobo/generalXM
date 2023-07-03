<template>
    <div class>
      <el-table
        :data="listData"
        :span-method="objectSpanMethod"
        border
        class="tableArea"
        style="width: 1000%;"
        header-row-style="display: none;"
      >
      <el-table-column  v-for="(item,index) in rowList" :key="index" :prop="item.value" align="center" width="200"></el-table-column>

        <!-- <el-table-column  prop="productType" align="center" width="200"></el-table-column>
        <el-table-column  prop="amount" align="center"></el-table-column>
        <el-table-column  prop="price" align="center"></el-table-column>
        <el-table-column  prop="productName" width="200px" align="center"></el-table-column>
        <el-table-column  prop="updateTime" align="center"></el-table-column> -->
      </el-table>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        listData: [],
        testArr1: [],
        testArr2: [],
        testPosition1: 0,
        testPosition2: 0,
        rowList: [
          {
            value:'productType',
          },
          {
            value:'amount',
          },
          {
            value:'price',
          },
          {
            value:'productName',
          },
          {
            value:'updateTime',
          },
          {
            value:'updateTime1',
          },
          {
            value:'updateTime2',
          },
          {
            value:'updateTime3',
          },
          {
            value:'updateTime4',
          },
          {
            value:'updateTime5',
          },
          {
            value:'updateTime6',
          }
        ],
      };
    },
    methods: {
      // 获取数据
      queryData() {
        this.listData = [
          {
            id: "201808300001",
            productType: "2023/4/4",
            amount: '气象',
            productName: "最低温度(℃)",
            price: "最高气温(℃)",
            updateTime: "平均温度(℃)",
            updateTime1: "天气",
            updateTime2: "风速(m/s)",
            updateTime3: "湿度(%)",
            updateTime4: "降水量(mm)",
            updateTime5: "辐照(1x)",

          },
          {
            id: "201808300002",
            productType: "2023/4/4",
            amount: '气象',
            productName: "36℃",
            price: " 46℃",
            updateTime: "40℃",
            updateTime1: "晴天",
            updateTime2: "35",
            updateTime3: "89%",
            updateTime4: "120",
            updateTime5: "3",
          },
          {
            id: "201808300001",
            productType: "2023/4/4",
            amount: '历史数据',
            productName: "竟端申报电价(元/MWh)",
            price: "竟端出清电价(元/MWh)",
            updateTime: "送端申报电价(元/MWh)",
            updateTime1: "送端出清电价(元/MWh)",
            updateTime2: "河北申报电价(元/MW)",
            updateTime3: "河北申报电价(元/MW)",
            updateTime4: "河北出清电力(MW)",
            updateTime5: "河北出清电价(MW)",
            updateTime6: "河北成交比例(%)",
          },
          {
            id: "201808300002",
            productType: "2023/4/4",
            amount: '历史数据',
            productName: "65",
            price: "35",
            updateTime: "43",
            updateTime1: "29",
            updateTime2: "46",
            updateTime3: "123",
            updateTime4: "180",
            updateTime5: "140",
            updateTime6: "68%",
          },


          {
            id: "201808300003",
            productType: "2023/4/4",
            amount: '电力情况',
            productName: "负荷预测(MW)",
            price: "可再生能源发电预测(MW)",
          },
  
          {
            id: "201808300004",
            productType: "2023/4/4",
            amount: '电力情况',
            productName: "45",
            price: "76",
          },


          {
            id: "201808300005",
            productType: "2023/4/4",
            amount: '煤炭电价',
            productName: "河北燃煤上网电价(元/MWh)",
            price: "竟端燃煤上网均价(元/MWh)",
            updateTime: "送端燃煤上网均价(元/MWh)",
          },


          {
            id: "201808300006",
            productType: "2023/4/4",
            amount: '煤炭电价',
            productName: "87",
            price: "36",
            updateTime: "66",
          },











          {
            id: "201808300001",
            productType: "2023/4/3",
            amount: '气象',
            productName: "最低温度(℃)",
            price: "最高气温(℃)",
            updateTime: "平均温度(℃)",
            updateTime1: "天气",
            updateTime2: "风速(m/s)",
            updateTime3: "湿度(%)",
            updateTime4: "降水量(mm)",
            updateTime5: "辐照(1x)",

          },
          {
            id: "201808300002",
            productType: "2023/4/3",
            amount: '气象',
            productName: "36℃",
            price: " 46℃",
            updateTime: "40℃",
            updateTime1: "晴天",
            updateTime2: "35",
            updateTime3: "89%",
            updateTime4: "120",
            updateTime5: "3",
          },
          {
            id: "201808300001",
            productType: "2023/4/3",
            amount: '历史数据',
            productName: "竟端申报电价(元/MWh)",
            price: "竟端出清电价(元/MWh)",
            updateTime: "送端申报电价(元/MWh)",
            updateTime1: "送端出清电价(元/MWh)",
            updateTime2: "河北申报电价(元/MW)",
            updateTime3: "河北申报电价(元/MW)",
            updateTime4: "河北出清电力(MW)",
            updateTime5: "河北出清电价(MW)",
            updateTime6: "河北成交比例(%)",
          },
          {
            id: "201808300002",
            productType: "2023/4/3",
            amount: '历史数据',
            productName: "65",
            price: "35",
            updateTime: "43",
            updateTime1: "29",
            updateTime2: "46",
            updateTime3: "123",
            updateTime4: "180",
            updateTime5: "140",
            updateTime6: "68%",
          },


          {
            id: "201808300003",
            productType: "2023/4/3",
            amount: '电力情况',
            productName: "负荷预测(MW)",
            price: "可再生能源发电预测(MW)",
          },
  
          {
            id: "201808300004",
            productType: "2023/4/3",
            amount: '电力情况',
            productName: "45",
            price: "76",
          },


          {
            id: "201808300005",
            productType: "2023/4/3",
            amount: '煤炭电价',
            productName: "河北燃煤上网电价(元/MWh)",
            price: "竟端燃煤上网均价(元/MWh)",
            updateTime: "送端燃煤上网均价(元/MWh)",
          },


          {
            id: "201808300006",
            productType: "2023/4/3",
            amount: '煤炭电价',
            productName: "45",
            price: "36",
            updateTime: "56",
          },

          


          {
            id: "201808300001",
            productType: "2023/3/31",
            amount: '气象',
            productName: "最低温度(℃)",
            price: "最高气温(℃)",
            updateTime: "平均温度(℃)",
            updateTime1: "天气",
            updateTime2: "风速(m/s)",
            updateTime3: "湿度(%)",
            updateTime4: "降水量(mm)",
            updateTime5: "辐照(1x)",

          },
          {
            id: "201808300002",
            productType: "2023/3/31",
            amount: '气象',
            productName: "36℃",
            price: " 46℃",
            updateTime: "40℃",
            updateTime1: "晴天",
            updateTime2: "35",
            updateTime3: "89%",
            updateTime4: "120",
            updateTime5: "3",
          },
          {
            id: "201808300001",
            productType: "2023/3/31",
            amount: '历史数据',
            productName: "竟端申报电价(元/MWh)",
            price: "竟端出清电价(元/MWh)",
            updateTime: "送端申报电价(元/MWh)",
            updateTime1: "送端出清电价(元/MWh)",
            updateTime2: "河北申报电价(元/MW)",
            updateTime3: "河北申报电价(元/MW)",
            updateTime4: "河北出清电力(MW)",
            updateTime5: "河北出清电价(MW)",
            updateTime6: "河北成交比例(%)",
          },
          {
            id: "201808300002",
            productType: "2023/3/31",
            amount: '历史数据',
            productName: "65",
            price: "35",
            updateTime: "43",
            updateTime1: "29",
            updateTime2: "46",
            updateTime3: "123",
            updateTime4: "180",
            updateTime5: "140",
            updateTime6: "68%",
          },


          {
            id: "201808300003",
            productType: "2023/3/31",
            amount: '电力情况',
            productName: "负荷预测(MW)",
            price: "可再生能源发电预测(MW)",
          },
  
          {
            id: "201808300004",
            productType: "2023/3/31",
            amount: '电力情况',
            productName: "45",
            price: "76",
          },


          {
            id: "201808300005",
            productType: "2023/3/31",
            amount: '煤炭电价',
            productName: "河北燃煤上网电价(元/MWh)",
            price: "竟端燃煤上网均价(元/MWh)",
            updateTime: "送端燃煤上网均价(元/MWh)",
          },


          {
            id: "201808300006",
            productType: "2023/3/31",
            amount: '煤炭电价',
            productName: "45",
            price: "36",
            updateTime: "56",
          },
        ];
  
        this.rowspan(this.testArr1,0,  "productType");
        this.rowspan(this.testArr2, 0, "amount");
        console.log(this.listData)
      },
      rowspan(spanArr, position, spanName) {
        this.listData.forEach((item, index) => {
          if (index === 0) {
            spanArr.push(1);
            position = 0;
          } else {
            if (
              this.listData[index][spanName] ===
              this.listData[index - 1][spanName]
            ) {
              spanArr[position] += 1;
              spanArr.push(0);
            } else {
              spanArr.push(1);
              position = index;
            }
          }
        });
      },
      // 表格合并行
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          const _row = this.testArr1[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col,
          };
        }
        if (columnIndex === 1) {
          const _row = this.testArr2[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col,
          };
        }
      },
    },
    mounted() {
      this.queryData();
    },
  };
  </script>
  