<template>
  <div class="bg">

    <div class="switch_10kv" v-if="initHome === 2 && pageListNum !== 1">
      <ul>
        <li @click="switch_10kv_active(index)" :class="index == active ? 'switch_active' : ''"
          :style="{ pointerEvents: index == active ? 'none' : 'auto' }" v-for="(item, index) in pageListNum" :key="index">
        </li>
      </ul>
    </div>

    <div id="htCanvas"></div>
    <!-- <TableDialog v-if="diogShow" :isPowerOff="1" :isStation="isStation" :title="dioTitle" :isZx="isZx"
      :pipelineId="pipelineId" :diogShow="diogShow" @closeDialog="closeDialog1" ref="TableDialog" /> -->
    <!-- <Timetable v-if="diogShowLine" :diogShow="diogShowLine" :devId="devId_copy" ref="TableDialog1"
      @closeDialog="closeDialog" /> -->
    <!-- <HomePage /> -->
    <div class="content-body-right" v-if="pieIsShow" id="app4">
      <div class="content-body-right-item">
        <div class="header">用户信息总览</div>
<!-- 
        <div style="height: 90%">
          <pieComEcharts ref="pieComEcharts" @userDialog="userDialog" :isHome="true"> </pieComEcharts>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import res_10kv from './res.json'
import {
  // getChromeVersion,
  clearHttpRequestingList,
  station_10kvCoord,
  isNbLineXY,
  isMiddles,
  isHigh,
  edgeAnimation,
  stationHtml_antv,
  lineAnomalyHtml_antv,
  htmlFunctionMap_antv,
  label_10kv_antv,
  terminalNum_antv,
  GbOrZbSum_antv,
  lineName_antv,
  floatingWindowInfo1_antv,
  floatingWindowInfo2_antv,
  enumerationList,
  detailHtml_antv, detai10kvlHtml_antv
} from "./utils.js";
// import {
//   queryConsDistributionAndPipelines,
//   queryV10ConsDistributionAndPipeline,
//   queryMeterInfo,
// } from "@/api/220kv/index.js";
// import Timetable from "@/components/home/timetable.vue";
// import { setStore } from "@/utils/store";
// import { deepClone } from "@/utils/util";
import resData from './res.json'
import { Graph, Timing } from '@antv/x6' //x6方法


