<template>
  <div class="homeCenter">
    <div class="mapRef" ref="mapRef"></div>
  </div>
</template>
    
<script>
import jss from "@/utils/jss.json";
export default {
  props: {
    cityData: {
      type: Array,
      default: () => [{ name: "南京", value: 0 },
      { name: "无锡", value: 0 },
      { name: "徐州", value: 0 },
      { name: "常州", value: 0 },
      { name: "苏州", value: 0 },
      { name: "南通", value: 0 },
      { name: "盐城", value: 0 },
      { name: "扬州", value: 0 },
      { name: "镇江", value: 0 },
      { name: "淮安", value: 0 },
      { name: "宿迁", value: 0 },
      { name: "泰州", value: 0 },
      { name: "连云港", value: 0 }]
    }
  },
  data() {
    return {
      show: false,
      countyName: "",
    };
  },
  created() {
  },
  mounted() {
    this.init();
  },
  watch: {
    // 监听changeData的数据
    cityData: {
      handler: function (val, oldVal) {
        console.log("D", val);
        this.init();
      },
      deep: true,
      // immediate: true
    },
  },
  methods: {
    init() {
      this.$echarts.registerMap("JSS", jss);
      let mapCharts = this.$refs.mapRef;
      var myChart = this.$echarts.init(mapCharts);
      const option1 = {
        tooltip: {
          // backgroundColor: "rgba(0,0,0,0)", // 设置背景颜色
          borderColor: "rgba(0,0,0,0)", // 边框颜色
          // extraCssText: 'box-shadow: none',
          // formatter: (params, a, callback) => {
          //   let html = '';
          //     html = `<div class="forBox-e" style="width:220px;backgroundColor:'white'" >
          //     <span>${params.value}</span>
          //   </div>`
          //   return html;

          // },
        },
        geo: [
          {
            map: "JSS",
            aspectScale: 0.8,
            layoutCenter: ["50%", "51%"], //地图位置
            layoutSize: "98%",
            itemStyle: {
              normal: {
                border: 0,
                borderColor: "rgba(58,149,253,0.5)",
                shadowColor: "rgba(58,149,253,0.1)",
                shadowOffsetX: 0,
                shadowOffsetY: 20,
                shadowBlur: 0,
                areaColor: "rgba(58,149,253,0.5)",
              },
            },
            emphasis: {
              disabled: true,
            },
          },
          {
            map: "JSS",
            aspectScale: 0.8,
            layoutCenter: ["50%", "52%"], //地图位置
            layoutSize: "98%",
            itemStyle: {
              normal: {
                border: 0,
                borderColor: "rgba(58,149,253,0.4)",
                shadowColor: "rgba(58,149,253,0.1)",
                shadowOffsetX: 0,
                shadowOffsetY: 20,
                shadowBlur: 0,
                areaColor: "rgba(58,149,253,0.2)",
              },
            },
            emphasis: {
              disabled: true,
            },
          },
          {
            map: "JSS",
            aspectScale: 0.8,
            layoutCenter: ["50%", "53.1%"], //地图位置
            layoutSize: "98%",
            itemStyle: {
              normal: {
                border: 0,
                borderColor: "rgba(58,149,253,0.3)",
                shadowColor: "rgba(58,149,253,0)",
                shadowOffsetX: 0,
                shadowOffsetY: 20,
                shadowBlur: 0,
                areaColor: "rgba(58,149,253,0.4)",
              },
            },
            emphasis: {
              disabled: true,
            },
          },
        ],
        //图列
        visualMap: {
          type: "piecewise",
          splitNumber: 3,
          min: 200,
          max: 2999,
          align: "left",
          right: 30,
          top: 0,
          itemWidth: 20,
          itemHeight: 20,
          itemGap: 8,
          // itemSymbol: 'circle',
          orient: "vertical",
          //区域颜色
          color: ["#013e62", "#095FB9", "#347ECD", "#339CFC", "#69C0FF", "#8FCAF1", "#B8E2F8"],
          //区域颜色范范围
          pieces: [
            { min: 0, max: 0 },
            { min: 1, max: 30 },
            { min: 31, max: 60 },
            { min: 61, max: 90 },
            { min: 91, max: 120 },
            { min: 121, max: 150 },
            { min: 151 }
          ],
          textStyle: {
            color: "#000",
            fontSize: 14
          },
          selectedMode: false
        },
        series: [
          {
            name: "预警数量:(个)",
            type: "map",
            mapType: "JSS",
            aspectScale: 0.8,
            layoutCenter: ["50%", "50%"], //地图位置
            layoutSize: "98%",
            zoom: 1, //当前视角的缩放比例
            // roam: true, //是否开启平游或缩放
            scaleLimit: {
              //滚轮缩放的极限控制
              min: 1,
              max: 2,
            },
            select: { // 地图选中区域样式
              show: false,
              label: { // 选中区域的label(文字)样式
                color: '#fff'
              },
              itemStyle: {// 选中区域的默认样式
                color: null,
              },
            },
            //地图上的label和字
            label: {
              normal: {
                color: "rgba(255,255,255,1)",
                show: true,
                color: "#fff",
                textShadowColor: "rgba(0,0,0,0.8)",
                textShadowBlur: 4,
                textShadowOffsetX: 0,
                textShadowOffsetY: 0,
                fontWeight: "normal",
                formatter(params) {
                  // console.log(params)
                  //seriesData 里面没有的区会显示NaN demo写的不严谨 无所谓了   初始化显示名称
                  return params.name
                },
              },
              emphasis: {
                show: true,
                color: "#fff",
              },
            },
            itemStyle: {
              normal: {
                areaColor: {
                  type: "linear-gradient",
                  x: 10,
                  y: 30,
                  x2: 0,
                  y2: 1500,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(4,86,222,1)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(12,193,227,.5)", // 50% 处的颜色
                    },
                  ],
                  global: true, // 缺省为 false
                },
                borderColor: "#000",
                borderWidth: 0.2,
              },
              emphasis: {
                areaColor: {
                  type: "linear-gradient",
                  x: 0,
                  y: 300,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(12,192,225,1)", // 0% 处的颜色
                    },
                    // {
                    //   offset: 1,
                    //   color: "rgba(5,83,23,0.6)", // 50% 处的颜色
                    // },
                  ],
                  global: true, // 缺省为 false
                },
              },
            },
            data: this.cityData,
          },

        ],
      };
      myChart.setOption(option1, true);
    },
  },
};
</script>
    
<style lang="scss" scoped>
.homeCenter {
  width: 100%;
  height: 550px;
  position: relative;
}

.mapRef {
  width: 100%;
  height: 550px;
}
</style>
