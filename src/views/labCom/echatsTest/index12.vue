<template>
    <div style="background: #05232b;height: 3000px;">
        <div id="diagram" class="diagram"></div>
        <el-button @click="resetEcharts">回退</el-button>
        <div id="diagrams" class="diagrams"></div>

        <!-- <div id="box"></div> -->
        <!-- <div id="box1"></div> -->

        <!-- <div id="box2"></div> -->

        <!-- <div id="box3"></div> -->

    </div>
</template>

<script>
// import datas from './data.json'
import * as echarts from 'echarts';
import 'echarts-gl';
import bdz2 from '@/assets/220kv.png'
import bdz1 from '@/assets/110kv拷贝.png'
import bdz3 from '@/assets/35kv拷贝8.png'
import { data } from '@/mock/fhfMock';
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
            fontColor: 'red',
            data: [],
            link: [],
            myChart: null,
            row: {}
        };
    },

    mounted() {
        // console.log(datas.data.filter((item, index) => item.status == 3)[0].powerList, 'dataaaaaaaaa')
        // this.dataset()
        // this.init()
        // this.init1()
        // this.inin3()
        // this.glInit()
        let datas = {
            "data": [
                { "name": "220", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz2 },
                { "name": "110-1", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz1, parent: '220' },
                { "name": "110-2", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz1, parent: '220' },
                { "name": "110-3", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz1, parent: '220' },
                { "name": "110-4", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz1, parent: '220' },
                { "name": "1-35-1", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-1' },
                { "name": "1-35-2", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-1' },
                { "name": "1-35-3", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-1' },
                { "name": "1-35-4", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-1' },
                { "name": "1-35-5", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-1' },
                { "name": "1-35-6", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-1' },
                { "name": "1-35-7", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-1' },
                { "name": "1-35-8", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-1' },
                { "name": "1-35-9", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-1' },
                { "name": "1-35-10", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-1' },
                { "name": "1-35-11", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-1' },
                { "name": "2-35-1", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-2' },
                { "name": "2-35-2", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-2' },
                { "name": "2-35-3", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-2' },
                { "name": "2-35-4", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-2' },
                { "name": "3-35-1", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-3' },
                { "name": "3-35-2", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-3' },
                { "name": "3-35-3", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-3' },
                { "name": "3-35-4", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-3' },
                { "name": "4-35-1", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-4' },
                { "name": "4-35-2", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-4' },
                { "name": "4-35-3", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-4' },
                { "name": "4-35-4", "color": "#ff756e", "symbolSize": 50, "symbol": "image://" + bdz3, parent: '110-4' }
            ],
            "link": [
                { "source": "220", "target": "110-1", "name": "" },
                { "source": "220", "target": "110-2", "name": "" },
                { "source": "220", "target": "110-3", "name": "" },
                { "source": "220", "target": "110-4", "name": "" },
                { "source": "110-1", "target": "1-35-1", "name": "" },
                { "source": "110-1", "target": "1-35-2", "name": "" },
                { "source": "110-1", "target": "1-35-3", "name": "" },
                { "source": "110-1", "target": "1-35-4", "name": "" },
                { "source": "110-1", "target": "1-35-5", "name": "" },
                { "source": "110-1", "target": "1-35-6", "name": "" },
                { "source": "110-1", "target": "1-35-7", "name": "" },
                { "source": "110-1", "target": "1-35-8", "name": "" },
                { "source": "110-1", "target": "1-35-9", "name": "" },
                { "source": "110-1", "target": "1-35-10", "name": "" },
                { "source": "110-1", "target": "1-35-11", "name": "" },
                { "source": "110-2", "target": "2-35-1", "name": "" },
                { "source": "110-2", "target": "2-35-2", "name": "" },
                { "source": "110-2", "target": "2-35-3", "name": "" },
                { "source": "110-2", "target": "2-35-4", "name": "" },
                { "source": "110-3", "target": "3-35-1", "name": "" },
                { "source": "110-3", "target": "3-35-2", "name": "" },
                { "source": "110-3", "target": "3-35-3", "name": "" },
                { "source": "110-3", "target": "3-35-4", "name": "" },
                { "source": "110-4", "target": "4-35-1", "name": "" },
                { "source": "110-4", "target": "4-35-2", "name": "" },
                { "source": "110-4", "target": "4-35-3", "name": "" },
                { "source": "110-4", "target": "4-35-4", "name": "" },
            ]
        }
        this.dataList = datas.data
        this.linkData = datas.link
        this.data = [...this.dataList]
        this.link = [...this.linkData]
        this.drawChart()
        this.drawChartDataClick()

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
        drawChartDataClick(data, node) {
            this.myCharts = echarts.init(document.getElementById("diagrams"));
            let color1 = '#1c87c0'
            let param = {
                "symbol": "image://" + bdz2,
                "symbolSize": 100,
                "label": {
                    color: '#fff',
                    "position": "bottom",
                    fontSize: 10
                }
            }
            let datas = [
                {
                    "name": "雄州站",
                    "value": [
                        250,
                        800
                    ],

                },

                {
                    "name": "大营站",
                    "value": [
                        190,
                        1200
                    ],
                },



                {
                    "name": "雄县站",
                    "value": [
                        190,
                        400
                    ],
                },

                {
                    "name": "东开站",
                    "value": [
                        310,
                        1200
                    ],
                },
                {
                    "name": "温泉城站",
                    "value": [
                        310,
                        400
                    ],
                },



                {
                    "name": "荷露站",
                    "value": [
                        360,
                        1100
                    ],
                },

                {
                    "name": "南留站",
                    "value": [
                        360,
                        500
                    ],
                },

                {
                    "name": "奥威站",
                    "value": [
                        140,
                        1120
                    ],
                },
                {
                    "name": "羊定站",
                    "value": [
                        140,
                        480
                    ],
                },

                {
                    "name": "龙湾站",
                    "value": [
                        380,
                        780
                    ],
                },
                {
                    "name": "昝岗一号移动站",
                    "value": [
                        120,
                        780
                    ],
                },
            ]
            let dataThree = [
                // 大营站下属
                {
                    "name": "板东站",
                    "value": [
                        150,
                        1400
                    ],

                },
                {
                    "name": "北沙站",
                    "value": [
                        170,
                        1550
                    ],
                },
                {
                    "name": "米北站",
                    "value": [
                        230,
                        1400
                    ],
                },
                {
                    "name": "东阳站",
                    "value": [
                        210,
                        1550
                    ],
                },

                // 雄县站下属
                {
                    "name": "雄县站1",
                    "value": [
                        150,
                        100
                    ],

                },
                {
                    "name": "雄县站2",
                    "value": [
                        170,
                        250
                    ],
                },
                {
                    "name": "雄县站3",
                    "value": [
                        230,
                        100
                    ],
                },
                {
                    "name": "雄县站4",
                    "value": [
                        210,
                        250
                    ],
                },


                // 温泉城站下属
                {
                    "name": "温泉城站1",
                    "value": [
                        270,
                        100
                    ],

                },
                {
                    "name": "温泉城站2",
                    "value": [
                        290,
                        250
                    ],
                },
                {
                    "name": "温泉城站3",
                    "value": [
                        350,
                        100
                    ],
                },
                {
                    "name": "温泉城站4",
                    "value": [
                        330,
                        250
                    ],
                },



                // 东开站下属
                {
                    "name": "东开站1",
                    "value": [
                        270,
                        1400
                    ],

                },
                {
                    "name": "东开站2",
                    "value": [
                        290,
                        1550
                    ],
                },
                {
                    "name": "东开站3",
                    "value": [
                        350,
                        1400
                    ],
                },
                {
                    "name": "东开站4",
                    "value": [
                        330,
                        1550
                    ],
                },
                // 奥威站下属
                {
                    "name": "奥威站1",
                    "value": [
                        50,
                        1050
                    ],

                },
                {
                    "name": "奥威站2",
                    "value": [
                        50,
                        1210
                    ],
                },
                {
                    "name": "奥威站3",
                    "value": [
                        90,
                        1000
                    ],
                },
                {
                    "name": "奥威站4",
                    "value": [
                        90,
                        1250
                    ],
                },


                // 荷露站下属
                {
                    "name": "荷露站1",
                    "value": [
                        400,
                        1000
                    ],

                },
                {
                    "name": "荷露站2",
                    "value": [
                        400,
                        1250
                    ],
                },
                {
                    "name": "荷露站3",
                    "value": [
                        440,
                        1050
                    ],
                },
                {
                    "name": "荷露站4",
                    "value": [
                        440,
                        1200
                    ],
                },
                //龙湾站下属
                {
                    "name": "龙湾站1",
                    "value": [
                        440,
                        650
                    ],

                },
                {
                    "name": "龙湾站2",
                    "value": [
                        440,
                        900
                    ],
                },
                {
                    "name": "龙湾站3",
                    "value": [
                        480,
                        700
                    ],
                },
                {
                    "name": "龙湾站4",
                    "value": [
                        480,
                        850
                    ],
                },

                // 昝岗一号移动站站下属

                {
                    "name": "昝岗站1",
                    "value": [
                        20,
                        690
                    ],

                },
                {
                    "name": "昝岗站2",
                    "value": [
                        20,
                        850
                    ],
                },
                {
                    "name": "昝岗站3",
                    "value": [
                        60,
                        650
                    ],
                },
                {
                    "name": "昝岗站4",
                    "value": [
                        60,
                        900
                    ],
                },



                // 羊定站下属
                {
                    "name": "羊定站1",
                    "value": [
                        20,
                        250
                    ],

                },
                {
                    "name": "羊定站2",
                    "value": [
                        40,
                        400
                    ],
                },
                {
                    "name": "羊定站3",
                    "value": [
                        100,
                        250
                    ],
                },
                {
                    "name": "羊定站4",
                    "value": [
                        80,
                        400
                    ],
                },
                // 南留站下属
                {
                    "name": "南留站1",
                    "value": [
                        400,
                        250
                    ],

                },
                {
                    "name": "南留站2",
                    "value": [
                        420,
                        400
                    ],
                },
                {
                    "name": "南留站3",
                    "value": [
                        480,
                        250
                    ],
                },
                {
                    "name": "南留站4",
                    "value": [
                        460,
                        400
                    ],
                },

            ]
            let dataTwo = datas.map(item => {
                if (item.name === '雄州站') {
                    return { ...item, x: 100, y: 0, ...param };
                } else {
                    param.symbolSize = 50
                    param.symbol = "image://" + bdz1
                    return { ...item, ...param };
                }
                // return item;
            });


            dataThree = dataThree.map(item => {
                param.symbolSize = 40
                param.symbol = "image://" + bdz3
                return { ...item, ...param };
            })
            datas = [...dataTwo, ...dataThree]

            let lineDataStyle = {
                symbol: 'none',
                "label": {
                    color: '#fff',
                    "position": "middle",
                    fontSize: 10
                },
                lineStyle: {
                    type: 'solid',
                    width: 2,
                    shadowColor: color1,
                    color: color1,
                    shadowBlur: 25,
                }
            }
            let lineData = [
                // 雄奥线
                [
                    {
                        "coord": [230, 850],
                        "name": "雄奥线",

                    },
                    {
                        "coord": [
                            140,
                            850
                        ],

                    }
                ],
                [
                    {
                        "coord": [
                            140,
                            850
                        ],

                    },
                    {
                        "coord": [
                            140,
                            1000
                        ],


                    },

                ],
                // 雄羊线
                [
                    {
                        "coord": [
                            230,
                            700
                        ],
                        "name": "雄羊线",

                    },
                    {
                        "coord": [
                            140,
                            700
                        ],

                    }
                ],
                [
                    {
                        "coord": [
                            140,
                            700
                        ],

                    },
                    {
                        "coord": [
                            140,
                            550
                        ],


                    },

                ],
                // 雄大线
                [
                    {
                        "coord": [
                            230,
                            860
                        ],
                        "name": "雄大线",

                    },
                    {
                        "coord": [
                            230,
                            1200
                        ],

                    }
                ],
                [
                    {
                        "coord": [
                            230,
                            1200
                        ],
                        symbol: 'none',
                        // "name": "雄东Ⅰ线/Ⅱ线",

                    },
                    {
                        "coord": [
                            205,
                            1200
                        ],


                    },

                ],


                // 雄雄I线/II线
                [
                    {
                        "coord": [
                            230,
                            700
                        ],
                        "name": "雄雄I线/II线",

                    },
                    {
                        "coord": [
                            230,
                            400
                        ],

                    }
                ],
                [
                    {
                        "coord": [
                            230,
                            400
                        ],

                    },
                    {
                        "coord": [
                            210,
                            400
                        ],


                    },

                ],


                // 雄东I线/II线
                [
                    {
                        "coord": [
                            270,
                            860
                        ],
                        // "name": "xx同意",
                        "name": "雄东Ⅰ线/Ⅱ线",


                    },
                    {
                        "coord": [
                            270,
                            1200
                        ],

                    },

                ],
                [
                    {
                        "coord": [
                            270,
                            1200
                        ],
                        // "name": "xx同意",


                    },
                    {
                        "coord": [
                            295,
                            1200
                        ],

                    }
                ],


                // 雄温线
                [
                    {
                        "coord": [
                            270,
                            690
                        ],
                        "name": "雄温线",


                    },
                    {
                        "coord": [
                            270,
                            400
                        ],

                    },

                ],
                [
                    {
                        "coord": [
                            270,
                            400
                        ],
                        // "name": "xx同意",


                    },
                    {
                        "coord": [
                            290,
                            400
                        ],

                    }
                ],



                // 雄露线
                [
                    {
                        "coord": [
                            270,
                            850
                        ],
                        "name": "雄露线",

                    },
                    {
                        "coord": [
                            360,
                            850
                        ],

                    },

                ],
                [
                    {
                        "coord": [
                            360,
                            850
                        ],
                        // "name": "xx同意",


                    },
                    {
                        "coord": [
                            360,
                            980
                        ],


                    }
                ],

                // 雄南线
                [
                    {
                        "coord": [
                            270,
                            700
                        ],
                        "name": "雄南线",

                    },
                    {
                        "coord": [
                            360,
                            700
                        ],

                    },

                ],
                [
                    {
                        "coord": [
                            360,
                            700
                        ],

                    },
                    {
                        "coord": [
                            360,
                            600
                        ],


                    }
                ],


                // 雄龙I线/雄龙线II线
                [
                    {
                        "coord": [
                            280,
                            780
                        ],
                        "name": "雄龙I线/雄龙线II线",

                    },
                    {
                        "coord": [
                            360,
                            780
                        ],

                    },

                ],
                // 雄昝线
                [
                    {
                        "coord": [
                            220,
                            780
                        ],
                        "name": "雄昝线",

                    },
                    {
                        "coord": [
                            140,
                            780
                        ],

                    },

                ],
            ]
            lineData.forEach((item, index) => {
                lineData[index] = item.map(e => {
                    return { ...e, ...lineDataStyle };
                });
            });
            let option = {
                "xAxis": {
                    "show": true,
                    "type": "value",
                    max: 500
                },
                "yAxis": {
                    "show": true,
                    "type": "value",
                    max: 1600
                },
                dataZoom: [
                    {
                        type: 'inside'
                    }
                ],
                "series": [
                    {
                        "type": "graph",
                        "coordinateSystem": "cartesian2d",
                        "symbolSize": 32,
                        "roam": true,
                        "label": {
                            "show": true,
                            "position": "bottom"
                        },
                        "edgeSymbol": [
                            "circle",
                            "arrow"
                        ],
                        "edgeSymbolSize": [
                            1,
                            5
                        ],
                        "edgeLabel": {
                            "fontSize": 12
                        },
                        "data": datas
                    },
                    {
                        "type": "lines",
                        "coordinateSystem": "cartesian2d",
                        "markLine": {
                            "data": lineData
                        }
                    }
                ]
            }
            this.myCharts.setOption(option);

        },
        resetEcharts(row) {
            this.row = row
            console.log(this.row, 'row')
            this.data.forEach(e => {
                if (e.parent == '220') {
                    this.data = this.dataList
                    this.link = this.linkData
                }
            })
            if (this.data.find(item => item.parent == '220')) {

            }
            this.myChart.dispose()
            this.drawChart()

        },
        drawChart() {
            // 初始化echarts实例
            this.myChart = echarts.init(document.getElementById("diagram"));
            this.myChart.on('click', (param) => {
                if (param.dataType == 'node') {
                    console.log('点击了节点', param)
                    // console.log(param.data.name)
                    let node = param.data.name
                    // this.dataList = [...this.data]
                    this.data = this.dataList.filter(item => item.name == node || item.parent == node)
                    if (this.data.length == 1) {
                        this.dataList.forEach(e => {
                            if (e.name == this.data[0].parent) {
                                this.data.push(e)
                            }
                        })
                    }
                    // this.linkData = [...this.link]
                    this.link = this.linkData.filter(item => item.source == node || item.target == node)
                    console.log(this.data)
                    console.log(this.link)
                    this.myChart.dispose()
                    this.drawChart()

                } else {
                    console.log('点击了边', param)
                }
            });
            // 指定图表的配置项和数据
            let option = {
                // tooltip: {//设置提示框浮层
                //     show: false,   //默认显示
                //     showContent: true, //是否显示提示框浮层
                //     trigger: 'item',//触发类型，默认数据项触发
                //     triggerOn: 'click',//提示触发条件，mousemove鼠标移至触发，还有click点击触发
                //     alwaysShowContent: false, //默认离开提示框区域隐藏，true为一直显示
                //     showDelay: 0,//浮层显示的延迟，单位为 ms，默认没有延迟，也不建议设置。在 triggerOn 为 'mousemove' 时有效。
                //     hideDelay: 200,//浮层隐藏的延迟，单位为 ms，在 alwaysShowContent 为 true 的时候无效。
                //     enterable: false,//鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
                //     position: 'right',//提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。只在 trigger 为'item'的时候有效。
                //     confine: false,//是否将 tooltip 框限制在图表的区域内。外层的 dom 被设置为 'overflow: hidden'，或者移动端窄屏，导致 tooltip 超出外界被截断时，此配置比较有用。
                //     transitionDuration: 0.4,//提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。

                // },
                series: [{
                    type: 'graph', //关系图
                    name: "", //系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
                    layout: 'force', //图的布局，类型为力导图，'circular' 采用环形布局，见示例 Les Miserables
                    legendHoverLink: false,//是否启用图例 hover(悬停) 时的联动高亮。
                    hoverAnimation: false,//是否开启鼠标悬停节点的显示动画
                    coordinateSystem: null,//坐标系可选
                    xAxisIndex: 0, //x轴坐标 有多种坐标系轴坐标选项
                    yAxisIndex: 0, //y轴坐标
                    force: { //力引导图基本配置
                        //initLayout: ,//力引导的初始化布局，默认使用xy轴的标点
                        repulsion: 100,//节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
                        gravity: 0.01,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                        edgeLength: 100,//边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
                        layoutAnimation: false
                        //因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画，在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。
                    },
                    roam: true,//是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                    nodeScaleRatio: 0.6,//鼠标漫游缩放时节点的相应缩放比例，当设为0时节点不随着鼠标的缩放而缩放
                    draggable: false,//节点是否可拖拽，只在使用力引导布局的时候有用。
                    focusNodeAdjacency: true,//是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。

                    edgeSymbol: ['none', 'none'],//边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。默认不显示标记，常见的可以设置为箭头，如下：edgeSymbol: ['circle', 'arrow']
                    edgeSymbolSize: 10,//边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定。
                    itemStyle: {//===============图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                        normal: { //默认样式
                            label: {
                                show: true
                            },
                            borderType: 'solid', //图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
                            borderColor: 'rgba(42,245,255,0.79)', //设置图形边框为淡金色,透明度为0.4
                            borderWidth: 0, //图形的描边线宽。为 0 时无描边。
                            opacity: 1
                            // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5

                        },
                        emphasis: {//高亮状态
                            borderWidth: 2,
                            edgeLabel: {
                                show: false
                            },
                            itemStyle: {
                                shadowColor: 'red',
                                shadowBlur: 100
                            },

                        }
                    },
                    lineStyle: { //==========关系边的公用线条样式。
                        normal: {
                            color: 'green',
                            width: '2',
                            type: 'dashed', //线的类型 'solid'（实线）'dashed'（虚线）'dotted'（点线）
                            curveness: 0.2, //线条的曲线程度，从0到1
                            opacity: 12
                            // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
                        },
                        emphasis: {//高亮状态
                            color: 'red'

                        }
                    },
                    label: { //=============图形上的文本标签
                        normal: {
                            show: true,//是否显示标签。
                            position: 'bottom',//标签的位置。['50%', '50%'] [x,y]
                            textStyle: { //标签的字体样式
                                color: '#fff', //字体颜色
                                fontStyle: 'normal',//文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                                fontWeight: 'bolder',//'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                                fontFamily: 'sans-serif', //文字的字体系列
                                fontSize: 10, //字体大小
                            }
                        },
                        emphasis: {//高亮状态

                        }
                    },
                    edgeLabel: {//==============线条的边缘标签
                        normal: {
                            show: false
                        },
                        emphasis: {//高亮状态

                        }
                    },
                    data: this.data,
                    //别名为nodes   name:影响图形标签显示,value:影响选中后值得显示,category:所在类目的index,symbol:类目节点标记图形,symbolSize:10图形大小
                    //label:标签样式。


                    categories: [ //symbol name：用于和 legend 对应以及格式化 tooltip 的内容。 label有效
                    ],
                    links: this.link

                }]
            };
            this.myChart.setOption(option);
            console.log(option, '上图')


        },
        diagramEcharts() {
            // 调试页面回打印出点击的节点名称
            var chartDom = document.getElementById('diagram');
            var myChart = echarts.init(chartDom);
            var globalSeriesData = []; //用来存放被收起的某节点的子节点
            var seriesData = [
                {
                    name: "1110011",
                    x: 220,
                    y: 1,
                    symbolSize: 20,
                    category: "1110011",
                    value: 16,
                    symbol: "circle",
                    draggable: "false",
                },
                {
                    name: "1100007",
                    x: 270,
                    y: 420,
                    symbolSize: 18,
                    category: "1110011",
                    value: 1,
                    symbol: "circle",
                    draggable: "false",
                },
                {
                    x: 0,
                    y: 0,
                    name: "1100008",
                    symbolSize: 12,
                    category: "1100007",
                    value: 1,
                    symbol: "circle",
                    draggable: "false",
                },
                {
                    name: "1110018",
                    x: 0,
                    y: 0,
                    symbolSize: 18,
                    category: "1110011",
                    value: 5,
                    symbol: "circle",
                    draggable: "false",
                },
                {
                    x: 0,
                    y: 0,
                    name: "1110016",
                    symbolSize: 12,
                    category: "1110018",
                    value: 1,
                    symbol: "circle",
                    draggable: "false",
                },
                {
                    x: 0,
                    y: 0,
                    name: "1110099",
                    symbolSize: 8,
                    category: "1110016",
                    value: 1,
                    symbol: "circle",
                    draggable: "false",
                },
                {
                    x: 0,
                    y: 0,
                    name: "1110075",
                    symbolSize: 12,
                    category: "1110018",
                    value: 1,
                    symbol: "circle",
                    draggable: "false",
                },
                {
                    x: 0,
                    y: 0,
                    name: "1110070",
                    symbolSize: 8,
                    category: "1110075",
                    value: 1,
                    symbol: "circle",
                    draggable: "false",
                },
                {
                    name: "1110013",
                    x: 0,
                    y: 0,
                    symbolSize: 18,
                    category: "1110011",
                    value: 3,
                    symbol: "circle",
                    draggable: "false",
                },
                {
                    x: 0,
                    y: 0,
                    name: "1110089",
                    symbolSize: 12,
                    category: "1110013",
                    value: 2,
                    symbol: "circle",
                    draggable: "false",
                },
                {
                    x: 0,
                    y: 0,
                    name: "1110090",
                    symbolSize: 8,
                    category: "1110089",
                    value: 2,
                    symbol: "circle",
                    draggable: "false",
                },
                {
                    name: "1110012",
                    x: 0,
                    y: 0,
                    symbolSize: 18,
                    category: "1110011",
                    value: 1,
                    symbol: "circle",
                    draggable: "false",
                },
                {
                    x: 0,
                    y: 0,
                    name: "1110076",
                    symbolSize: 12,
                    category: "1110012",
                    value: 1,
                    symbol: "circle",
                    draggable: "false",
                },
                {
                    name: "1110088",
                    x: 0,
                    y: 0,
                    symbolSize: 18,
                    category: "1110011",
                    value: 1,
                    symbol: "circle",
                    draggable: "false",
                },
            ];

            var seriesLinks = [
                {
                    source: "1110011",
                    target: "1100007",
                },
                {
                    source: "1100007",
                    target: "1100008",
                },
                {
                    source: "1100008",
                    target: "1100009",
                },
                {
                    source: "1110011",
                    target: "1110018",
                },
                {
                    source: "1110018",
                    target: "1110016",
                },
                {
                    source: "1110016",
                    target: "1110099",
                },
                {
                    source: "1110018",
                    target: "1110075",
                },
                {
                    source: "1110075",
                    target: "1110070",
                },
                {
                    source: "1110075",
                    target: "1110003",
                },
                {
                    source: "1110011",
                    target: "1110013",
                },
                {
                    source: "1110013",
                    target: "1110089",
                },
                {
                    source: "1110089",
                    target: "1110090",
                },
                {
                    source: "1110011",
                    target: "1110012",
                },
                {
                    source: "1110012",
                    target: "1110076",
                },
                {
                    source: "1110076",
                    target: "1110004",
                },
                {
                    source: "1110011",
                    target: "1110088",
                },
            ];
            var seriesCategories = [
                {
                    name: "1110011",
                },
                {
                    name: "1100007",
                },
                {
                    name: "1110018",
                },
                {
                    name: "1110013",
                },
                {
                    name: "1110012",
                },
                {
                    name: "1110088",
                },
                {
                    name: "1100008",
                },
                {
                    name: "1110016",
                },
                {
                    name: "1110076",
                },
                {
                    name: "1110089",
                },
                {
                    name: "1110075",
                },
                {
                    name: "1100009",
                },
                {
                    name: "1110099",
                },
                {
                    name: "1110070",
                },
                {
                    name: "1110003",
                },
                {
                    name: "1110004",
                },
                {
                    name: "1110090",
                },
            ];

            var option = {
                title: {
                    text: "title",
                    bottom: "bottom",
                    left: "center",
                    textStyle: {
                        color: "#ccc",
                    },
                },
                tooltip: {
                    formatter: "{b}",
                },
                toolbox: {
                    show: true,
                    feature: {
                        restore: {
                            show: true,
                        },
                        saveAsImage: {
                            show: true,
                        },
                    },
                    right: 15,
                },
                animation: false,
                draggable: false,
                //backgroundColor: '#000000',
                //   animationDuration: 1000,
                //   animationEasingUpdate: "quinticInOut",
                series: [
                    {
                        //name: '', //用于tooltip的显示
                        type: "graph",
                        layout: "circular",
                        //   force: {
                        //     initLayout: "circular",
                        //     repulsion: 50,
                        //     gravity: 0.1,
                        //     edgeLength: 0.01,
                        //     layoutAnimation: true,
                        //   },
                        data: seriesData,
                        links: seriesLinks,
                        categories: seriesCategories,
                        roam: true,
                        label: {
                            show: true,
                            position: "top", //inside
                            color: '#fff',

                            // normal: {
                            //   show: true,
                            //   position: "top", //inside
                            //   formatter: "{b}",
                            //   fontSize: 16,
                            // //   fontStyle: "100",
                            // },
                        },
                        height: 3,
                        lineStyle: {
                            normal: {
                                width: 3,
                                color: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: "white", // 0% 处的颜色red
                                        },
                                        {
                                            offset: 1,
                                            color: "green", // 100% 处的颜色blue
                                        },
                                    ],
                                },
                                curveness: 0,
                                type: "solid",
                            },
                        },
                    },
                ],
            };

            myChart.setOption(option);

            //点击隐藏节点实现,定义数组globalSeriesData用来存储被隐藏的节点的子节点
            myChart.on("click", function (params) {
                console.log(params, 'params')
                if (params.dataType === "node") {
                    var deletedFlag = false; // 标记点击的此节点是否存在子节点,若不存在则说明可能在上次的操作中已经删除,这时就需要尝试把之前删除的节点重新添加进去
                    for (var i = seriesData.length - 1; i >= 0; i--) {
                        if (seriesData[i].category == params.name) {
                            if (seriesData[i].category != seriesData[i].name) {
                                //排除删除根元素的可能
                                deletedFlag = true;
                                for (var ii = seriesData.length - 1; ii >= 0; ii--) {
                                    //删除第一级节点的子节点
                                    if (seriesData[ii].category == seriesData[i].name) {
                                        for (var iii = seriesData.length - 1; iii >= 0; iii--) {
                                            //删除第二级节点的子节点
                                            if (seriesData[iii].category == seriesData[ii].name) {
                                                globalSeriesData.push(seriesData[iii]);
                                                seriesData.splice(iii, 1);
                                            }
                                        }
                                        globalSeriesData.push(seriesData[ii]);
                                        seriesData.splice(ii, 1);
                                    }
                                }
                                globalSeriesData.push(seriesData[i]);
                                seriesData.splice(i, 1); //删除该元素的第一级子节点,最多需删除三级
                            }
                        }
                    }
                    if (!deletedFlag) {
                        //这种情况下需要恢复该节点的子节点
                        var nodeChildren = []; //存放本次恢复的数据,然后将它们从globalSeriesData中删除
                        for (var n = globalSeriesData.length - 1; n >= 0; n--) {
                            if (params.name == globalSeriesData[n].category) {
                                //显示该节点第一级子节点
                                seriesData.push(globalSeriesData[n]);
                                nodeChildren.push(globalSeriesData[n]);
                                for (var nn = globalSeriesData.length - 1; nn >= 0; nn--) {
                                    if (globalSeriesData[n].name == globalSeriesData[nn].category) {
                                        //显示该节点第二级子节点
                                        seriesData.push(globalSeriesData[nn]);
                                        nodeChildren.push(globalSeriesData[nn]);
                                        for (var nnn = globalSeriesData.length - 1; nnn >= 0; nnn--) {
                                            if (
                                                globalSeriesData[nn].name == globalSeriesData[nnn].category
                                            ) {
                                                //显示该节点第三级子节点
                                                seriesData.push(globalSeriesData[nnn]);
                                                nodeChildren.push(globalSeriesData[nnn]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (nodeChildren.length > 0) {
                            for (var s = 0; s < nodeChildren.length; s++) {
                                for (var n = globalSeriesData.length - 1; n >= 0; n--) {
                                    if (nodeChildren[s].name == globalSeriesData[n].name) {
                                        globalSeriesData.splice(n, 1);
                                    }
                                }
                            }
                        }
                    }

                    // myChart.setOption(option);
                }
            });
            myChart.setOption(option, true)
            console.log(option, 'option')
            window.addEventListener('resize', () => {
                myChart.resize()
            })
        },
        // diagramEcharts() {
        //     // 调试页面回打印出点击的节点名称
        //     var chartDom = document.getElementById('diagram');
        //     var myChart = echarts.init(chartDom);
        //     // var person = "/asset/get/s/data-1561621393298-zQTG-TuDS.png";
        //     // var car = "/asset/get/s/data-1561621386236-0IGCc48l6.png";
        //     // var phone = "/asset/get/s/data-1561621379686-rZHoryrBV.png";
        //     var phone = "@/asset/logo.png";

        //     var size = 50; //节点大小


        //     var listdata = [];
        //     var links = [];
        //     var legendes = ["手机IMSI", "故障等级", "车牌号码", "故障等级"];
        //     var texts = [];


        //     var branch = {
        //         "蓄电池": "蓄电池",
        //         "空压机": "空压机",
        //         "制动": "制动",
        //         "烟雾探测": "烟雾探测",
        //         "列车方向": "列车方向",
        //         "司机室": "司机室",
        //         "紧急对讲": "紧急对讲",
        //         "速度": "速度",
        //         "受电弓": "受电弓"

        //     };

        //     var phoneIMSI = []


        //     var carNum = {

        //     }
        //     const relationShipCar = []

        //     var mainRelationShip = {
        //         故障等级: ""
        //     }

        //     function setDataPerson(json, n) {
        //         var i = 0;
        //         for (var p in json) {
        //             listdata.push({
        //                 x: 50,
        //                 y: 100,
        //                 "name": p,
        //                 "showName": json[p],
        //                 "symbol": phone,
        //                 "symbolSize": 70,
        //                 "category": n,

        //                 formatter: function (params) {
        //                     return params.data.showName
        //                 },
        //                 label: {
        //                     position: 'bottom'
        //                 }
        //             });
        //             i++;
        //         }
        //     }

        //     function setDataPhone(json, n) {
        //         var i = 0;
        //         for (var p in json) {
        //             listdata.push({
        //                 x: i * 50,
        //                 y: size + i * 10,
        //                 "name": p,
        //                 "showName": json[p],
        //                 "symbolSize": size,
        //                 "category": n,
        //                 formatter: function (params) {
        //                     return params.data.showName
        //                 },
        //                 label: {
        //                     position: 'bottom'
        //                 }
        //             });
        //             i++;
        //         }
        //     }

        //     function setLinkData(json, relarr, title) {
        //         if (relarr !== "") {
        //             var i = 0;
        //             for (var p in json) {
        //                 links.push({
        //                     "source": p,
        //                     "target": title,
        //                     "value": relarr[i],
        //                     lineStyle: {
        //                         normal: {
        //                             // text: relarr[i],
        //                             color: 'source'
        //                         }
        //                     }
        //                 });
        //                 i++;
        //             }
        //         } else {
        //             for (var p2 in json) {
        //                 links.push({
        //                     "source": p2,
        //                     "target": title,
        //                     "value": "",
        //                     lineStyle: {
        //                         normal: {
        //                             color: 'source'
        //                         }
        //                     }
        //                 });
        //             }
        //         }
        //     }

        //     for (var i = 0; i < legendes.length; i++) {
        //         texts.push({
        //             "name": legendes[i]
        //         })
        //     }

        //     setDataPhone(branch, 0);

        //     setDataPerson(mainRelationShip, 3);

        //     setLinkData(branch, phoneIMSI, legendes[3]);
        //     setLinkData(carNum, relationShipCar, legendes[3]);

        //   let  option = {
        //         title: {
        //             text: "关系图绑定点击事件",
        //             top: "top",
        //             left: "left",
        //             textStyle: {
        //                 color: '#000000'
        //             }
        //         },
        //         tooltip: {
        //             formatter: '{b}'
        //         },

        //         backgroundColor: '#f7f7f7',
        //         legend: {
        //             data: legendes,
        //             textStyle: {
        //                 color: '#000000'
        //             },
        //             icon: 'circle',
        //             type: 'scroll',
        //             orient: 'vertical',
        //             left: 10,
        //             top: 20,
        //             bottom: 20,
        //             itemWidth: 10,
        //             itemHeight: 10
        //         },
        //         animationDuration: 1000,
        //         animationEasingUpdate: 'quinticInOut',
        //         series: [{
        //             type: 'graph',
        //             layout: 'force',
        //             force: {
        //                 repulsion: 80,
        //                 gravity: 0,
        //                 edgeLength: 150,
        //                 layoutAnimation: true,
        //             },
        //             data: listdata,
        //             links: links,
        //             categories: texts,
        //             roam: false,
        //             nodeScaleRatio: 0,
        //             focusNodeAdjacency: false,
        //             lineStyle: {
        //                 normal: {
        //                     opacity: 0.5,
        //                     width: 1.5,
        //                     curveness: 0
        //                 }
        //             },
        //             label: {
        //                 normal: {
        //                     show: true,
        //                     position: 'inside',
        //                     textStyle: {
        //                         color: '#000000',
        //                         fontWeight: 'normal',
        //                         fontSize: "12" //字体大小
        //                     },
        //                     formatter: function (params) {
        //                         return params.data.showName
        //                     },
        //                     fontSize: 18,
        //                     fontStyle: '600',
        //                 }
        //             },
        //             edgeLabel: {
        //                 normal: {
        //                     show: true,
        //                     textStyle: {
        //                         fontSize: 12
        //                     },
        //                     formatter: "{c}"
        //                 }
        //             }
        //         }],
        //         color: ['#e8b842', '#41b1ef', '#667aed', '#347fbb', '#772cdc',
        //             '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0'
        //         ]
        //     };

        //     const clickFun = param => {
        //         console.log(param.name)
        //     }
        //     myChart.setOption(option, true)
        //     // console.log(option, 'option')
        //     window.addEventListener('resize', () => {
        //         myChart.resize()
        //     })
        //     myChart.on("click", clickFun);
        // },

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
            console.log(option, 'option')
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
.diagram {
    transform: translate(300px, 80px);
    width: 1200px;
    height: 600px;
    border: 1px solid #fff;
}

.diagrams {
    transform: translate(300px, 80px);
    width: 1200px;
    height: 800px;
    border: 1px solid #fff;
}

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