export default {
  name: "ProjectWebHtTest",
  components: {
    //HomePage
  },
  props: {
    cntrlStaId: {
      type: String,
      default: "",
    },

    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isStation: false,
      diogShow: false,  // 内部页面弹窗的开关
      active: 0,  // 内部页面10kv站点的分页
      oneSize: 100, //一级图标中心距边长度
      twoSize: 30, //二级图标中心距边长度
      threeSize: 40, //三级图标中心距边长度
      dfNum: 5, //等分数
      middleSize: 3, //双线
      highSize: 0.5, //中间双线
      angle: -45, //逆时针旋转角度
      flexY: Math.sqrt(2) / 3, //逆时针旋转后y轴压缩比例
      flexX: Math.sqrt(9) / 2,
      twoSpace: 130, //二级图标间距
      twoSpaceNb: 100, //二级图标间距内部
      threeSpace: 75, //三级图标间距
      one2two: 420, //一级到二级间距
      two2three: 210, //二级到三级间距
      zeroX: 960, // 原点x
      zeroY: 510, // //原点y
      commenFlexX: 1.5, //拉伸后距离异常x
      commenFlexY: 1.2, //拉伸后距离异常y
      centerNodeId: '',//当前中心点节点的id
      centerNodeName: '',//当前中心点节点的名字
      initHome: 1,//当前拓扑1.全景2.内部3.10kv
      graph: null,//画布
      data: null, // 全景页面的数据
      // centerXY: [window.innerWidth / 2, window.innerHeight / 2], //中心点位
      centerXY: [960, 510], //中心点位
      diogShowLine: false, //折线图弹窗
      pieIsShow: false,  //是否展示左上角的饼图==》10kv页面
      consDistributionAndPipelinesData: null,//全景页面返回的数据(未处理)
      lineAnomalyHtml_antvId: '',  //异常线路上的异常信息dom的id
      innerInitParam: null,  //内部拓扑图的参数
      pageListNum: 1,//内部拓扑图10kv站点分页的页码
      centerNodeData: null, // 当前页面中心点的数据(内部页面使用)
      chargingStation_10kvAxios: null,  // 台区拓扑图接口返回的原始数据
      chargingStationInfo_10kv: null,// 台区拓扑图左上角饼图的数据
      clickInitNodeList: [], //台区符合页面渲染的数据
      isQj: false,  //是否是全景页面
      station_10kv_id: null, //当前点击的终端
      station_10kv_page: null,// 当前处于哪个终端下电表的分页==》字符串  例如，zb1,gb1
      nextPage: true,  //是否渲染10kv页面电表下一页按钮
      pageInfo: {    //10kv页面终端与电表的分页信息
        zb: { page: 1, total: 0 },
        zb1: { page: 1, total: 0 },
        zb2: { page: 1, total: 0 },
        gb: { page: 1, total: 0 },
        gb1: { page: 1, total: 0 },
        gb2: { page: 1, total: 0 },
        gb3: { page: 1, total: 0 },
      },

    };
  },
  created() {
    Graph.registerEdge('arrow',
      {
        markup: [
          {
            tagName: 'path',
            selector: 'line',
            attrs: {

              fill: 'none',
              'pointer-events': 'none'
            }
          },
          {
            tagName: 'path',
            groupSelector: 'arrow',
            selector: 'arrow1',
          },
          // {
          //   tagName: 'path',
          //   groupSelector: 'arrow',
          //   selector: 'arrow2',
          // }
        ],
        attrs: {
          line: {
            connection: true,
            stroke: '#333',
            strokeWidth: 2,
            strokeLinejoin: 'round',
            targetMarker: null,
            sourceMarker: null,
          },
        }
      }, true
    )
  },
  mounted() {
    setTimeout(() => {
      this.getQueryConsDistributionAndPipelines(this.cntrlStaId, 1, 1);
    });

  },

  methods: {
    userDialog(param) {
      this.isZx = !(param.name.includes('公变'))
      this.diogShow = true
      setTimeout(() => {
        this.$refs.TableDialog.title = `${param.name}停电明细`
      }, 0)
    },
    // 进入页面发送请求获取数据并初始化容器
    // async getQueryConsDistributionAndPipelines(d, i, init) {
     getQueryConsDistributionAndPipelines(d, i, init) {
      // const { data: { data } } = await queryConsDistributionAndPipelines({ cntrlStaId: d, panoramicSwitch: i, rootStaId: d });
      console.log(resData,'resDataresData')
      // const { data } = resData.res_panoramaInit
      const { data } = resData.res_innerInit

      this.consDistributionAndPipelinesData = data;
      this.centerNodeId = data.id;
      this.centerName = data.name;
      console.log(this.consDistributionAndPipelinesData, '==========================199')
      if (init == 1) {
        this.initMounted(init);
        this.panoramaInit(this.data)
        this.$emit("serchKvData", this.cntrlStaId, "220", 1, this.isShow);
      }

    },
    // 页面初始化方法
    initMounted(i) {
      console.log(this.data, '=================209')
      this.initHome = i;
      if (this.graph) this.graph.dispose()

      this.graph = new Graph({
        container: document.getElementById('htCanvas'),
        autoResize: true,
        // linkPingning: false,

        interacting: function (cellView) {
          if (cellView.cell.getData() != undefined && !cellView.cell.getData().disableMove) {
            return { nodeMovable: false, edgeMovable: false, edgeLabelMovable: false, vertexAddable: false }
          }
          return { nodeMovable: false, edgeMovable: false, edgeLabelMovable: false, vertexAddable: false }
        },
        panning: {
          enabled: i == 3 ? false : true, // 启用图表的拖动
        },
      })
      if (i == 1) this.data = this.getZb(this.consDistributionAndPipelinesData);
      console.log(this.data, '=================229')
      // clearHttpRequestingList();
    },
    //全景拓扑图的初始化方法
    panoramaInit(data) {
      this.isQj = true;
      this.centerNode = 'node1'
      this.$emit("clickTableShow", false);
      this.$emit("getStation", data, this.isQj, this.centerNode, this.isShow);
      this.$emit("isShowSwitch", true);
      // console.log(data, '全景渲染数据')
      // console.log(data.filter(item => item.chargingStationStatus == '02'), '全景渲染数据')
      // console.log(this.consDistributionAndPipelinesData, '全景渲染数据')
      // 中心节点是雄州还是张田
      let imageUrl = this.centerNodeId == '334453673' ? require('./symbols/center_point.png') : require('./symbols/node1_ZT.png')
      // 中心点参数
      this.centerNodeData = JSON.parse(JSON.stringify(this.consDistributionAndPipelinesData))
      isNbLineXY(data,'big')
      console.log('==================================================254三级', this.centerNodeData, data,)
      delete this.centerNodeData.children
      let param = { x: this.centerXY[0], y: this.centerXY[1], size: { w: 220, h: 220 }, imageUrl, data: this.centerNodeData }
   
      // 渲染中心节点
      this.createNodeDom(param)
      // 判断中心点是否需要异常数量弹框
      if (this.centerNodeData.extendData) {
        this.createNodeDom({ x: param.x, y: param.y - 120, size: { w: 184, h: 108 }, data: { ...this.centerNodeData, type: 'anomalyWindow' }, shape: 'html', arg: { html: () => detai10kvlHtml_antv(this.centerNodeData) } })
      }
    
      // 渲染节点和画线
     
      data.forEach(item => {
        if (item.chargingStation === '35kv' && item.name == '营南变电站') {
          item.line[0].line[2].x -= 25
          item.line[0].line[3].x -= 25
          item.line[0].line[2].y -= 10
          item.line[0].line[3].y -= 10
        }
        this.panoramaInitCreateEdge(item)
        this.panoramaInitCreateNode(item)
      })
      // 渲染中心菱形
      this.createNodeDom({ x: this.centerXY[0], y: this.centerXY[1], size: { w: 1540, h: 888 }, arg: { zIndex: -1 }, imageUrl: require('./symbols/diamond_big.png'), data: 'diamond_big' })

      //节点点击事件
      this.graph.on('cell:click', ({ e, x, y, cell, view }) => {
        if (cell.data == 'diamond_big') return
        if (cell.isEdge()) return
        if (document.getElementById(this.lineAnomalyHtml_antvId)) {
          document.getElementById(this.lineAnomalyHtml_antvId).remove()
          return
        }


        // 点击节点高亮效果
        const views = this.graph.findViewByCell(cell)
        views.highlight()
        setTimeout(() => {
          views.unhighlight()
          // console.log(cell, 'cell.data')
          // 点击异常线路上的小感叹号
          if (cell.data.chargingStationStatus !== '1' && cell.data.icon) {
            if (document.getElementById(this.lineAnomalyHtml_antvId)) document.getElementById(this.lineAnomalyHtml_antvId).remove()
            let html = () => lineAnomalyHtml_antv(cell.data.name, cell.id)
            this.createNodeDom({ x: x - 50, y: y - 100, size: { w: 100, h: 60 }, data: cell.data, shape: 'html', arg: { html } })
            this.lineAnomalyHtml_antvId = cell.id
          }
          if (cell.shape == 'image' && !cell.data.icon) {
            this.innerInitParam = {
              rootStaId: this.centerNodeId,
              cntrlStaId: cell.data.id,
              panoramicSwitch: 2,
            }
            this.centerNodeData = cell.data

            this.clickQueryConsDistribution(cell.data)
          }
          if (cell.getData().type === 'anomalyWindow') {
            this.openAnomalyWindow(e)
          }

        }, 300)
        console.log(e, 'eeee')
        console.log(x, 'xxxx')
        console.log(y, 'yyyy')
        console.log(cell.getData(), 'ccccccccccccc')
        console.log(view, 'viewwww')
      })
    },

    // 站点上方异常框展示的异常线路的明细弹窗
    openAnomalyWindow(e) {
      this.isStation = false
      // 专变专线弹框
      let eventId = e.toElement.id
      let eventClassName = e.toElement.classList[0]
      console.log(eventClassName, 'eventClassNameeventClassName')
      let flag = ['专线', '专变', '低压', '公变'].some(e => eventClassName.includes(e))
      if (flag) {
        this.pipelineId = eventId;
        this.diogShow = true;
        setTimeout(() => {
          this.$refs.TableDialog.title = `${eventClassName}明细`;
          this.$refs.TableDialog.isPipelineId = true
        })

        this.isZx = !(eventClassName.includes('公变'))
      }
    },




    // 渲染一些非结构中的节点可用
    createNodeDom({ x, y, size = { w: 2, h: 2 }, imageUrl, data, attrs, label, shape, arg }) {
      return this.graph.addNode({
        shape: imageUrl ? 'image' : shape || '',
        x: x - size.w / 2,
        y: y - size.h / 2,
        width: size.w,
        height: size.h,
        zIndex:100,
        interactive: false,
        label,
        imageUrl,
        data,
        attrs,
        ...arg
      })
    },
    // 全景与内部创建节点的方法
    panoramaInitCreateNode(item, center) {
      // 节点图片枚举
      let chargingStationObj = enumerationList.getChargingStationObj(item.chargingStationStatus, this.centerNodeId)
      let { x, y } = item
      let size = chargingStationObj[item.chargingStation].size
      let imageUrl = chargingStationObj[item.chargingStation].img

      // 如果是中心点，尺寸加大
      size.w = center == 'center' ? size.w + 50 : size.w
      size.h = center == 'center' ? size.h + 50 : size.h
      this.graph.addNode({
        shape: 'image',
        x: x - size.w / 2,
        y: y - size.h / 2,
        width: size.w,
        height: size.h,
        imageUrl,
        zIndex:100,
        data: item,
        attrs: {
          label: {
            text: item.chargingStation == '220kv' || item.chargingStation == '10kv' ? '' : item.name,
            fill: '#fff',
            fontSize: 13,
            y: size.h / 2
          },
          body: {
            fill: '#f5f5f5',
            stroke: '#d9d9d9',
          },
        },
      })
      // 整站失电提示框
      if (item.chargingStationStatus === '2' && item.chargingStation !== '10kv') {
        let y1 = this.centerNodeData.name === item.name ? y - 110 : y + 90
        this.createNodeDom({ x, y: y1, size: { w: 85, h: 35 }, data: item, label: '整站失电', attrs: { label: { fill: '#fff' }, body: { fill: '#ffffff66', rx: 7, ry: 7, stroke: '#fff' } } })
      }
      // 110kV站点上方浮框




      // 10kv站下面的浮窗html
      if (item.chargingStation == '10kv') {
        let html = () => htmlFunctionMap_antv[`get10kvHtml${item.chargingStationStatus}`](item.chargingStationInfo, item.id)
        this.createNodeDom({ x, y: y + 160, size: { w: 210, h: 235 }, data: { ...item, type: 'inner10kvWindow' }, shape: 'html', arg: { html } })
        if (item.chargingStationStatus !== '1') {
          this.createNodeDom({ x, y: y - 90, size: { w: 184, h: 108 }, data: item, shape: 'html', arg: { html: () => detai10kvlHtml_antv(item) } })
        }

      } else {
        // 判断当前点是否需要异常数量弹框
        if (item.extendData) {
          let y1 = item.chargingStation == '35kv' ? y - 70 : y - 90
          this.createNodeDom({ x, y: y1, size: { w: 184, h: 108 }, data: { ...item, type: 'anomalyWindow' }, shape: 'html', arg: { zIndex: 9999, html: () => detai10kvlHtml_antv(item) } })
        }
      }




    },
    // 全景与内部创建线路的方法
    panoramaInitCreateEdge(item) {
      // directionObj根据方向设置旋转==>枚举
      let { directionObj } = enumerationList

      // 根据线路状态设置对应的线路颜色==>枚举(所有线路)
      let lineColor = enumerationList.getLineColor(item.chargingStationStatus)

      // 设置流动动画路径是否反转
      let reverse = false
      if (!this.isQj) {
        reverse = +this.centerNodeData.chargingStation.split('k')[0] < +item.chargingStation.split('k')[0]
        // console.log(this.centerNodeData, item, reverse, 'item.chargingStation')
      }
      let { line } = item
      for (let i = 0; i < line.length; i++) {
        console.log(line[i],'namesss')
        let num = null
        if(line[i].name == '35kV雄城311线'){
          num = -15
        }
         if(line[i].name == '雄龙线313'){
          num = 20
        }
        if (item.chargingStation === '10kv') {
          line[i].chargingStationStatus = item.chargingStationStatus
          line[i].chargingStation = item.chargingStation
        }
        let attrs = {
          line: {
            stroke: '',
            strokeWidth: 4,
            strokeDasharray: 0,
            targetMarker: null,
            sourceMarker: null,
          },
        }
        let distance = this.isQj ? 0.75 : (line[i].name.includes('雄城311线') ? 0.8 : 0.5)
        // 线路正常才有流动动画
        if (line[i].chargingStationStatus == '1') {
          // 如果动画需要被反转，那么反转流动点首尾的透明度
          let transparencyIndexArr = [0.1, 0.3, 0.8, 1]
          transparencyIndexArr = reverse ? transparencyIndexArr.reverse() : transparencyIndexArr
          let stops = [
            { offset: '0%', color: `rgba(255,255,255,${transparencyIndexArr[0]})` },
            { offset: '50%', color: `rgba(255,255,255,${transparencyIndexArr[1]})` },
            { offset: '80%', color: `rgba(255,255,255,${transparencyIndexArr[2]})` },
            { offset: '100%', color: `rgba(255,255,255,${transparencyIndexArr[3]})` }
          ]

          attrs['arrow'] = {
            d: 'M 0 2 2 1 Q4 0 2 -2 0 -4 -24 -3 -24 0 -24 3 z ',
            width: 30,
            // po
            fill: {
              type: 'linearGradient',
              stops,
              filter: {
                name: 'filter',
                args: {
                  width: '250%',
                  height: '250%',
                  x: '-50%',
                  y: '-50%',

                }
              }
            }
          }
          attrs['arrow1'] = {
            atConnectionRatio: 0.5
          }
        }


        // 线路上的图标(开关、警告)y
        let labels = [
          // 开始开关
          {
            markup: [
              {
                tagName: 'rect',
                selector: 'labelBody'
              },
              {
                tagName: 'text',
                selector: 'labelText'
              },
            ],
            attrs: {
              labelText: {
                text: ' ',
                fill: '#00f1fa',
              },
              labelBody: {
                ref: 'labelText',
                refX: -6,
                refY: 6,
                rx: 0,
                ry: 0,
                refWidth2: 13,
                refHeight2: 0.5,
                stroke: 'none',
                fill: line[i].chargingStationStatus == '1' ? lineColor[line[i].chargingStation] : lineColor[line[i].chargingStationStatus],
                textAnchor: "middle",
                textVerticalAnchor: "middle"
              }
            },
            position: {
              distance: 30,
              angle: directionObj[item.direction],
            }
          },

          // 线路名称
          {
            markup: [
              {
                tagName: 'text',
                selector: 'labelText'
              },
            ],
            attrs: {
              labelText: {
                text: line[i].chargingStationStatus === '1' ? line[i].name : '',
                fill: '#fff',
                refY: num ? num :10,
                refX: 10,
                fontSize: 10
              },
            },
            position: {
              distance,
              angle: item.direction !== 'left' ? directionObj[item.direction] : 0,
              args: {
                keepGradient: true,
                ensureLegibility: true
              }
            }
          },
        ]
        // let
        // 结尾开关(状态正常的线路才会添加)
        let endSwitch = JSON.parse(JSON.stringify(labels[0]))
        endSwitch.position.distance = -30

        if (line[i].chargingStationStatus !== '1') {
          // 设置颜色
          attrs.line.stroke = lineColor[line[i].chargingStationStatus]
          // 设置虚线
          attrs.line.strokeDasharray = 15
          let { abnormalIconObj } = enumerationList

          let res = abnormalIconObj[line[i].chargingStationStatus]
          let data = item.chargingStation === '10kv' ? item : line[i]
          this.createNodeDom({ x: line[i].line[2].x - 10, y: line[i].line[2].y, size: { w: 25, h: 25 }, data: { ...data, icon: res }, imageUrl: require(`./symbols/${res}.png`) })
        } else {
          if (line[i].chargingStation !== '10kv') labels.push(endSwitch)
          attrs.line.stroke = lineColor[line[i].chargingStation]
          attrs.line.strokeDasharray = 0

        }


        let vertices = line[i].line
        let source = { x: line[i].line[0].x, y: line[i].line[0].y }
        let target = { x: line[i].line[3].x, y: line[i].line[3].y }

        // 画线
        let edge = this.graph.addEdge({
          source,
          target,
          shape: 'arrow',
          vertices,
          data: line[i],
          attrs,
          labels,
          zIndex:10
        })


        edgeAnimation(edge, Timing, reverse)

      }

    },
    // 拓扑图切换需要调的接口(全景页面与内部页面互相切换)
    clickQueryConsDistribution(objData) {

      // queryConsDistributionAndPipelines(this.innerInitParam)
      //   .then((res) => {
      //     if (res.data.code == "200") {
      //       this.consDistributionAndPipelinesData = res.data.data;


      //       let num = this.centerNodeData.chargingStation == "220kv" ? 3 : 4
      //       this.station_10kv(1, true, num, this.innerInitParam.cntrlStaId, objData);

      //       this.station_10kv_cntrlStaId = this.innerInitParam.cntrlStaId;
      //       this.switch_name = objData.chargingStation.split('k')[0];
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    // 内部页面渲染之前进行的操作(10kv站点的分页)
    station_10kv(slice, flag, num, cntrlStaId, objData) {
      console.log(slice, flag, num, cntrlStaId, objData, 'active')
      let clickData = station_10kvCoord(num);
      this.zeroX = this.centerXY[0];
      this.zeroY = window.innerHeight / 2 - 60;

      let switch_name = objData.chargingStation.includes('220') ? '220' : ''
      this.stationData = this.getZbWithLine(switch_name, this.consDistributionAndPipelinesData) || [];
      // 分页截取 ==》分页公式： 总页数  (总数量/每页条数)向上取整
      this.pageListNum = Math.ceil(this.stationData.line.length / num);
      let startIndex = (slice - 1) * num;
      let endIndex = startIndex + num;
      let stationDataLine = this.stationData.line.slice(startIndex, endIndex);

      if (stationDataLine.length > num) {
        let length = clickData.length;
        for (let i = 1; i < num + 1; i++) {
          clickData[length - i].chargingStation = stationDataLine[num - i].chargingStation;
          clickData[length - i].name = stationDataLine[num - i].name;
          clickData[length - i].id = stationDataLine[num - i].id;
          clickData[length - i].imTagBoList = stationDataLine[num - i].imTagBoList;
          clickData[length - i].chargingStationStatus = stationDataLine[num - i].chargingStationStatus;
          clickData[length - i].chargingStationInfo = stationDataLine[num - i].chargingStationInfo;
        }
      } else {
        let len = clickData.length - stationDataLine.length;
        for (let i = 0; i < len; i++) {
          clickData.pop();
        }
        stationDataLine.forEach((e, i) => {
          let index = stationDataLine.length - i - 1 < 0 ? 0 : stationDataLine.length - i - 1;
          clickData[index].chargingStation = stationDataLine[index].chargingStation;
          clickData[index].name = stationDataLine[index].name;
          clickData[index].id = stationDataLine[index].id;
          clickData[index].imTagBoList = stationDataLine[index].imTagBoList;
          clickData[index].chargingStationStatus = stationDataLine[index].chargingStationStatus;
          clickData[index].chargingStationInfo = stationDataLine[index].chargingStationInfo;
        });
      }



      if (flag) {
        this.clickData = [...this.stationData.station, ...clickData];
        this.active = 0;
      } else {
        this.clickData = this.clickData.filter((e) => e.chargingStation != "10kv");
        this.clickData = [...this.clickData, ...clickData];
      }

      this.$emit("getStation", this.clickData, false, this.clickDataNode, this.isShow);
      this.$emit("serchKvData", cntrlStaId, this.switch_name, 2);
      this.initMounted(2)
      this.innerInit(this.clickData, objData);

    },
    // 内部10kv站点分页
    switch_10kv_active(index) {
      if (index == this.active) return
      this.active = index;
      let num = this.centerNodeData.chargingStation == "220kv" ? 3 : 4
      this.station_10kv(index + 1, false, num, this.centerNodeData.id, this.centerNodeData);

    },
    // 内部拓扑的渲染函数
    innerInit(dataList, objData) {
      // 备份一份参数，以便10kv页面返回
      this.clickInitNodeList = dataList;
      this.centerNodeData = objData
      this.isStation = false

      let nodeList = JSON.parse(JSON.stringify(dataList))
      this.isQj = false;
      this.pieIsShow = false;
      this.$emit("isShowSwitch", true);
      this.$emit("clickTableShow", false);
      this.$emit("getStation", this.clickData, this.isQj, this.clickDataNode, this.isShow);
      // console.log(nodeList,'nodeList')
      // 线路微调
      isNbLineXY(nodeList, objData.chargingStation)
      //  中心点参数
      let centerData = { ...JSON.parse(JSON.stringify(this.consDistributionAndPipelinesData)), x: this.centerXY[0], y: this.zeroY }
      delete centerData.children

      // // 渲染中心节点
      this.panoramaInitCreateNode(centerData, centerData.chargingStation == '220kv' ? '' : 'center')
      // 渲染中心菱形
      this.createNodeDom({ x: this.centerXY[0], y: this.zeroY + 30, size: { w: 890, h: 558 }, arg: { zIndex: -1 }, imageUrl: require('./symbols/diamond_mini.png'), data: 'diamond_mini' })
      // 渲染节点和画线
      nodeList.forEach(item => {
        this.panoramaInitCreateEdge(item)
        this.panoramaInitCreateNode(item)
      })

      //节点点击事件
      this.graph.on('cell:click', ({ e, x, y, cell, view }) => {
        console.log(e, 'eeee')
        console.log(x, 'xxxx')
        console.log(y, 'yyyy')
        console.log(cell, 'celll')
        console.log(view, 'viewwww')
        if (cell.data == 'diamond_mini') return
        if (cell.isEdge()) return
        if (document.getElementById(this.lineAnomalyHtml_antvId)) {
          document.getElementById(this.lineAnomalyHtml_antvId).remove()
          return
        }

        // 点击节点高亮效果
        const views = this.graph.findViewByCell(cell)
        views.highlight()
        setTimeout(() => {
          views.unhighlight()
          // 点击异常线路上的小感叹号
          if (cell.data.chargingStationStatus !== '1' && cell.data.icon) {
            if (document.getElementById(this.lineAnomalyHtml_antvId)) document.getElementById(this.lineAnomalyHtml_antvId).remove()
            let html = () => lineAnomalyHtml_antv(cell.data.name, cell.id)

            this.createNodeDom({ x: x - 50, y: y - 100, size: { w: 100, h: 60 }, data: cell.data, shape: 'html', arg: { html: html } })
            this.lineAnomalyHtml_antvId = cell.id
            return
          }
          // 判断点击的是10kv浮窗内的元素
          if (cell.data.type === "inner10kvWindow") {
            // 专变专线弹框
            let { titleObj } = enumerationList

            let eventId = e.toElement.id
            let eventClassName = e.toElement.classList[0]
            if (titleObj[eventId]) {
              this.pipelineId = eventClassName;
              this.diogShow = true;

              setTimeout(() => {
                this.$refs.TableDialog.isPipelineId = true

                this.$refs.TableDialog.title = titleObj[eventId];
              })
              this.isZx = eventId !== "gb" || eventId !== "gbTd";
            }

          }
          // 如果点击的是图元的话
          if (cell.shape == 'image' && !cell.data.icon && cell.data.chargingStation !== '10kv') {
            this.innerInitParam = {
              rootStaId: this.centerNodeId,
              cntrlStaId: cell.data.id,
              panoramicSwitch: 2,
            }
            this.centerNodeData = cell.data
            this.clickQueryConsDistribution(cell.data)
          }
          if (cell.data.chargingStation === '10kv' && cell.data.type !== 'inner10kvWindow') {
            // console.log(e, 'eeee')
            // console.log(x, 'xxxx')
            // console.log(y, 'yyyy')
            // console.log(cell, 'celll')
            // console.log(view, 'viewwww')
            this.pipelineId = cell.getData().id;

            // queryV10ConsDistributionAndPipeline({ cntrlStaId: cell.getData().id }).then((res) => {
            //   // res.data = res_10kv
            //   if (res.data.code == 200) {

            //     this.chargingStation_10kvAxios = JSON.parse(JSON.stringify(res.data.data));
            //     // // _this.station_10kvGb_class = res.data.data.terminalGB[2].id
            //     // 保存这条10kv线的数据
            //     this.chargingStationInfo_10kv = this.consDistributionAndPipelinesData.line.filter(
            //       (item) => item.id == cell.getData().id)[0].chargingStationInfo;
            //     // console.log(this.chargingStationInfo_10kv, 'chargingStationInfo_10kv')
            //     this.chargingStation_10kv = this.get10kV(res.data.data);


            //     this.districtLevelInit_10kv(this.chargingStation_10kv);
            //     // 左上角饼图
            //     this.pieIsShow = true;
            //     this.$nextTick(() => {
            //       this.$refs.pieComEcharts.createdEcharts1(
            //         {
            //           sprLine: +this.chargingStationInfo_10kv.zxValue,
            //           spePow: +this.chargingStationInfo_10kv.zbValue,
            //           dist: +this.chargingStationInfo_10kv.gbValue,
            //           sprLineOff: +this.chargingStationInfo_10kv.zbOffNum,
            //           spePowOff: +this.chargingStationInfo_10kv.zxOffNum,
            //           distOff: +this.chargingStationInfo_10kv.gbOffNum,
            //         },
            //         { left: "38%", top: "32%" },
            //         3
            //       );
            //     });
            //   }



            // })
          }
          if (cell.getData().type === 'anomalyWindow') this.openAnomalyWindow(e)

        }, 100)
      })
    },
    // 10kv页面拓扑的渲染函数
    districtLevelInit_10kv(dataList) {
      // let nodeList = deepClone(dataList)
      let nodeList = JSON.parse(JSON.stringify(dataList)) 
      this.isStation = true

      this.$emit("isShowSwitch", false);
      this.initMounted(3)

      // 渲染10kv图例
      this.legendCreation('1740px', '110px', '10kvPage')
      // 返回按钮渲染
      this.createNodeDom({ x: window.innerWidth - 230, y: 130, size: { w: 45, h: 45 }, data: { type: 'returnBtn', param1: this.clickInitNodeList, param2: this.centerNodeData }, imageUrl: require('./symbols/getBack.png'), arg: {} })
      // 10kv两个平行四边形背景
      this.createNodeDom({ x: 380, y: 570 - 50, imageUrl: require('./symbols/10kv_bg1.png'), size: { w: 592, h: 98 } });
      this.createNodeDom({ x: 1250, y: 570 - 50, imageUrl: require('./symbols/10kv_bg2.png'), size: { w: 1132, h: 98 } });
      // 公变终端数量
      this.createNodeDom({ x: 1250, y: 450, size: { w: 180, h: 60 }, shape: 'html', arg: { html: () => GbOrZbSum_antv(true, this.chargingStation_10kvAxios.terminalGB.length) } })
      // 专变终端数量
      this.createNodeDom({ x: 400, y: 450, size: { w: 180, h: 60 }, shape: 'html', arg: { html: () => GbOrZbSum_antv(false, this.chargingStation_10kvAxios.terminalZB.length) } })
      let size = { w: 38, h: 38 }
      let type = 'pageButton'
      let imageUrl = require('./symbols/10kv_terminal_switch.png')
      let energyImg = require('./symbols/10kv_energy_switch.png')
      let arg = { angle: 180 }
      let y = 520
      //专变终端
      if (this.pageInfo.zb.page < this.pageInfo.zb.total) {
        // 渲染下一页按钮
        this.createNodeDom({ x: 620, y, size, data: { page: 'zb+', type }, imageUrl })
      }
      if (this.pageInfo.zb.page <= this.pageInfo.zb.total && this.pageInfo.zb.page !== 1) {
        // 渲染上一页按钮
        this.createNodeDom({ x: 150, y, size, data: { page: 'zb-', type }, imageUrl, arg })
      }
      //公变终端
      if (this.pageInfo.gb.page < this.pageInfo.gb.total) {
        // 渲染下一页按钮
        this.createNodeDom({ x: 1750, y, size, data: { page: 'gb+', type }, imageUrl })
      }
      if (this.pageInfo.gb.page <= this.pageInfo.gb.total && this.pageInfo.gb.page !== 1) {
        // 渲染上一页按钮
        this.createNodeDom({ x: 720, y, size, data: { page: 'gb-', type }, imageUrl, arg })
      }

      if (this.station_10kv_page && this.nextPage) {
        // 电表下一页
        if (this.pageInfo[this.station_10kv_page].page < this.pageInfo[this.station_10kv_page].total) {
          this.createNodeDom({ x: 1780, y: y + 250, size, data: { page: `${this.station_10kv_page}+`, type }, imageUrl: energyImg })
        }

        // 电表上一页
        if (this.pageInfo[this.station_10kv_page].page <= this.pageInfo[this.station_10kv_page].total && this.pageInfo[this.station_10kv_page].page > 1) {
          // 渲染上一页按钮
          this.createNodeDom({ x: 120, y: y + 250, size, data: { page: `${this.station_10kv_page}-`, type }, imageUrl: energyImg, arg })
        }

      }
      //  }



      nodeList.forEach(item => {
        let source = nodeList.filter(e => e.name == item.source)[0]
        this.districtLevelInit_10kvCreateNode(item)
        this.districtLevelInitCreateEdge(item, source)
      })
      this.graph.on('cell:click', ({ e, x, y, cell, view }) => {
        let cellData = cell.getData()
        if (e.toElement.id === 'closeBtn') {
          cell.visible = false
        }
        if (e.toElement.id === 'line_btn') {
          this.diogShowLine = true;
          // this.$refs.TableDialog1.timeEcharts();
        }
        // console.log(e, 'eeee')
        // console.log(cellData, 'cellData')
        // console.log(x, 'xxxx')
        // console.log(y, 'yyyy')
        // console.log(cell, 'celll')
        // console.log(view, 'viewwww')
        if (!cellData) return
        const views = this.graph.findViewByCell(cell)
        views.highlight()
        setTimeout(() => {
          views.unhighlight()
        }, 200)
        // 返回按钮
        if (cellData.type === 'returnBtn') {
          this.initMounted(2)
          setTimeout(() => {
            this.innerInit(cellData.param1, cellData.param2)
            for (let k in this.pageInfo) {
              this.pageInfo[k].page = 1
            }
            this.station_10kv_id = null
            this.station_10kv_page = null
          }, 0)
        }
        // 点击终端下方的数量渲染终端下属的电表
        if (cellData.type === 'energySwitch') {
          this.initMounted(3)
          // console.log(this.get10kV(this.chargingStation_10kvAxios,cellData.id,10),'10kvAxios,cellData.id,1')
          for (let k in this.pageInfo) {
            if (k.length > 3) {
              this.pageInfo[k].page = 1

            }
          }
          this.nextPage = true

          this.station_10kv_id = cellData.id  //当前点击的终端id保存一份（方便分页）
          // this.chargingStation_10kv = this.get10kV(this.chargingStation_10kvAxios, cellData.id)
          this.districtLevelInit_10kv(this.get10kV(this.chargingStation_10kvAxios, cellData.id))
        } else if (cellData.type === 'pageButton') {
          let page = cellData.page.slice(0, -1)
          let flag = cellData.page[cellData.page.length - 1] == '+'
          // 如果点击的是下一页
          if (this.pageInfo[page].page < this.pageInfo[page].total && flag) this.pageInfo[page].page += 1

          //否则点击的是上一页
          if (this.pageInfo[page].page > 1 && this.pageInfo[page].page <= this.pageInfo[page].total && !flag) this.pageInfo[page].page -= 1

          if (page.length > 2) this.nextPage = true

          if (page.length == 2) this.nextPage = false

          this.chargingStation_10kv = this.get10kV(this.chargingStation_10kvAxios, page.length > 2 ? this.station_10kv_id : null)
          // console.log(this.chargingStation_10kv,'mchargingStation_10kv')
          this.districtLevelInit_10kv(this.chargingStation_10kv)
          //  this.station_10kv_id = null 
          // this.station_10kv_page = null

        } else if (cellData.chargingStation === 'terminal' || cellData.chargingStation === 'energy') {
          let { x, y } = cellData
          // setStore({ name: "devId", content: cellData.id, type: "session" }, false);
          if (document.getElementById('floatingWindowInfo')) document.getElementById('floatingWindowInfo').parentNode.parentNode.parentNode.remove()
          if (cellData.chargingStation === 'terminal' && cellData.publClgFlag == '专变') {

            this.createNodeDom({ x: x, y: y - 10, size: { w: 420, h: 450 }, shape: 'html', arg: { html: () => floatingWindowInfo1_antv(cellData, cellData.publClgFlag === '公变'), zIndex: 999999999 } })
          }



          // if (cellData.chargingStation === 'terminal' && cellData.publClgFlag == '公变') {
          //   queryMeterInfo({ cntrlStaId: cellData.id }).then((res) => {
          //     let order = { ...cellData, ...res.data.data }

          //     this.createNodeDom({ x: x, y: y - 10, size: { w: 420, h: 450 }, shape: 'html', arg: { html: () => floatingWindowInfo1_antv(order, cellData.publClgFlag === '公变'), zIndex: 999999999 } })
          //   })
          // }
          // if (cellData.chargingStation === 'energy') {
          //   queryMeterInfo({ cntrlStaId: cellData.id }).then((res) => {
          //     let order = { ...cellData, ...res.data.data }

          //     this.createNodeDom({ x: x, y: y - 10, size: { w: 420, h: 450 }, shape: 'html', arg: { html: () => floatingWindowInfo2_antv(order) } })

          //   })


          // }



        }

      })


      this.graph.on('cell:mouseenter', ({ e, x, y, cell, view }) => {
        if (!cell) return
        if (cell.getData()) {
          if (cell.getData().chargingStation !== 'terminal' || cell.getData().type === "energySwitch") return
          document.getElementById('htCanvas').style.zIndex = 2
          if (document.getElementById(`${cell.getData().terminalUserName}`)) document.getElementById(`${cell.getData().terminalUserName}`).style.display = 'block'
        }
        //  console.log(e, 'eeee')
        //   console.log(cell.getData(), 'cellData')
        //   console.log(x, 'xxxx')
        //   console.log(y, 'yyyy')
        //   console.log(cell, 'celll')
        //   console.log(view, 'viewwww')
      })
      this.graph.on('cell:mouseleave', ({ e, x, y, cell, view }) => {
        if (!cell) return
        if (cell.getData()) {
          if (cell.getData().chargingStation !== 'terminal') return
          document.getElementById('htCanvas').style.zIndex = 2

          if (document.getElementById(`${cell.getData().terminalUserName}`)) document.getElementById(`${cell.getData().terminalUserName}`).style.display = 'none'
        }
      })
    },
    // 10kv页面拓扑的创建节点
    districtLevelInit_10kvCreateNode(item) {
      let chargingStationObj = enumerationList.get10kvNode(item.chargingStationStatus)

      let { x, y } = item
      let size = chargingStationObj[item.chargingStation]?.size || { w: 0, h: 0 }
      let imageUrl = chargingStationObj[item.chargingStation]?.img || ''
      // 渲染终端与电表下的label
      if (item.chargingStation == 'terminal' || item.chargingStation == 'energy') {
        let html = () => label_10kv_antv(item?.terminalUserName || item.energyUserName, item.chargingStation)
        this.createNodeDom({ x, y: y + 60, size: { w: 200, h: 15 }, data: item, shape: 'html', arg: { html } })
      }
      // 10kv站点与终端要显示   异常数量/总数量
      if (item.chargingStation == '10kv' || item.chargingStation == 'terminal') {
        let total;
        let abnormalNum;
        if (item.chargingStation == '10kv') {
          // 10kv站点名字
          this.createNodeDom({ x, y: y - 70, size: { w: 550, h: 50 }, data: item, shape: 'html', arg: { html: () => lineName_antv(this.chargingStation_10kvAxios.name) } })
          total = this.chargingStation_10kvAxios.terminalGB.length + this.chargingStation_10kvAxios.terminalZB.length
          abnormalNum = this.chargingStation_10kvAxios.terminalGB.filter(item => item.chargingStationStatus !== '1').length + this.chargingStation_10kvAxios.terminalZB.filter(item => item.chargingStationStatus !== '1').length
        }
        if (item.chargingStation == 'terminal') {
          total = item.archMeterFullInfos.length
          abnormalNum = item.archMeterFullInfos.filter(item => item.chargingStationStatus !== '1').length
          let hight = item.imTagList.length * 30
          // 悬浮的提示框
          item.imTagList.length && this.createNodeDom({ x, y:y-50, size: { w: 130, h: hight+30}, data: item, shape: 'html', arg: { html: () => detailHtml_antv(item) } })

        }
        let arg = { html: () => terminalNum_antv(total, abnormalNum, item) }
        this.createNodeDom({ x, y: y + 100, size: { w: 120, h: 30 }, data: { ...item, type: "energySwitch" }, shape: 'html', arg })
      }
      this.graph.addNode({
        shape: 'image',
        x: x - size.w / 2,
        y: y - size.h / 2,
        width: size.w,
        height: size.h,
        imageUrl,
        data: item,
        attrs: {
          label: {
            text: '',
            width: 200,
            fill: '#fff',
            fontSize: 13,
            y: size.h / 2
          },
          body: {
            fill: '#f5f5f5',
            stroke: '#d9d9d9',
          },
        },
      })

    },
    // 10kv页面拓扑创建线路的方法
    districtLevelInitCreateEdge(item, parent) {

      if (item.chargingStation == '10kv') return

      let attrs = {
        line: {
          stroke: '#2681d8',
          strokeWidth: 3,
          strokeDasharray: 0,
          targetMarker: null,
          sourceMarker: null,
          // filter:{
          //   name:'dropShadow',
          //   args:{
          //     dx:1,
          //     dy:1,
          //     blur:2,
          //     color:'#2681d8'
          //   }
          // }
        },
      }

      // 线路正常才有流动动画
      // if (line[i].chargingStationStatus == '1') {
      // 如果动画需要被反转，那么反转流动点首尾的透明度
      let transparencyIndexArr = [0.1, 0.3, 0.8, 1]
      // transparencyIndexArr = reverse ? transparencyIndexArr.reverse() : transparencyIndexArr
      let stops = [
        { offset: '0%', color: `rgba(255,255,255,${transparencyIndexArr[3]})` },
        { offset: '50%', color: `rgba(255,255,255,${transparencyIndexArr[2]})` },
        { offset: '80%', color: `rgba(255,255,255,${transparencyIndexArr[1]})` },
        { offset: '100%', color: `rgba(255,255,255,${transparencyIndexArr[0]})` }
      ]

      attrs['arrow'] = {
        d: 'M 0 2 2 1 Q4 0 2 -2 0 -4 -24 -3 -24 0 -24 3 z ',
        width: 10,
        // po
        fill: {
          type: 'linearGradient',
          stops,
          filter: {
            name: 'filter',
            args: {
              width: 10,
              height: 10,
              x: '-50%',
              y: '-50%',

            }
          }
        }
      }
      attrs['arrow1'] = {
        atConnectionRatio: 0.5
      }
      // }






      let source = { x: item?.x, y: item?.y }
      let target = { x: parent?.x, y: parent?.y }
      let vertices = []
      if (item.chargingStation == 'orth') vertices = [{ x: item?.x, y: item?.y - 30 }]



      // 画线
      let edge = this.graph.addEdge({
        source,
        target,
        shape: 'arrow',
        vertices,
        router: {
          name: 'orth'
        },
        // data: item,
        attrs,
        // labels,
        zIndex: 2
      })




      edgeAnimation(edge, Timing, true)

      // }

    },
    // 渲染图例图元
    legendCreation(x, y, type) {

      if (document.getElementById("legendCreation")) {
        document.getElementById("legendCreation").remove();
      }
      var div = document.createElement("div");
      let iframe = document.createElement("div");
      // iframe.src = cache.url = protocol + '//www.hightopo.com';
      // iframe.style.position = 'absolute';
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "none";
      iframe.style.borderRadius = "5px";
      iframe.style.background = "linear-gradient(to bottom, rgba(87,114,148,0.2), rgba(255,255,255,0))";

      let styles = [
        { backgroundColor: "#F265FF", text: "220kV" },
        { backgroundColor: "#08E9E9", text: "110kV" },
        { backgroundColor: "#ECD922", text: "35kV" },
        { backgroundColor: "#396AFC", text: "10kV" },
        { backgroundColor: "#FF1317", text: "停电" },
        { backgroundColor: "#ED8F03", text: "疑似停电" },
        { backgroundColor: "#939393", text: "整站失电" },
      ];

      // console.log(this.isQj,'this.isQj')
      this.isQj && styles.splice(3, 1);
      if (type === '10kvPage') {
        styles = [{ backgroundColor: "#ED8F03", text: "疑似停电" },
        { backgroundColor: "#FF1317", text: "确认停电" }]
      }

      const styleElements = styles
        .map(
          (style) => `
                <div style="margin-bottom: 6px;">
                  <p style="background: ${style.backgroundColor}; width: 12px; height: 12px; display: inline-block; margin: 0 12px 0 12px;"></p>
                  ${style.text}
                </div>
              `
        )
        .join("");

      iframe.innerHTML = `
                <div style="padding: 10px; display: flex; flex-direction: column; color: #fff; font-size: 16px;">
                  ${styleElements}
                </div>
              `;
      div.appendChild(iframe);
      div.style.position = "fixed";

      div.style.zIndex = 99;
      div.style.left = x;
      div.style.top = y;
      div.id = "legendCreation";
      document.querySelector(".bg").appendChild(div);

    },
    closeDialog1() {
      this.diogShow = false;
    },
    closeDialog() {
      this.diogShowLine = false;
    },



    get10kV_gb(id, terminalArray) {
      let res = new Array();

      let pageInfo = {
        '0': 'zb1', '1': 'zb2', '2': 'gb1', '3': 'gb2', '4': 'gb3'
      }
      let pageInfos = {
        '0': '专变1', '1': '专变2', '2': '公变3', '3': '公变4', '4': '公变5'
      }
      let terminalObj = terminalArray.filter(e => e.id === id)[0]




      let arr = new Array();
      let index = terminalArray.findIndex(item => item.id === id)
      let page = this.pageInfo[`${pageInfo[index]}`].page
      this.station_10kv_page = pageInfo[index]

      arr = terminalObj?.archMeterFullInfos.slice(
        (page - 1) * 12,
        page * 12 > terminalObj.archMeterFullInfos.length ? terminalObj?.archMeterFullInfos.length : page * 12
      );
      let flod = [];
      let gb_xy = []
      // 循环十二次获取十二个电表的坐标
      for (let i = 0; i < 12; i++) {
        flod.push(
          {
            x: 160 + Math.floor(i / 2) * 280,
            y: i % 2 === 0 ? 700 : 850,
            name: `10-${i}`,
            source: pageInfos[index],
            chargingStation: "orth",
            chargingStationStatus: "",
            lineName: "",
          }
        )
        gb_xy.push(
          {
            x: 290 + Math.floor(i / 2) * 280,
            y: i % 2 === 0 ? 700 : 850,
            source: `10-${i}`,
          }
        )
      }

      if (terminalArray.filter(item => item.id == id)[0].publClgFlag === '公变') {
        flod.reverse()
        gb_xy.reverse()
        arr.reverse()
      }
      for (let i = 0; i < arr.length; i++) {
        res.push(flod[i]);
        let archMeterFullInfo = arr[i];
        let obj = JSON.parse(JSON.stringify(archMeterFullInfo));
        obj.x = gb_xy[i].x;
        obj.y = gb_xy[i].y;
        obj.name = archMeterFullInfo.id;
        obj.source = gb_xy[i].source;
        res.push(obj);
      }

      return res;
    },
    // 10kv页面计算坐标
    get10kV(data, id) {
      let terminal_ZbXy = [
        { x: 250, y: 580 },
        { x: 490, y: 580 },

      ];
      let terminal_GbXy = [
        { x: window.innerWidth - 1100, y: 580 },
        { x: window.innerWidth - 700, y: 580 },
        { x: window.innerWidth - 300, y: 580 },
      ];

      // let data = {
      //     id: "45348904",
      //     name: "电网南浃河528大馈线",
      //     chargingStation: "10kv",
      //     cntrlStation: {
      //         cntrlStald: "334453673",
      //         mgtOrgCode: null,
      //         mgtOrgName: null,
      //         resrcSuplCode: null,
      //         resrcSuplName: "220kV雄州W站",
      //         resrcSuplStat: null,
      //         cntrlStaVoltage: null,
      //     },

      //     terminalGB: [
      //         {
      //             id: "8",
      //             publClgFlag: "公变",
      //             chargingStation: "terminal",
      //             archMeterFullInfos: [
      //                 {
      //                     id: "2",
      //                     mgtOrgCode: null,
      //                     mgtOrqName: null,
      //                     chargingStation: "energy",
      //                 },
      //                 {
      //                     id: "3",
      //                     mgtOrgCode: null,
      //                     mgtOrqName: null,
      //                     chargingStation: "energy",
      //                 }, {
      //                     id: "31",
      //                     mgtOrgCode: null,
      //                     mgtOrqName: null,
      //                     chargingStation: "energy",
      //                 }
      //             ],
      //         },
      //         {
      //             id: "18",
      //             publClgFlag: "公变",
      //             chargingStation: "terminal",
      //             archMeterFullInfos: [
      //                 {
      //                     id: "19",
      //                     mgtOrgCode: null,
      //                     mgtOrqName: null,
      //                     chargingStation: "energy",
      //                 },
      //                 {
      //                     id: "20",
      //                     mgtOrgCode: null,
      //                     mgtOrqName: null,
      //                     chargingStation: "energy",
      //                 },
      //             ],
      //         },
      //         {
      //             id: "21",
      //             publClgFlag: "公变",
      //             chargingStation: "terminal",
      //             archMeterFullInfos: [
      //                 {
      //                     id: "22",
      //                     mgtOrgCode: null,
      //                     mgtOrqName: null,
      //                     chargingStation: "energy",
      //                 },
      //                 {
      //                     id: "23",
      //                     mgtOrgCode: null,
      //                     mgtOrqName: null,
      //                     chargingStation: "energy",
      //                 },
      //                 {
      //                     id: "2223",
      //                     mgtOrgCode: null,
      //                     mgtOrqName: null,
      //                     chargingStation: "energy",
      //                 },
      //                 {
      //                     id: "22231",
      //                     mgtOrgCode: null,
      //                     mgtOrqName: null,
      //                     chargingStation: "energy",
      //                 }
      //             ],
      //         }
      //     ],
      //     terminalZB: [
      //         {
      //             id: "4",
      //             publClgFlag: "专变",
      //             chargingStation: "terminal",
      //         },
      //         {
      //             id: "5",
      //             publClgFlag: "专变",
      //             chargingStation: "terminal",
      //         },
      //         {
      //             id: "6",
      //             publClgFlag: "专变",
      //             chargingStation: "terminal",
      //         },
      //         {
      //             id: "62",
      //             publClgFlag: "专变",
      //             chargingStation: "terminal",
      //         }
      //     ],
      // };
      let up = {
        // x: window.innerWidth / 2 - 20,
        // y: window.innerHeight / 2 - 100,
        x: 940,
        y: 320,
        name: "77",
        source: data.cntrlStation.resrcSuplName,
        chargingStation: "10kv",
        chargingStationStatus: "1",
        lineName: data.name,
      };


      let res = new Array();
      res.push(up);
      // res.push(xnd);
      //专变-没有子级,确定专变终端的总页数
      this.pageInfo.zb.total = Math.ceil(data.terminalZB.length / 2);
      let arr_zb = data.terminalZB.slice(
        (this.pageInfo.zb.page - 1) * 2,
        this.pageInfo.zb.page * 2 > data.terminalZB.length ? data.terminalZB.length : this.pageInfo.zb.page * 2
      );

      //公变-有子级
      this.pageInfo.gb.total = Math.ceil(data.terminalGB.length / 3);
      let arr_gb = data.terminalGB.slice(
        (this.pageInfo.gb.page - 1) * 3,
        this.pageInfo.gb.page * 3 > data.terminalGB.length ? data.terminalGB.length : this.pageInfo.gb.page * 3
      );
      arr_zb.forEach((item, index) => {
        this.pageInfo[`zb${index + 1}`].total = Math.ceil(item.archMeterFullInfos.length / 12)
      })
      arr_gb.forEach((item, index) => {
        this.pageInfo[`gb${index + 1}`].total = Math.ceil(item.archMeterFullInfos.length / 12)
      })


      arr_zb.forEach((item, index) => {
        // console.log(item,'arrarrarr')
        item.source = "77"
        item.name = item.id
        item.x = terminal_ZbXy[index].x
        item.y = terminal_ZbXy[index].y
        res.push(item)
        if (item.id == id) {
          res.push({
            x: item.x,
            y: item.y + 150,
            name: `${item['publClgFlag']}${index + 1}`,
            source: item.id,
            chargingStation: "fold",
            chargingStationStatus: "1",
            lineName: "",
          })
        }

      })
      arr_gb.forEach((item, index) => {
        // console.log(item,'arrarrarr')
        item.source = "77"
        item.name = item.id
        item.x = terminal_GbXy[index].x
        item.y = terminal_GbXy[index].y
        res.push(item)
        if (item.id == id) {
          res.push({
            x: item.x,
            y: item.y + 150,
            name: `${item['publClgFlag']}${index + 3}`,
            source: item.id,
            chargingStation: "fold",
            chargingStationStatus: "1",
            lineName: "",
          })
        }

      })
      let terminalList = arr_zb.concat(arr_gb)

      res.forEach((e) => { e.y -= 100 });
      if (id) res = res.concat(this.get10kV_gb(id, terminalList));
      return res;
    },
    copyArr_zb(arrP, arrD, source, type) {
      let res = new Array();
      if (arrD.length == 1) {
        res.push(this.copyObj_zb(arrD[0], arrP[1], source));
      } else if (arrD.length == 2) {
        res.push(this.copyObj_zb(arrD[0], arrP[0], source));
        res.push(this.copyObj_zb(arrD[1], arrP[2], source));
      }
      res.forEach((e) => {
        if (!e.archMeterFullInfos) e.archMeterFullInfos = [];
      });
      return res;
    },
    copyObj_zb(D, P, source) {
      let obj = JSON.parse(JSON.stringify(D));
      obj.x = P.x;
      obj.y = P.y;
      obj.name = D.id + "-db";
      obj.source = source;
      return JSON.parse(JSON.stringify(obj));
    },
    copyObj(D, P, source) {
      let obj = JSON.parse(JSON.stringify(D));
      obj.x = P.x;
      obj.y = P.y;
      obj.name = D.id;
      obj.source = source;
      return JSON.parse(JSON.stringify(obj));
    },
    getZbWithLine(level, vJson) {
      // console.log(level, vJson, 'level,vJson');
      let onelength = this.oneSize / this.dfNum;
      let twolength = this.twoSize / this.dfNum;
      let up = 0;
      let left = 0;
      let down = 0;
      let right = 0;
      //获取二级总数用于排版分布
      if (!vJson?.children.length) return;
      let totalTSize = vJson?.children?.length;
      if (level == "220") {
        //整数值
        let divisible = parseInt(totalTSize / 3);
        //余数值
        let remainder = totalTSize % 3;
        //将整体分为上下左右，定义每边二级和三级的数量
        up = 0;
        left = divisible;
        down = divisible;
        right = divisible;
        //不能均分的按上左下进行顺序分配
        if (remainder == 1) {
          left += 1;
        } else if (remainder == 2) {
          left += 1;
          down += 1;
        }
      } else {
        //整数值
        //余数值
        //将整体分为上下左右，定义每边二级和三级的数量
        up = 0;
        left = totalTSize - 1;
        down = 1;
        right = 0;
        //不能均分的按上左下进行顺序分配
      }

      //坐标数组
      let xy = new Array();
      if (up > 0) {
        xy = xy.concat(this.getXY(up, 0, up, "up", vJson, onelength, twolength, false));
      }
      if (left > 0) {
        xy = xy.concat(this.getXY(left, up, up + left, "left", vJson, onelength, twolength, false));
      }
      if (down > 0) {
        xy = xy.concat(this.getXY(down, up + left, up + left + down, "down", vJson, onelength, twolength, false));
      }
      if (right > 0) {
        xy = xy.concat(
          this.getXY(right, up + left + down, up + left + down + right, "right", vJson, onelength, twolength, false)
        );
      }
      let res = {
        station: xy,
        line: vJson.line,
      };
      console.log(res,'================================1592')
      return res;
    },
    getZb(vJson) {
      let onelength = this.oneSize / this.dfNum;
      let twolength = this.twoSize / this.dfNum;
      //获取二级总数用于排版分布
      let totalTSize = vJson.children.length;
      //整数值
      let divisible = parseInt(totalTSize / 4);
      //余数值
      let remainder = totalTSize % 4;
      //将整体分为上下左右，定义每边二级和三级的数量
      let up = divisible;
      let left = divisible;
      let down = divisible;
      let right = divisible;
      //不能均分的按上左下进行顺序分配
      if (remainder == 1) {
        up += 1;
      } else if (remainder == 2) {
        up += 1;
        down += 1;
      } else if (remainder == 3) {
        up += 1;
        down += 1;
        left += 1;
      }

      //坐标数组
      let xy = new Array();
      if (up > 0) {
        xy = xy.concat(this.getXY(up, 0, up, "up", vJson, onelength, twolength, true));
      }
      if (left > 0) {
        xy = xy.concat(this.getXY(left, up, up + left, "left", vJson, onelength, twolength, true));
      }
      if (down > 0) {
        xy = xy.concat(this.getXY(down, up + left, up + left + down, "down", vJson, onelength, twolength, true));
      }
      if (right > 0) {
        xy = xy.concat(
          this.getXY(right, up + left + down, up + left + down + right, "right", vJson, onelength, twolength, true)
        );
      }
      return xy;
    },
    getXY(totalNum, start, end, direction, vJson, onelength, twolength, ifAll) {
      let xy = new Array();
      let ts = 0;
      if (ifAll) {
        ts = this.twoSpace;
      } else {
        ts = this.twoSpaceNb;
      }
      //二级所需偏移
      let Deviation = (totalNum - 1) * (ts / 2);
      if (direction == "up" || direction == "down") {
        Deviation = (totalNum - 1) * ((ts * this.commenFlexX) / 2);
      }
      //开始计算上方点位坐标
      //二级图标计数
      let num = 0;
      let middle = parseInt(totalNum / 2);
      let ys = totalNum % 2;
      for (let i = start; i < end; i++) {
        //二级图标坐标
        let twoX = 0;
        let twoY = 0;
        if (direction == "up") {
          twoX = this.zeroX + num * ts * this.commenFlexX - Deviation;
          twoY = this.zeroY + this.one2two / this.commenFlexY;
        } else if (direction == "down") {
          twoX = this.zeroX + num * ts * this.commenFlexX - Deviation;
          twoY = this.zeroY - this.one2two / this.commenFlexY;
        } else if (direction == "left") {
          twoX = this.zeroX - this.one2two * 1.3;
          twoY = this.zeroY + num * ts - Deviation;
        } else if (direction == "right") {
          twoX = this.zeroX + this.one2two * 1.3;
          twoY = this.zeroY + num * ts - Deviation;
        }
        //是否中间点
        let isMiddle = isMiddles(totalNum, parseInt(totalNum / 2), totalNum % 2, num);
        //开始计算折现点位
        let lines = vJson.children[i].lines;
        let line = new Array();
        let high = 0;
        if (isHigh(totalNum, parseInt(totalNum / 2), totalNum % 2, num)) {
          high = this.highSize;
        }
        let drift = 15;
        if (isMiddle && ys == 1) {
          drift = 25;
          onelength = 40;
        }
        for (let lnum = 0; lnum < lines.length; lnum++) {
          if (lnum == 0) {
            line.push(
              this.getLineXY(
                1,
                totalNum,
                num,
                this.zeroX,
                this.zeroY,
                this.oneSize,
                onelength,
                this.twoSize,
                twoX,
                twoY,
                direction,
                2 - high,
                0,
                lines[lnum].name,
                lines[lnum].chargingStation,
                lines[lnum].chargingStationStatus,
                lines[lnum].id,
                lines[lnum].imTagBoList

                // lines[lnum].anomaly,
                // lines[lnum].suspectedAnomaly,
              )
            );
          } else {
            line.push(
              this.getLineXY(
                1,
                totalNum,
                num,
                this.zeroX,
                this.zeroY,
                this.oneSize,
                onelength,
                this.twoSize,
                twoX,
                twoY,
                direction,
                this.middleSize - high,
                drift,
                lines[lnum].name,
                lines[lnum].chargingStation,
                lines[lnum].chargingStationStatus,
                // lines[lnum].anomaly,
                // lines[lnum].suspectedAnomaly,
                lines[lnum].id,
                lines[lnum].imTagBoList
              )
            );
          }
        }
        //结束计算折现点位

        //不加偏转
        // xy.push({x:twoX,y:twoY,name:vJson.children[i].name,source:null,line:line,isMiddle:isMiddle,chargingStation:vJson.children[i].chargingStation})
        //加偏转
        //  isNbLineXY(vJson.children, 'big')y

        console.log(vJson.children, 'xxxxxxxxxxxxxxcc')
        xy.push(
          this.deflectionXY(
            this.zeroX,
            this.zeroY,
            twoX,
            twoY,
            vJson.children[i].name,
            null,
            line,
            isMiddle,
            vJson.children[i].chargingStation,
            vJson.children[i].chargingStationStatus,
            vJson.children[i].anomaly,
            vJson.children[i].suspectedAnomaly,
            direction,
            vJson.children[i].id,
            vJson.children[i].imTagBoList,
            vJson.children[i].extendData,

          )
        );
        //开始处理三级图标
        let children = vJson.children[i].children || [];
        if (typeof children == "undefined") {
          num++;
          continue;
        }
        let source = vJson.children[i].name;
        //三级所需偏移
        let Deviation3 = (children.length - 1) * (this.threeSpace / 2);
        if (direction == "up" || direction == "down") {
          Deviation3 = (children.length - 1) * ((this.threeSpace * this.commenFlexX) / 2);
        }
        //三级图标计数
        let num3 = 0;
        for (let j = 0; j < children.length; j++) {
          let threeX = 0;
          let threeY = 0;
          if (direction == "up") {
            threeX = twoX + num3 * this.threeSpace * this.commenFlexX - Deviation3;
            threeY = twoY + this.two2three / this.commenFlexY;
          } else if (direction == "down") {
            threeX = twoX + num3 * this.threeSpace * this.commenFlexX - Deviation3;
            threeY = twoY - this.two2three / this.commenFlexY;
          } else if (direction == "left") {
            threeX = twoX - this.two2three * 1.3;
            threeY = twoY + num3 * this.threeSpace - Deviation3;
          } else if (direction == "right") {
            threeX = twoX + this.two2three * 1.3;
            threeY = twoY + num3 * this.threeSpace - Deviation3;
          }
          //是否中间点
          let isMiddle = isMiddles(children.length, parseInt(children.length / 2), children.length % 2, num3);
          //开始计算折现点位
          let lines3 = children[j].lines;
          let line3 = new Array();
          let high3 = 0;
          if (isHigh(children.length, parseInt(children.length / 2), children.length % 2, num3)) {
            high3 = this.highSize;
          }
          let drift = 15;
          if (isMiddle && children.length % 2 == 1) {
            drift = 25;
            twolength = 40;
          }
          for (let lnum3 = 0; lnum3 < lines3.length; lnum3++) {
            if (lnum3 == 0) {
              line3.push(
                this.getLineXY(
                  3,
                  children.length,
                  num3,
                  twoX,
                  twoY,
                  this.twoSize,
                  onelength * 0.8,
                  this.threeSize,
                  threeX,
                  threeY,
                  direction,
                  2 - high3,
                  0,
                  lines3[lnum3].name,
                  lines3[lnum3].chargingStation,
                  lines3[lnum3].chargingStationStatus,
                  lines3[lnum3].id,
                  lines3[lnum3].imTagBoList
                )
              );
            } else {
              line3.push(
                this.getLineXY(
                  3,
                  children.length,
                  num3,
                  twoX,
                  twoY,
                  this.twoSize,
                  onelength * 0.8,
                  this.threeSize,
                  threeX,
                  threeY,
                  direction,
                  this.middleSize - high3,
                  drift,
                  lines3[lnum3].name,
                  lines3[lnum3].chargingStation,
                  lines3[lnum3].chargingStationStatus,
                  lines3[lnum3].id,
                  lines3[lnum3].imTagBoList

                )
              );
            }
          }
          //结束计算折现点位

          //不加偏转
          // xy.push({x:threeX,y:threeY,name:children[j].name,source:source,line:line3,isMiddle:isMiddle,chargingStation:children[j].chargingStation})
          //加偏转
          xy.push(
            this.deflectionXY(
              this.zeroX,
              this.zeroY,
              threeX,
              threeY,
              children[j].name,
              source,
              line3,
              isMiddle,
              children[j].chargingStation,
              children[j].chargingStationStatus,
              children[j].anomaly,
              children[j].suspectedAnomaly,
              direction,
              children[j].id,
              children[j].imTagBoList,
              children[j].extendData
            )
          );
          num3++;
        }
        //三级图标处理结束
        num++;
      }
      console.log(xy, 'xxxxxxxxx')
      return xy;
    },
    getLineXY(
      level,
      totalNum,
      num,
      oX,
      oY,
      oSize,
      oLength,
      tSize,
      tX,
      tY,
      direction,
      middleSize,
      drift,
      name,
      chargingStation,
      chargingStationStatus,
      id, imTagBoList
    ) {
      let lineStartPoint = { x: 0, y: 0 };
      let lineTwoPoint = { x: 0, y: 0 };
      let lineThreePoint = { x: 0, y: 0 };
      let lineEndPoint = { x: 0, y: 0 };
      let middle = Math.floor(totalNum / 2);
      let ys = totalNum % 2;
      if (direction == "up") {
        if (ys != 0 && num == middle) {
          lineStartPoint = { x: oX + drift, y: level == 1 ? oY + 53 + 20 : oY + 53 };
        } else {
          if (num >= middle && ys == 0) {
            lineStartPoint = {
              x:
                (num - middle + 1) * oLength + oX >= oX
                  ? (num - middle + 1) * oLength + oX + drift
                  : (num - middle + 1) * oLength + oX - drift,
              y: level == 1 ? oY + 53 + 20 : oY + 53,
            };
          } else {
            lineStartPoint = {
              x:
                (num - middle) * oLength + oX >= oX
                  ? (num - middle) * oLength + oX + drift
                  : (num - middle) * oLength + oX - drift,
              y: level == 1 ? oY + 53 + 20 : oY + 53,
            };
          }
        }
        if (level == 1) {
          lineEndPoint = { x: tX >= oX ? tX + drift : tX - drift, y: tY - tSize };
        } else {
          lineEndPoint = { x: tX >= oX ? tX + drift : tX - drift, y: tY - tSize + 20 };
        }

        lineTwoPoint = {
          x: lineStartPoint.x,
          y: (lineEndPoint.y - lineStartPoint.y) / middleSize + lineStartPoint.y,
        };
        lineThreePoint = {
          x: lineEndPoint.x,
          y: (lineEndPoint.y - lineStartPoint.y) / middleSize + lineStartPoint.y,
        };
      } else if (direction == "down") {
        if (ys != 0 && num == middle) {
          lineStartPoint = { x: oX + drift, y: level == 1 ? oY - 53 : oY - 53 + 20 };
        } else {
          if (num >= middle && ys == 0) {
            lineStartPoint = {
              x:
                (num - middle + 1) * oLength + oX >= oX
                  ? (num - middle + 1) * oLength + oX + drift
                  : (num - middle + 1) * oLength + oX - drift,
              y: level == 1 ? oY - 53 : oY - 53 + 20,
            };
          } else {
            lineStartPoint = {
              x:
                (num - middle) * oLength + oX >= oX
                  ? (num - middle) * oLength + oX + drift
                  : (num - middle) * oLength + oX - drift,
              y: level == 1 ? oY - 53 : oY - 53 + 20,
            };
          }
        }
        if (level == 1) {
          lineEndPoint = { x: tX >= oX ? tX + drift : tX - drift, y: tY + tSize + 20 };
        } else {
          lineEndPoint = { x: tX >= oX ? tX + drift : tX - drift, y: tY + tSize - 20 };
        }
        // lineEndPoint = { x: tX >= oX ? tX + drift : tX - drift, y: tY + tSize };
        lineTwoPoint = {
          x: lineStartPoint.x,
          y: (lineEndPoint.y - lineStartPoint.y) / middleSize + lineStartPoint.y,
        };
        lineThreePoint = {
          x: lineEndPoint.x,
          y: (lineEndPoint.y - lineStartPoint.y) / middleSize + lineStartPoint.y,
        };
      } else if (direction == "left") {
        if (ys != 0 && num == middle) {
          lineStartPoint = { x: oX - oSize, y: oY + drift };
        } else {
          if (num >= middle && ys == 0) {
            lineStartPoint = {
              x: oX - oSize,
              y:
                (num - middle + 1) * oLength + oY >= oY
                  ? (num - middle + 1) * oLength + oY + drift
                  : (num - middle + 1) * oLength + oY - drift,
            };
          } else {
            lineStartPoint = {
              x: oX - oSize,
              y:
                (num - middle) * oLength + oY >= oY
                  ? (num - middle) * oLength + oY + drift
                  : (num - middle) * oLength + oY - drift,
            };
          }
        }
        if (level == 1) {
          lineEndPoint = { x: tX + tSize + 50, y: tY >= oY ? tY + drift : tY - drift };
        } else {
          lineEndPoint = { x: tX + tSize, y: tY >= oY ? tY + drift : tY - drift };
        }
        lineTwoPoint = {
          x: (lineEndPoint.x - lineStartPoint.x) / middleSize + lineStartPoint.x,
          y: lineStartPoint.y,
        };
        lineThreePoint = {
          x: (lineEndPoint.x - lineStartPoint.x) / middleSize + lineStartPoint.x,
          y: lineEndPoint.y,
        };
      } else if (direction == "right") {
        if (ys != 0 && num == middle) {
          lineStartPoint = { x: level == 1 ? oX + oSize + 20 : oX + oSize + 50, y: oY + drift };
        } else {
          if (num >= middle && ys == 0) {
            lineStartPoint = {
              x: level == 1 ? oX + oSize + 20 : oX + oSize + 50,
              y:
                (num - middle + 1) * oLength + oY >= oY
                  ? (num - middle + 1) * oLength + oY + drift
                  : (num - middle + 1) * oLength + oY - drift,
            };
          } else {
            lineStartPoint = {
              x: level == 1 ? oX + oSize + 20 : oX + oSize + 50,
              y:
                (num - middle) * oLength + oY >= oY
                  ? (num - middle) * oLength + oY + drift
                  : (num - middle) * oLength + oY - drift,
            };
          }
        }
        if (level == 1) {
          lineEndPoint = { x: tX - tSize - 10, y: tY >= oY ? tY + drift : tY - drift };
        } else {
          lineEndPoint = { x: tX - tSize, y: tY >= oY ? tY + drift : tY - drift };
        }

        lineTwoPoint = {
          x: (lineEndPoint.x - lineStartPoint.x) / middleSize + lineStartPoint.x,
          y: lineStartPoint.y,
        };
        lineThreePoint = {
          x: (lineEndPoint.x - lineStartPoint.x) / middleSize + lineStartPoint.x,
          y: lineEndPoint.y,
        };
      }

      let line = new Array();
      //不加偏转
      //  line.push(lineStartPoint);
      //  line.push(lineTwoPoint);
      //  line.push(lineThreePoint);
      //  line.push(lineEndPoint);
      //加偏转
      line.push(this.deflectionPoint(this.zeroX, this.zeroY, lineStartPoint.x, lineStartPoint.y));
      line.push(this.deflectionPoint(this.zeroX, this.zeroY, lineTwoPoint.x, lineTwoPoint.y));
      line.push(this.deflectionPoint(this.zeroX, this.zeroY, lineThreePoint.x, lineThreePoint.y));
      line.push(this.deflectionPoint(this.zeroX, this.zeroY, lineEndPoint.x, lineEndPoint.y));
      let res = {
        name: name,
        line: line,
        chargingStation,
        chargingStationStatus,
        id, imTagBoList
      };
      return res;
    },

    deflectionXY(
      zX,
      zY,
      pX,
      pY,
      name,
      source,
      line,
      isMiddle,
      chargingStation,
      chargingStationStatus,
      anomaly,
      suspectedAnomaly,
      direction, id, imTagBoList, extendData
    ) {
      //偏转后的X
      let deflectionX = (zX - pX) * Math.cos(this.angle) - (zY - pY) * Math.sin(this.angle) + pX;
      //偏转后的Y
      let deflectionY = (zX - pX) * Math.sin(this.angle) - (zY - pY) * Math.cos(this.angle) + pY;
      let point = {
        x:
          deflectionX > this.zeroX
            ? (deflectionX - this.zeroX) * this.flexX + this.zeroX
            : this.zeroX - (this.zeroX - deflectionX) * this.flexX,
        y:
          deflectionY > this.zeroY
            ? (deflectionY - this.zeroY) * this.flexY + this.zeroY
            : this.zeroY - (this.zeroY - deflectionY) * this.flexY,
        // x:deflectionX,
        // y:deflectionY,
        name, source, line, isMiddle, chargingStation, chargingStationStatus, anomaly, suspectedAnomaly, direction, id, imTagBoList, extendData
      };
      return point;
    },
    deflectionPoint(zX, zY, pX, pY) {
      //偏转后的X
      let deflectionX = (zX - pX) * Math.cos(this.angle) - (zY - pY) * Math.sin(this.angle) + pX;
      //偏转后的Y
      let deflectionY = (zX - pX) * Math.sin(this.angle) - (zY - pY) * Math.cos(this.angle) + pY;
      let point = {
        x:
          deflectionX > this.zeroX
            ? (deflectionX - this.zeroX) * this.flexX + this.zeroX
            : this.zeroX - (this.zeroX - deflectionX) * this.flexX,
        y:
          deflectionY > this.zeroY
            ? (deflectionY - this.zeroY) * this.flexY + this.zeroY
            : this.zeroY - (this.zeroY - deflectionY) * this.flexY,

      };
      console.log(point, '===============================2135')
      return point;
    },
  },
  destroyed() {
    document.getElementById("htCanvas").remove(this.view);
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';

::v-deep .x6-highlight-stroke {
  //  d: path("M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10");
  stroke: transparent;
  //  fill: rgba(255,255,255,0.1);
  //  transform: translate(10px,10px);
  // fill: url('./bg_10kv.png');
  fill: rgba(255, 255, 255, .1);
}
</style>
