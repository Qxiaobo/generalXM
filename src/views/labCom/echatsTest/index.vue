<template>
    <div style="background: #05232b;height: 100%;">
        <h3 :style="cssVars">你好</h3>
        <div id="box"></div>
        <!-- <div id="box1"></div> -->

        <div id="box2"></div>

        <div id="box3"></div>

    </div>
</template>

<script>
import datas from './data.json'
import * as echarts from 'echarts';
import 'echarts-gl';
export default {
    name: 'LabProjectIndex',


    data() {
        return {
            // isActive:require('@/assets/images/login_title.png'),
            // unActive:require('@/assets/images/logo.png'),
            active: 0,
            list: [
                { name: '首页' },
                { name: '数据中心' },
            ],
            fontColor: 'red'
        };
    },

    mounted() {
        // console.log(datas.data.filter((item, index) => item.status == 3)[0].powerList, 'dataaaaaaaaa')
        // this.dataset()
        this.init()
        // this.init1()
        // this.inin3()
        this.glInit()

    },
    computed: {
        // 计算属性用于根据active的值获取背景图片路径
        // 请确保路径的正确性和合理性
        getBackgroundImage() {
            return (index) => {
                if (this.active === index) {
                    return `url(@/assets/images/login_title.png)`;
                } else {
                    return `url(@/assets/images/logo.png)`;
                }
            };
        }
    },
    methods: {
        int(){

        },
        glInit() {
     
var chartDom = document.getElementById('box3');
var myChart = echarts.init(chartDom);
var option;

// prettier-ignore
var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
    '7a', '8a', '9a', '10a', '11a',
    '12p', '1p', '2p', '3p', '4p', '5p',
    '6p', '7p', '8p', '9p', '10p', '11p'];
// prettier-ignore
var days = ['Saturday', 'Friday', 'Thursday',
    'Wednesday', 'Tuesday', 'Monday', 'Sunday'];
// prettier-ignore
var data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];
option = {
  tooltip: {},
  visualMap: {
    max: 20,
    inRange: {
      color: [
        '#313695',
        '#4575b4',
        '#74add1',
        '#abd9e9',
        '#e0f3f8',
        '#ffffbf',
        '#fee090',
        '#fdae61',
        '#f46d43',
        '#d73027',
        '#a50026'
      ]
    }
  },
  xAxis3D: {
    type: 'category',
    data: hours
  },
  yAxis3D: {
    type: 'category',
    data: days
  },
  zAxis3D: {
    type: 'value'
  },
  grid3D: {
    boxWidth: 200,
    boxDepth: 80,
    viewControl: {
      // projection: 'orthographic'
    },
    light: {
      main: {
        intensity: 1.2,
        shadow: true
      },
      ambient: {
        intensity: 0.3
      }
    }
  },
  series: [
    {
      type: 'bar3D',
      data: data.map(function (item) {
        return {
          value: [item[1], item[0], item[2]]
        };
      }),
      shading: 'lambert',
      label: {
        fontSize: 16,
        borderWidth: 1
      },
      emphasis: {
        label: {
          fontSize: 20,
          color: '#900'
        },
        itemStyle: {
          color: '#900'
        }
      }
    }
  ]
};

option && myChart.setOption(option);
console.log(option,'option')
        },
        doclick(i) {
            this.active = i
        },
        // dataset() {
        //     let data = datas.data.filter((item, index) => item.status == 3)[0].powerList
        //     // console.log(data,'dataaaaaaaaaaa');

        //     // let arr = data.filter(item=>item.status==3)
        //     // console.log(data.filter(item=>item.status==3),'data')
        //     // arr.forEach(item=>{
        //     //     item.value = item.value/10000
        //     // })
        //     for (let i = 1; i < data.length; i++) {
        //         if (data[i].power === 0) {
        //             let j = i - 1;
        //             while (j >= 0 && data[j].power === 0) {
        //                 j--;
        //             }
        //             if (j >= 0) {
        //                 data[i].power = data[j].power;
        //             }
        //         }
        //     }
        //     console.log(data,'dataaaaaaaaaaa');
        // },


        init() {
            const rankCharts = document.getElementById('box')
            const myChart = this.$echarts.init(rankCharts)
            // import arrow from '@/assets/images/arrow.png'
            let chartData = [
                {
                    name: 'xxx事项',
                    value: 245,
                },
                {
                    name: 'xxx事项',
                    value: 211,
                },
                {
                    name: 'xxx事项',
                    value: 165,
                },
                {
                    name: 'xxx事项',
                    value: 145,
                },
                {
                    name: 'xxx事项',
                    value: 128,
                },
            ]
            let option = {
                xAxis: {
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    splitArea: { show: false },
                    axisLine: {
                        show: false,
                    },
                },
                grid: {
                    top: 10,
                    bottom: 10,
                    left: '5%',
                },
                yAxis: {
                    inverse: true,
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            padding: [-15, 0, 35, 18],
                        },
                        formatter(value, index, name) {

                            let str = '', num = 'TOP' + (index + 1)
                            if (index === 0) {
                                str = '{a| ' + num + '}{title| ' + chartData[index].name + '}' + '{e|' + value + '}'
                            } else if (index === 1) {
                                str = '{b| ' + num + '}{title| ' + chartData[index].name + value + '}'
                            } else if (index === 2) {
                                str = '{c| ' + num + '}{title| ' + chartData[index].name + value + '}'
                            } else {
                                str = '{d| ' + num + '}{title| ' + chartData[index].name + value + '}'
                            }
                            if (index < 2) {
                                str = '{a| ' + num + '}{title| ' + chartData[index].name + '}' + '{e|' + value + '}'
                            } else {
                                str = '{b| ' + num + '}{title| ' + chartData[index].name + '}' + '{e|' + value + '}'

                            }




                            return str
                        },
                        rich: {
                            a: {
                                borderColor: '#0b9688',
                                borderWidth: 1,
                                // borderRadius: [0, 10, 10, 0],
                                // padding: [3.5, 10, 1, -13],
                                padding: [3, 5, 1, 3],

                                backgroundColor: '#0b9688',
                            },
                            b: {
                                borderColor: '#19394e',
                                borderWidth: 1,
                                // borderRadius: [0, 10, 10, 0],
                                // padding: [3.5, 10, 1, -13],
                                padding: [3, 5, 1, 3],

                                backgroundColor: '#19394e',
                            },
                            // c: {
                            //     borderColor: '#00E8FF',
                            //     borderWidth: 1,
                            //     // borderRadius: [0, 10, 10, 0],
                            //     // padding: [3.5, 10, 1, -13],
                            //     padding: [3, 5, 1, 3],

                            //     backgroundColor: 'rgba(0, 232, 255, 0.7)',
                            // }, 
                            // d: {
                            //     borderColor: '#1A90FF',
                            //     borderWidth: 1,
                            //     // borderRadius: [0, 10, 10, 0],
                            //     // padding: [3.5, 10, 1, -13],
                            //     padding: [3, 5, 1, 3],

                            //     backgroundColor: 'rgba(26, 144, 255, 0.7)',
                            // },
                            e: {
                                width: 350,
                                align: 'right',
                                color: '#2fc9ff',
                                fontSize: 22
                            },
                            title: {
                                padding: [0, 0, 0, 3],

                            },
                        },
                        align: 'left',
                    },
                    data: chartData
                },
                series: [
                    // {
                    //    type: 'pictorialBar',
                    //    symbol: 'rect',
                    //    // symbolRotate: 30,
                    //    symbolRepeat: 'fixed',
                    //    symbolClip: true,
                    //    symbolOffset: [0, -1.5],
                    //    // symbolSize: [2, 12],
                    //    // symbolMargin: '3',
                    //    itemStyle: {
                    //       normal: {
                    //          color: '#000726',
                    //       },
                    //    },
                    //    label: {
                    //       show: true,
                    //       color: '#fff',
                    //       fontFamily: 'Bebas',
                    //       fontSize: 12,
                    //       offset: [-9, -1.5],
                    //       position: 'right',
                    //       formatter(params) {
                    //          let result = ''
                    //          switch (params.dataIndex) {
                    //             case 0:
                    //                result = '{img|}{index0|' + params.value + '}{unit|件}'
                    //                break
                    //             case 1:
                    //                result = '{img|}{index1|' + params.value + '}{unit|件}'
                    //                break
                    //             case 2:
                    //                result = '{img|}{index2|' + params.value + '}{unit|件}'
                    //                break
                    //             default:
                    //                result = '{img|}{index3|' + params.value + '}{unit|件}'
                    //                break
                    //          }
                    //          return result
                    //       },
                    //       rich: {
                    //          img: {
                    //             height: 18,
                    //             width: 20,
                    //             // backgroundColor: { image: arrow },这个图片自己切，这里上传不了（加了一个尾巴的形状）
                    //          },
                    //          unit: {
                    //             color: '#fff',
                    //             fontSize: 11,
                    //          },
                    //          index0: {
                    //             color: '#ee6f7c',
                    //             fontFamily: 'Bebas',
                    //             padding: [-2, 2, 0, 0],
                    //          },
                    //          index1: {
                    //             color: '#ffcf5f',
                    //             fontFamily: 'Bebas',
                    //             padding: [-2, 2, 0, 0],
                    //          },
                    //          index2: {
                    //             color: '#00e8ff',
                    //             fontFamily: 'Bebas',
                    //             padding: [-2, 2, 0, 0],
                    //          },
                    //          index3: {
                    //             color: '#fff',
                    //             fontFamily: 'Bebas',
                    //             padding: [-2, 2, 0, 0],
                    //          },
                    //       },
                    //    },
                    //    symbolBoundingData: Math.max(...chartData.map((item) => item.value)) * 1.3,
                    //    data: chartData.map((item) => item.value),
                    //    z: 2,
                    // },
                    {
                        type: 'bar',
                        barWidth: 10,
                        // 圆角
                        // data: chartData.map((item) => item.value),
                        data: [
                            { name: 'xxx事项', value: 245, itemStyle: { color: '#f74d4f' } },
                            { name: 'xxx事项', value: 211, itemStyle: { color: '#f1bc70' } },
                            { name: 'xxx事项', value: 165, itemStyle: { color: '#0193f2' } },
                            { name: 'xxx事项', value: 145, itemStyle: { color: '#698aab' } },
                            { name: 'xxx事项', value: 128, itemStyle: { color: '#698aab' } },


                        ],
                        itemStyle: {
                            normal: {
                                // color: '#00F7F0',
                                borderRadius: 2
                            },
                        },
                        z: 1,
                    },
                    //         {
                    //     type: 'bar',
                    //     barWidth: 10,
                    //     // 圆角
                    //     data: chartData.map((item) => item.value),
                    //     itemStyle: {
                    //         normal: {
                    //             color: '#00F7F0',
                    //             borderRadius: 2
                    //         },
                    //     },
                    //     z: 1,
                    // },
                    {
                        type: 'bar',
                        barGap: '-125%', // 设置外框粗细
                        data: chartData.map((items) => Math.max(...chartData.map((item) => item.value)) * 1.3),
                        barWidth: 15,
                        itemStyle: {
                            color: '#1b3a4f',
                            borderColor: '#1c3a4e',
                            borderRadius: 2

                        },
                        z: 0,
                    },
                ],
            };
            myChart.setOption(option, true)
            console.log(option, 'option1option1option1')
            window.addEventListener('resize', () => {
                myChart.resize()
            })
        },
        init1() {
            const rankChart = document.getElementById('box1')
            const myChart = this.$echarts.init(rankChart)
            let dataList = [
                [
                    'No.1 XXXX有限责任公司',
                    'No.2 XXXXXXXX有限责任公司',
                    'No.2 XXXXXX有限责任公司',
                    'No.4 XX有限责任公司',
                    'No.5 XXXXXX有限责任公司'
                ],
                [99, 92, 81, 31, 21],
            ];

            // let barWidth = 25;
            // let labelPositionY = -60;

            let colors = [
                ['#d18843', '#c97b33', '#9c571c', '#bc732e'],
                ['#1d87ff', '#2182f7', '#0f69c9', '#0f87ff']
            ];

            let seriesDatas = [];
            let seriesDatasLeft = [];
            let seriesDatasRight = [];
            dataList[0].forEach((item, index) => {
                let color = index > 2 ? colors[1] : colors[0];
                let itemStyleColor = {
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    type: 'linear',
                    global: false,
                    colorStops: [
                        {
                            offset: 0,
                            color: color[0],
                        },
                        // {
                        //     offset: 0.5,
                        //     color: color[1],
                        // },
                        // {
                        //     offset: 0.5,
                        //     color: color[2],
                        // },
                        // {
                        //     offset: 1,
                        //     color: color[3],
                        // },
                    ]
                };
                let data = {
                    name: item,
                    value: dataList[1][index],
                    itemStyle: {
                        color: itemStyleColor
                    },
                    label: {
                        rich: {
                            cc: {
                                color: color[3]
                            }
                        },
                    }
                };
                let dataLeft = {
                    name: item,
                    value: 1,
                    itemStyle: {
                        color: itemStyleColor
                    }
                };
                let dataRight = {
                    name: item,
                    value: dataList[1][index],
                    itemStyle: {
                        color: color[3]
                    }
                };
                seriesDatas.push(data);
                seriesDatasLeft.push(dataLeft);
                seriesDatasRight.push(dataRight);
            })


            let option = {
                backgroundColor: '#023142',
                grid: {
                    left: '6%',
                    right: '4%',
                    bottom: '3%',
                    top: '10%',
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#B5B5B5',
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: ['#5c6368'],
                                width: 2,
                                type: 'dotted',
                            },
                        },
                        axisLabel: {
                            show: false,
                            textStyle: {
                                fontFamily: 'agencyr',
                                color: '#FFF',
                            },
                            fontSize: 40,
                        },
                    },
                ],
                yAxis: [
                    {
                        type: 'category',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#fff',
                                width: 3,
                            },
                        },
                        name: '亿kWh',
                        nameLocation: 'start',
                        nameTextStyle: {
                            color: '#fff',
                            fontSize: 35,
                            padding: [0, 0, 20, 100],
                        },
                        inverse: true,
                        axisLabel: {
                            show: false,
                            textStyle: {
                                color: '#fff',
                                padding: [10, 0, 0, 0],
                                fontSize: 35,
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        data: dataList[0],
                    },
                ],
                series: [
                    {
                        name: '柱1',
                        type: 'bar',
                        barWidth: 25,
                        z: 11,
                        label: {
                            show: true,
                            position: [0, -60],
                            formatter: ['{bb|{b}  }', '{cc|{c}%}'].join(''),
                            rich: {
                                bb: {
                                    color: '#d4f1ff',
                                    fontSize: 40,
                                    fontFamily: 'agencyr',
                                },
                                cc: {
                                    color: '#fff',
                                    fontSize: 40,
                                    fontFamily: 'agencyr',
                                }
                            }
                        },
                        data: seriesDatas,
                    },
                    // {
                    //   name: '顶1',
                    //   type: 'pictorialBar',
                    //   symbol: 'diamond',
                    //   symbolSize: [barWidth / 2, barWidth],
                    //   symbolOffset: [barWidth / 4, 0],
                    //   symbolPosition: 'end',
                    //   z: 12,
                    //   data: seriesDatasRight,
                    // },
                    // {
                    //   name: '底',
                    //   type: 'pictorialBar',
                    //   symbol: 'diamond',
                    //  symbolSize: [barWidth / 2, barWidth],
                    //   symbolOffset: [-barWidth / 4, 0],
                    //   z: 1,
                    //   data: seriesDatasLeft,
                    // },
                ],
            };
            console.log(seriesDatas, 'seriesDatas')
            myChart.setOption(option, true)
            console.log(option, 'option')
            window.addEventListener('resize', () => {
                myChart.resize()
            })
        },
        inin3() {
            const rankChart = document.getElementById('box2')
            const myChart = this.$echarts.init(rankChart)
            let angle = 0
            // 创建线性渐变对象
            function createLinearGradient(x0, y0, x1, y1, colorStops) {
                return this.$echarts.graphic.LinearGradient(x0, y0, x1, y1, colorStops);
            }
            // 复制代码
            const chartData = [
                {
                    value: 3627,
                    name: "供电到户",
                },
                {
                    value: 3627,
                    name: "高压合表",
                },
                {
                    value: 38,
                    name: "临电小区",
                },

            ];
            const colorList = ['#88D9FF', '#0092FF', '#81EDD2'];
            const sum = chartData.reduce((per, cur) => per + cur.value, 0);
            const gap = (1 * sum) / 100;
            const pieData1 = [];
            // const pieData2 = [];
            const gapData = {
                name: "",
                value: gap,
                itemStyle: {
                    color: "transparent",
                },
            };

            //图标位置显示
            // let lefts = ["4%", "4%", "4%", "80%", "80%", "80%"];
            // let tops = ["24%", "37%", "55%", "24%", "37%", "55%"];
            // let legendData = [];
            let total = 0;
            chartData.forEach((item) => {
                total += item.value;
            });

            for (let i = 0; i < chartData.length; i++) {
                if (i == 0) {

                }
                // 第一圈数据
                pieData1.push({
                    ...chartData[i],
                    itemStyle: {
                        borderRadius: 10,
                        //   itemStyle: {
                        //     normal: {
                        //       // 使用第一个颜色为起始颜色，第三个颜色为结束颜色，中间的颜色将渐变过渡
                        //       color: createLinearGradient(0, 0, 0, 1, [
                        //         { offset: 0, color: colorList[0] },
                        //         { offset: 1, color: colorList[2] }
                        //       ])
                        //     }
                        //   }
                    },
                });
                pieData1.push(gapData);
            }

            let option = {
                //   backgroundColor: '#ccc',
                title: {
                    text: "重点人员",
                    subtext: "353",
                    x: "49.5%",
                    y: "43%",
                    itemGap: 15,
                    textStyle: {
                        color: "#999",
                        fontSize: 30,
                        fontWeight: "bold",
                    },
                    subtextStyle: {

                        color: "#333",
                        fontSize: 24,
                        fontWeight: "bold",
                    },
                    textAlign: 'center'
                },

                // backgroundColor: "#0F141B",
                tooltip: {
                    show: true,
                    backgroundColor: "rgba(0, 0, 0,.8)",
                    textStyle: {
                        color: "#fff",
                    },
                },
                // legend: legendData,
                grid: {
                    top: 30,
                    right: 20,
                    bottom: 10,
                    left: 10,
                },
                //   color: colorList,
                series: [

                    // 数据圈
                    {
                        name: '',
                        type: 'pie',
                        roundCap: true,
                        radius: ['30%', '42%'],
                        center: ['50%', '50%'],
                        labelLine: {
                            showAbove: true,
                            show: true,
                            lineStyle: {
                                width: 3,
                            },
                            normal: {
                                length: 20, // 指示线长度
                                length2: 40
                            },
                        },
                        label: {
                            show: true,
                            // 字体颜色自适应
                            // color: 'inherit',
                            // formatter: function (params) {
                            //     console.log(params,'params');
                            //     if (params.name !== '') {
                            //         // return '{color' + params.dataIndex + '|' + params.name + '}\n{color' + params.dataIndex + '|' + params.value + '人}'
                            //         return  params.name + '\n' + params.value + '人'
                            //     }
                            //     // return '{color'+params.dataIndex+'|'+params.name+'}'

                            // },
                            textStyle: {
                                fontSize: '18',
                                fontWeight: 'bold',
                                color: '#fff'
                            },
                            rich: {
                                color0: {
                                    color: '#D56383',
                                },
                                color1: {
                                    color: '#00FF95',
                                },
                                color3: {
                                    color: '#FFE900',
                                },
                                color2: {
                                    color: '#F5B157',
                                },
                                color4: {
                                    color: '#1DA7FF',
                                },
                                color5: {
                                    color: '#2967EA'
                                }
                            },
                        },

                        data: [
                            {
                                value: 3627,
                                name: "供电到户",
                                label: {
                                    formatter: function (params) {
                                        console.log(params, 'params');
                                        if (params.name !== '') {
                                            return '{color' + params.dataIndex + '|' + params.name + '}\n{color' + params.dataIndex + '|' + params.value + '人}'
                                        }
                                    },
                                    rich: {
                                        color: {
                                            color: '#FFCB71',
                                        },
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        borderRadius: 5,
                                        color: '#FFCB71'
                                    }
                                },
                            },
                            {
                                value: 72,
                                name: "",
                                itemStyle: {
                                    color: "transparent",
                                },
                            },
                            {
                                value: 3627,
                                name: "高压合表",
                                label: {
                                    formatter: function (params) {
                                        console.log(params, 'params');
                                        if (params.name !== '') {
                                            return '{color' + params.dataIndex + '|' + params.name + '}\n{color' + params.dataIndex + '|' + params.value + '人}'
                                        }

                                    },
                                    rich: {
                                        color: {
                                            color: '#ff918c',
                                        },
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        borderRadius: 5,
                                        color: '#ff918c'
                                    }
                                },
                            },
                            {
                                value: 72,
                                name: "",
                                itemStyle: {
                                    borderRadius: 5,
                                    color: "transparent",
                                },
                            },
                            {
                                value: 3627,
                                name: "临电小区",
                                label: {
                                    formatter: function (params) {
                                        console.log(params, 'params');
                                        if (params.name !== '') {
                                            return '{color' + params.dataIndex + '|' + params.name + '}\n{color' + params.dataIndex + '|' + params.value + '人}'
                                        }

                                    },
                                    rich: {
                                        color: {
                                            color: '#00Fafc',
                                        },
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        borderRadius: 5,

                                        color: '#00Fafc'
                                    }
                                },
                            },
                            {
                                value: 72,
                                name: "",
                                itemStyle: {
                                    color: "transparent",
                                },
                            },
                        ]
                    },
                    // 内圈
                    {
                        type: 'pie',
                        center: ['50%', '50%'],
                        radius: ['20%', '30%'],
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        itemStyle: {
                            color: '#57A8E5 '
                        },
                        silent: true,
                        data: [
                            {
                                value: 100,
                                name: ''
                            }
                        ]
                    }
                ],
            };

            //获取圆上某点的坐标(x0、y0表示坐标，r半径，angle角度)
            // function getCirclePoint(x0, y0, r, angle) {
            //   let x1 = x0 + r * Math.cos((angle * Math.PI) / 180)
            //   let y1 = y0 + r * Math.sin((angle * Math.PI) / 180)
            //   return {
            //     x: x1,
            //     y: y1
            //   }
            // }

            // let timer
            // function play() {
            //   angle += 3
            //   option && myChart.setOption(option)
            //   if (timer) return
            //   timer = setTimeout(() => {
            //     requestAnimationFrame(play)
            //     timer = null
            //   }, 28)
            // }

            //过渡完成后开始动画
            // myChart.on('finished', () => {
            //   play()
            // })
            myChart.setOption(option, true)
            console.log(option, 'option')
            window.addEventListener('resize', () => {
                myChart.resize()
            })
        }
    },
    computed: {
        cssVars() {
            return {
                "--fontColor": this.fontColor,
            };

        },

    }
};
</script>

<style lang="scss" scoped>
h3 {
    color: var(--fontColor);
    background: var(--fontColor);

}

#box {
    // transform: translateY(30px);
    width: 600px;
    height: 400px;
    border: 1px solid #fff;
}

#box1 {
    // transform: translateY(30px);
    width: 600px;
    height: 400px;
    border: 1px solid #fff;
    display: in;
}

#box2 {
    // transform: translateY(30px);
    width: 600px;
    height: 400px;
    border: 1px solid #fff;
    position: absolute;
    flex-direction: column;
    transform: scale();
}

#box3 {
    // width: 820px;
    height: 800px;
    display: flex;
    justify-content: space-between;

}
</style>