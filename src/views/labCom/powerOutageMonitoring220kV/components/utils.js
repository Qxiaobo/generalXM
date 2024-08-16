import Vue from "vue";

export const isMiddles = (totalnum, middle, ys, nownum) => {
  let res = false;
  if (totalnum > 2) {
    if (nownum == middle && ys == 1) {
      //单数
      res = true;
    } else if ((nownum == middle || nownum == middle - 1) && ys == 0) {
      //双数
      // res=true
    }
  } else if (totalnum == 1) {
    res = true;
  }
  return res;
};

export const isHigh = (totalnum, middle, ys, nownum) => {
  let res = false;
  if (totalnum > 2 && totalnum <= 4) {
    if ((nownum == middle || nownum == middle - 1) && ys == 0) {
      //双数
      res = true;
    }
  } else if (totalnum > 4) {
    if ((nownum == 1 || nownum == 3) && ys == 1) {
      //双数
      res = true;
    }
  }
  return res;
};

// 统计各个站出现的次数（站点统计）
export const stationSum = (dataList) => {
  let obj = {
    //站点信息
    kv35Station: 0,
    kv110Station: 0,
    kv220Station: 0,
  };
  // dataList
  obj.kv35Station = [
    ...new Set(dataList.filter((item) => item.chargingStation == "35kv").map((items) => items.name.split("-")[0])),
  ].length;

  dataList.forEach((item) => {
    if (item.chargingStation == "110kv") obj.kv110Station += 1;
    if (item.chargingStation == "220kv") obj.kv220Station += 1;
  });

  return obj;
};

export const lineSum = (dataList, i) => {
  let obj = {
    //站点信息
    kv35Line: 0,
    kv110Line: 0,
    kv220Line: 0,
    kv10Line: 0,
  };
  let line = [];
  dataList.forEach((item) => {
    if (item.line.length) {
      line.push(item.line);
    }
  });
  line = line.flat(Infinity);
  console.log(line, "线路归纳");
  line.forEach((item) => {
    if (item.chargingStation == "35kv") obj.kv35Line += 1;
    if (item.chargingStation == "110kv") obj.kv110Line += 1;
    if (item.chargingStation == "220kv") obj.kv220Line += 1;
    if (item.chargingStation == "10kv") obj.kv10Line += 1;
  });
  // if (i) obj.kv220Station = 1
  // console.log(obj,'objobj');
  return obj;
};

export const lineSatusNum = (dataList) => {
  let obj = {
    //站点信息
    "110kv": 0,
    "35kv": 0,
    "10kv": 0,
  };
  let line = [];
  dataList.forEach((item) => {
    if (item.line.length) {
      line.push(item.line);
    }
  });
  line = line.flat(Infinity);
  console.log(line, "线路归纳状态");
  line.forEach((item) => {
    // if (item.name == '大板362线') {
    //     console.log(item,'lllllllllllll');
    // }
    if (item.chargingStationStatus == "2") {
      // console.log(item.name);
      // console.log(item,'itemitemitem')
      obj[item.chargingStation] += 1;
    }
  });

  return obj;
};

// 判断谷歌浏览器版本
export const getChromeVersion = () => {
  let Sys = {};
  let ua = navigator.userAgent.toLowerCase();
  let s;
  (s = ua.match(/edg\/([\d.]+)/))
    ? (Sys.edg = s[1])
    : (s = ua.match(/firefox\/([\d.]+)/))
    ? (Sys.firefox = s[1])
    : (s = ua.match(/chrome\/([\d.]+)/))
    ? (Sys.chrome = s[1])
    : (s = ua.match(/opera.\/([\d.]+)/))
    ? (Sys.opera = s[1])
    : (s = ua.match(/version\/([\d.]+).*safarri/))
    ? (Sys.opera = s[1])
    : 0;
  return +(Sys?.chrome?.split(".")[0] >= 103);
  //  console.log(Sys,'SysSysSys')
};

// 中断请求

export const clearHttpRequestingList = () => {
  if (Vue.$httpRequestList.length > 0) {
    Vue.$httpRequestList.forEach((item) => {
      item("interrupt");
    });
    Vue.$httpRequestList = [];
  }
};

export const echartsPie = (echarts, value, color) => {
  console.log(value, "valuevaluevalue");
  let option = {
    title: {
      text: "{a|" + value.offNum + "}{c|\n" + "未复电数" + "}",
      x: "center",
      y: "center",
      textStyle: {
        rich: {
          a: {
            fontSize: 15,
            color,
            fontWeight: "bold",
          },
          c: {
            fontSize: 10,
            color,
            fontWeight: "normal",
          },
        },
      },
    },
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    series: [
      //内环
      {
        name: "内环",
        type: "pie",
        silent: false,
        clockwise: true,
        radius: ["0%", "55%"],
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        itemStyle: {
          color: "rgba(255,255,255,0.1)",
        },
        data: [0],
      },
      //外环
      {
        name: "",
        type: "pie",
        radius: ["66%", "68%"],
        silent: true,
        clockwise: true,
        startAngle: 90,
        label: {
          show: false,
        },
        data: [
          {
            value: value.totalNum,
            itemStyle: {
              normal: {
                //外环发光
                // borderWidth: 0.5,
                shadowBlur: 10,
                //   borderColor:color,
                //   shadowColor:color,
                color: {
                  // 圆环的颜色
                  colorStops: [
                    {
                      offset: 0,
                      color, // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color, // 100% 处的颜色
                    },
                  ],
                },
              },
            },
          },

          {
            value: 0,
            label: {
              normal: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                color,
              },
            },
          },
        ],
      },
      //最外环
      {
        name: "",
        type: "pie",
        radius: ["59%", "63%"],
        silent: true,
        clockwise: true,
        startAngle: 90,
        label: {
          show: false,
        },
        data: [
          {
            value: value.totalNum,
            itemStyle: {
              normal: {
                //外环发光
                borderWidth: 1,
                shadowBlur: 20,
                borderColor: color,
                shadowColor: color,
                color: {
                  // 圆环的颜色
                  colorStops: [
                    {
                      offset: 0,
                      color: color, // 0% 处的颜色
                    },
                    {
                      offset: 0.5,
                      color, // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color, // 100% 处的颜色
                    },
                  ],
                },
              },
            },
          },

          {
            value: 100 - value < 0 ? 0 : 100 - value,
            label: {
              normal: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                color: "rgba(255,255,255,0)",
              },
            },
          },
        ],
      },
    ],
  };

  echarts.setOption(option);
  window.addEventListener("resize", () => {
    echarts.resize();
  });
 return  echarts
};
export const colSecond = (echarts, xData, arrData) => {
  let option = {
    backgroundColor: "#24435f",
    tooltip: {
      trigger: "axis",
    },
    legend: {
      itemHeight: 8,
      itemWidth: 14,
      icon: "rect",
      right: "10",
      top: "20",
      textStyle: {
        color: "#fff",
      },
    },
    grid: {
      x: 100,
      y: 38,
      x2: 60,
      y2: 30,
    },
    xAxis: {
      axisLine: {
        show: false,
        lineStyle: {
          color: "rgba(255,255,255,.4)",
        },
      },
      axisLabel: {
        textStyle: {
          color: "#fff",
        },
      },
      show: true,
      type: "value",
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(255,255,255,.2)",
        },
      },
    },
    yAxis: {
      data: xData.reverse(),
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,.2)",
        },
      },
      axisLabel: {
        textStyle: {
          color: "#fff",
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    dataZoom: [
      // {
      //   type: 'inside',
      //   yAxisIndex:[0]
      // }
      {
        type: "slider",
        show: true,
        realTime: true,
        width: 8,
        yAxisIndex: 0,
        right: "5%",
        start: 100,
        end: xData.length < 3 ? 0 : xData.length <= 20 ? 80 : 90,
        textStyle: {
          color: "#fff",
        },
      },
      {
        type: "inside",
        yAxisIndex: 0,

        zoomOnMouseWheel: false,
        moveOnMouseMove: true,
        moveOnMouseWheel: true,
      },
    ],
    series: [
      {
        name: "专线",
        type: "bar",
        stack: "all",
        barWidth: 22,
        data: arrData[0].reverse(),
        // 设置柱状图渐变
        itemStyle: {
          color: "#07d2e0",
        },
      },
      {
        name: "专变",
        type: "bar",
        stack: "all",
        barWidth: 22,
        data: arrData[1].reverse(),
        itemStyle: {
          color: "#088cd7",
        },
      },

      {
        name: "公变",
        type: "bar",
        stack: "all",
        barWidth: 22,
        data: arrData[2].reverse(),
        itemStyle: {
          color: "#d4db35",
        },
      },
      {
        name: "低压",
        type: "bar",
        stack: "all",
        barWidth: 22,
        data: arrData[3].reverse(),
        itemStyle: {
          color: "#1bca9a",
        },
      },
    ],
  };

  echarts.setOption(option);

  window.addEventListener("resize", () => {
    echarts.resize();
  });
  return echarts;
};
export const abnormalPower = (echarts, xData, arrData) => {
  let option = {
    backgroundColor: "#24435f",
    tooltip: {
      trigger: "axis",
    },
    legend: {
      itemHeight: 8,
      itemWidth: 14,
      icon: "rect",
      left: "60%",
      top: "20",
      textStyle: {
        color: "#fff",
      },
      type: "scroll",
      pageTextStyle: {
        color: "#fff",
      },
      pageIconColor: "#27aca4",
      pageIconInactiveColor: "#666",
    },
    grid: {
      x: 100,
      y: 38,
      x2: 60,
      y2: 30,
    },
    xAxis: {
      axisLine: {
        show: false,
        lineStyle: {
          color: "rgba(255,255,255,.4)",
        },
      },
      axisLabel: {
        textStyle: {
          color: "#fff",
        },
      },
      show: true,
      type: "value",
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(255,255,255,.2)",
        },
      },
    },
    yAxis: {
      data: xData.reverse(),
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,.2)",
        },
      },
      axisLabel: {
        textStyle: {
          color: "#fff",
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    dataZoom: [
      // {
      //   type: 'inside',
      //   yAxisIndex:[0]
      // }
      {
        type: "slider",
        show: true,
        realTime: true,
        width: 8,
        yAxisIndex: 0,
        right: "5%",
        start: 100,
        end: xData.length < 3 ? 0 : xData.length <= 20 ? 80 : 90,
        textStyle: {
          color: "#fff",
        },
      },
      {
        type: "inside",
        yAxisIndex: 0,

        zoomOnMouseWheel: false,
        moveOnMouseMove: true,
        moveOnMouseWheel: true,
      },
    ],
    series: [
      {
        name: "频繁停电",
        type: "bar",
        stack: "all",
        barWidth: 22,
        data: arrData[0].reverse(),
        // 设置柱状图渐变
        itemStyle: {
          color: "#07d2e0",
        },
      },
      {
        name: "闪停",
        type: "bar",
        stack: "all",
        barWidth: 22,
        data: arrData[1].reverse(),
        itemStyle: {
          color: "#088cd7",
        },
      },

      {
        name: "7天内停电次数超过7次",
        type: "bar",
        stack: "all",
        barWidth: 22,
        data: arrData[2].reverse(),
        itemStyle: {
          color: "#d4db35",
        },
      },
      {
        name: "7天内停电次数超过14次",
        type: "bar",
        stack: "all",
        barWidth: 22,
        data: arrData[3].reverse(),
        itemStyle: {
          color: "#1bca9a",
        },
      },
    ],
  };

  echarts.setOption(option);
  window.addEventListener("resize", () => {
    echarts.resize();
  });
  return echarts;
};
// 内部页面分页的10kv坐标处理
export const station_10kvCoord = (num) => {
  let clickData = [];
  if (num == 4) {
    clickData = [
      {
        x: 595.3812138970477,
        y: 527.608893711123,
        name: "",
        source: "雄县站",
        direction: "up",
        line: [
          {
            name: "",
            line: [
              {
                x: 924.9441309844141,
                y: 447.9299727546164,
              },
              {
                x: 824.0791078330198,
                y: 503.072562949665,
              },
              {
                x: 731.5268956524771,
                y: 450.9169930805537,
              },
              {
                x: 633.671872501083,
                y: 506.0375832754037,
              },
            ],
          },
        ],
      },
      {
        x: 808.98763,
        y: 647.94562,
        direction: "up",
        name: "",
        source: "雄县站",

        line: [
          {
            name: "",
            line: [
              {
                x: 950.4274912,
                y: 463.9740776,
              },
              {
                x: 852.5671928,
                y: 519.10131677,
              },
              {
                x: 945.13027254,
                y: 571.24646018,
              },
              {
                x: 847.27629,
                y: 626.37104,
              },
            ],
          },
        ],
      },
      {
        x: 1131.5380968,
        y: 637.91437,
        name: "",
        source: "雄县站",
        direction: "right",
        line: [
          {
            name: "",
            line: [
              {
                x: 1010.0771254 + 20,
                y: 454.4340671 + 23,
              },
              {
                x: 1111.18498254-15,
                y: 511.3937671,
              },
              {
                x: 1009.0739254-15,
                y: 568.919990018,
              },
              {
                x: 1110.1926-15,
                y: 625.8726,
              },
            ],
          },
        ],
      },

      {
        x: 1386.809926,
        y: 494.1039926,
        direction: "right",
        name: "",
        source: "雄县站",

        line: [
          {
            name: "",
            line: [
              {
                x: 1061.1278254 + 20,
                y: 425.6764671 + 23,
              },
              {
                x: 1162.23455254-15,
                y: 482.62361671,
              },
              {
                x: 1264.3466254-15,
                y: 425.1109018,
              },
              {
                x: 1365.4526-15,
                y: 482.0626,
              },
            ],
          },
        ],
      },
    ];
    clickData.forEach((e) => {
      e.x -= 35;
      e.y += 45;
      e.line[0].line.forEach((item) => {
        item.x -= 35;
        item.y += 45;
      });
    });
  }
  if (num == 3) {
    // clickData.pop()
    clickData = [
      {
        x: 312.2303763,
        y: 626.9573225,
        name: "",
        source: "雄县站",
        direction: "up",
        line: [
          {
            name: "",
            line: [
              {
                x: 921.94130544,
                y: 447.92953174,
              },
              {
                x: 696.453041475,
                y: 574.9674649425,
              },
              {
                x: 550.4834364358,
                y: 492.735169405412,
              },
              {
                x: 324.998861624,
                y: 619.7623379691,
              },
            ],
          },
        ],
      },
      {
        x: 549.02113763,
        y: 674.062148405,
        name: "",
        source: "雄县站",
        isMiddle: true,
        direction: "up",
        line: [
          {
            name: "",
            line: [
              {
                x: 936.182245843,
                y: 455.952154969,
              },
              {
                x: 752.17499198,
                y: 559.61405282,
              },
              {
                x: 752.1751276,
                y: 559.61405282,
              },
              {
                x: 568.16635176,
                y: 663.276485302,
              },
            ],
          },
        ],
      },

      {
        x: 785.806203763,
        y: 721.171488562,
        direction: "up",
        name: "",
        source: "雄县站",

        line: [
          {
            name: "",
            line: [
              {
                x: 950.52224912,
                y: 463.974538776,
              },
              {
                x: 807.8965928,
                y: 544.267754677,
              },
              {
                x: 953.85998254,
                y: 626.49768018,
              },
              {
                x: 811.33392629,
                y: 706.790104,
              },
            ],
          },
        ],
      },
      // {
      //         "x": 1254.80968,
      //         "y": 489.82437,
      //         name: "",
      //         source: "雄县站",
      //         line: [

      //           {
      //             name: "",
      //             line: [
      //               {
      //                 "x": 1093.98254,
      //                 "y": 435.14671
      //               },
      //               {
      //                 "x": 1138.98254,
      //                 "y": 456.14671
      //               },
      //               {
      //                 "x": 1179.98254,
      //                 "y": 472.68018
      //               },
      //               {
      //                 "x": 1232.9926,
      //                 "y": 493.9926
      //               }

      //             ],
      //           },
      //         ],
      //       }
    ];
    clickData.forEach((e) => {
      e.line[0].line[0].x -= 108;
      e.line[0].line[0].y += 60;
    });
    clickData.forEach((e) => {
      e.x += 55;
      e.y -= 35;
      e.line[0].line.forEach((item) => {
        item.x += 55;
        item.y -= 35;
      });
    });
  }

  if (window.innerHeight == 1080) {
    clickData.forEach((e) => {
      e.x += 15;
      e.y += 55;
      e.line[0].line.forEach((item) => {
        item.x += 15;
        item.y += 55;
      });
    });
  }
  return clickData;
};

export const isNbLineXY = (nodeList, centerNode) => {
  // 雄雄I线
  nodeList.forEach((item) => {
    if(centerNode=='big'){
     if(item.name.includes("昝岗站")||item.name.includes("温泉城站")){
      item.line[0].line[0].x = item.line[0].line[0].x+30;
      item.line[0].line[0].y =  item.line[0].line[0].y+15;
      item.line[0].line[1].x = item.line[0].line[1].x+30;
      item.line[0].line[1].y =  item.line[0].line[1].y+15;
     }
      if (item.name.includes("雄县站") ){
        item.line[1].line[1].x = item.line[1].line[1].x-70;
        item.line[1].line[1].y =  item.line[1].line[1].y+35;
        item.line[1].line[2].x = item.line[1].line[2].x-70;
        item.line[1].line[2].y =  item.line[1].line[2].y+35;
      }
      if (item.name.includes("东阳站") ){
        console.log(item)
        item.line[0].line[0].x = item.line[0].line[0].x+50;
        item.line[0].line[0].y =  item.line[0].line[0].y-20;
        item.line[0].line[1].x = item.line[0].line[1].x+45;
        item.line[0].line[1].y =  item.line[0].line[1].y-25;
      }
        if (item.name.includes("北沙站") ){
        console.log(item)
        item.line[0].line[0].x = item.line[0].line[0].x+25;
        item.line[0].line[0].y =  item.line[0].line[0].y-10;
        item.line[0].line[1].x = item.line[0].line[1].x+25;
        item.line[0].line[1].y =  item.line[0].line[1].y-15;
      }
         if (item.name.includes("板东站")&&item.source== "雄州大营站" ){
        item.line[0].line[0].x = item.line[0].line[0].x-40;
        item.line[0].line[0].y =  item.line[0].line[0].y+20;
        item.line[0].line[1].x = item.line[0].line[1].x-40;
        item.line[0].line[1].y =  item.line[0].line[1].y+20;
        // item.line[0].line[2].x = item.line[1].line[2].x-70;
        // item.line[10].line[2].y =  item.line[1].line[2].y+35;
      }
      if (item.name.includes("米北站")&&item.source== "雄州大营站" ){
        item.line[0].line[0].x = item.line[0].line[0].x-60;
        item.line[0].line[0].y =  item.line[0].line[0].y+30;
        item.line[0].line[1].x = item.line[0].line[1].x-70;
        item.line[0].line[1].y =  item.line[0].line[1].y+30;
        // item.line[0].line[2].x = item.line[1].line[2].x-70;
        // item.line[10].line[2].y =  item.line[1].line[2].y+35;
      }
      if(item.direction==='up'){
        if(item.chargingStation=='35kv'){
          item.x += 20;
          item.y += 20;
        }
   
        item.line.forEach((data) => {
          if(data.chargingStation=='35kv'){
            data.x += 20;
            data.y += 20;
          }


          data.line.forEach((e) => {
          if(data.chargingStation=='35kv'){

            e.x += 20;
            e.y += 20;
          }
          if(data.chargingStation=='110kv'){
            e.x += 10;
            // e.y -= 10;
          }
          });
        });
      }

     



    }
   else
    if( centerNode == "220kv"){
      if (item.name.includes("雄县站") ) {
        item.line[0].line[1].x = 710.3695164240415;
        item.line[0].line[1].y =  item.line[0].line[1].y-15;
        item.line[0].line[2].x = item.line[0].line[2].x -60;
        item.line[0].line[3].x = item.line[0].line[3].x -50;
        // item.line[0].line[2].y =  item.line[0].line[2].y+15;
        item.line[1].line[1].x =item.line[1].line[1].x-70;
        item.line[1].line[1].y =item.line[1].line[1].y-42;
        item.line[1].line[2].x =item.line[1].line[2].x-100;
        item.line[1].line[2].y =item.line[1].line[2].y-30;
        item.line[1].line[3].x =item.line[1].line[3].x-40;
     
        item.line[1].line.forEach((d) => {
          d.x -= 9;
        });
      }
  
      if (item.name.includes("龙湾站")) {
        item.line[0].line[2].x = item.line[0].line[2].x -60;
        item.line[0].line[2].y = item.line[0].line[2].y +20;
        item.line[0].line[3].x = item.line[0].line[3].x -60;
        item.line[0].line[3].y = item.line[0].line[3].y+ 20
        item.line[1].line[1].x = item.line[1].line[1].x-10;
        item.line[1].line[2].x = item.line[1].line[2].x -75;
        item.line[1].line[2].y = item.line[1].line[2].y +20;
        item.line[1].line[3].x = item.line[1].line[3].x -75;
        item.line[1].line[3].y = item.line[1].line[3].y+ 20
  
      }
      if (item.name.includes("南留站")) {
        item.line[0].line[2].x = item.line[0].line[2].x+20;
        item.line[0].line[2].y = item.line[0].line[2].y -10;
        item.line[0].line[1].x = item.line[0].line[1].x -20;
        item.line[0].line[1].y = item.line[0].line[1].y -20;
        item.line[0].line[0].x = item.line[0].line[0].x -20;
        item.line[0].line[0].y = item.line[0].line[0].y -5;
      }
      if (item.name.includes("昝岗站") )  {
        item.line[0].line[0].x = item.line[0].line[0].x +50;
        item.line[0].line[0].y = item.line[0].line[0].y +8;
        item.line[0].line[1].x = item.line[0].line[1].x +20;
        item.line[0].line[1].y = item.line[0].line[1].y -10;
      }
      if (item.name.includes("白沟站") )  {
        item.line[0].line[0].x = item.line[0].line[0].x +80;
        item.line[0].line[0].y = item.line[0].line[0].y -10;
        item.line[0].line[1].x = item.line[0].line[1].x + 45;
        item.line[0].line[1].y = item.line[0].line[1].y -30;
      }
      if (item.name.includes("雄州大营站"))  {
        item.line[0].line[0].x = item.line[0].line[0].x-5;
        item.line[0].line[0].y = item.line[0].line[0].y -15;
        item.line[0].line[1].x = item.line[0].line[1].x - 10;
        item.line[0].line[1].y = item.line[0].line[1].y -10;
      }
  
      if (item.name.includes("平王"))  {
        item.line[0].line[0].x = item.line[0].line[0].x-5;
        item.line[0].line[0].y = item.line[0].line[0].y -15;
        item.line[0].line[1].x = item.line[0].line[1].x - 10;
        item.line[0].line[1].y = item.line[0].line[1].y -10;
      }
       if (item.name.includes("荷露站") )  {
        item.line[0].line[0].x = item.line[0].line[0].x-5;
        item.line[0].line[0].y = item.line[0].line[0].y -12;
      }
       if (item.name.includes("昝岗1号站"))  {
        item.line[0].line[0].x = item.line[0].line[0].x-45;
        item.line[0].line[0].y = item.line[0].line[0].y +12;
        item.line[0].line[1].x = item.line[0].line[1].x-30;
        item.line[0].line[1].y = item.line[0].line[1].y +30;
        item.line[0].line[2].x = item.line[0].line[2].x+20;
        // item.line[0].line[2].y = item.line[0].line[2].y +30;
      }
      if (item.name.includes("铺南站") )  {
        item.line[0].line[0].x = item.line[0].line[0].x-50;
        item.line[0].line[0].y = item.line[0].line[0].y +16;
        item.line[0].line[1].x = item.line[0].line[1].x-45;
        item.line[0].line[1].y = item.line[0].line[1].y +25;
      }
       if ((item.name.includes("温泉城站") )) {
        // item.line[0].line[0].x = item.line[0].line[0].x-50;
        // item.line[0].line[0].y = item.line[0].line[0].y +16;
        item.line[0].line[3].x = item.line[0].line[3].x-15;
        item.line[0].line[3].y = item.line[0].line[3].y -10;
      }
      if (item.name.includes("东开站") ) {
        item.line.forEach((data) => {
          data.line.forEach((e) => {
            e.x -= 10;
            e.y -= 10;
          });
        });
      }
      if (item.chargingStation === "35kv" ) {
        // item.x-=10
        item.y += 20;
        item.line[0].line.forEach((e) => {
          // e.x-=10
          e.y += 20;
        });
      }
    }else if (centerNode == "110kv"){

    }
    // if (item.name.includes("雄县站") && centerNode == "220kv") {
    //   item.line[0].line[1].x = 710.3695164240415;
    //   item.line[0].line[1].y =  item.line[0].line[1].y-15;
    //   item.line[0].line[2].x = item.line[0].line[2].x -60;
    //   item.line[0].line[3].x = item.line[0].line[3].x -50;
    //   // item.line[0].line[2].y =  item.line[0].line[2].y+15;
    //   item.line[1].line[1].x =item.line[1].line[1].x-70;
    //   item.line[1].line[1].y =item.line[1].line[1].y-42;
    //   item.line[1].line[2].x =item.line[1].line[2].x-100;
    //   item.line[1].line[2].y =item.line[1].line[2].y-30;
    //   item.line[1].line[3].x =item.line[1].line[3].x-40;
   
    //   item.line[1].line.forEach((d) => {
    //     d.x -= 9;
    //   });
    // }

    // if (item.name.includes("龙湾站") && centerNode == "220kv") {
    //   item.line[0].line[2].x = item.line[0].line[2].x -60;
    //   item.line[0].line[2].y = item.line[0].line[2].y +20;
    //   item.line[0].line[3].x = item.line[0].line[3].x -60;
    //   item.line[0].line[3].y = item.line[0].line[3].y+ 20
    //   item.line[1].line[1].x = item.line[1].line[1].x-10;
    //   item.line[1].line[2].x = item.line[1].line[2].x -75;
    //   item.line[1].line[2].y = item.line[1].line[2].y +20;
    //   item.line[1].line[3].x = item.line[1].line[3].x -75;
    //   item.line[1].line[3].y = item.line[1].line[3].y+ 20

    // }
    // if (item.name.includes("南留站") && centerNode == "220kv") {
    //   item.line[0].line[2].x = item.line[0].line[2].x+20;
    //   item.line[0].line[2].y = item.line[0].line[2].y -10;
    //   item.line[0].line[1].x = item.line[0].line[1].x -20;
    //   item.line[0].line[1].y = item.line[0].line[1].y -20;
    //   item.line[0].line[0].x = item.line[0].line[0].x -20;
    //   item.line[0].line[0].y = item.line[0].line[0].y -5;
    // }
    // if (item.name.includes("昝岗站") && centerNode == "220kv")  {
    //   item.line[0].line[0].x = item.line[0].line[0].x +50;
    //   item.line[0].line[0].y = item.line[0].line[0].y +8;
    //   item.line[0].line[1].x = item.line[0].line[1].x +20;
    //   item.line[0].line[1].y = item.line[0].line[1].y -10;
    // }
    // if (item.name.includes("白沟站") && centerNode == "220kv")  {
    //   item.line[0].line[0].x = item.line[0].line[0].x +80;
    //   item.line[0].line[0].y = item.line[0].line[0].y -10;
    //   item.line[0].line[1].x = item.line[0].line[1].x + 45;
    //   item.line[0].line[1].y = item.line[0].line[1].y -30;
    // }
    // if (item.name.includes("雄州大营站") && centerNode == "220kv")  {
    //   item.line[0].line[0].x = item.line[0].line[0].x-5;
    //   item.line[0].line[0].y = item.line[0].line[0].y -15;
    //   item.line[0].line[1].x = item.line[0].line[1].x - 10;
    //   item.line[0].line[1].y = item.line[0].line[1].y -10;
    // }

    // if (item.name.includes("平王") && centerNode == "220kv")  {
    //   item.line[0].line[0].x = item.line[0].line[0].x-5;
    //   item.line[0].line[0].y = item.line[0].line[0].y -15;
    //   item.line[0].line[1].x = item.line[0].line[1].x - 10;
    //   item.line[0].line[1].y = item.line[0].line[1].y -10;
    // }
    //  if (item.name.includes("荷露站") && centerNode == "220kv")  {
    //   item.line[0].line[0].x = item.line[0].line[0].x-5;
    //   item.line[0].line[0].y = item.line[0].line[0].y -12;
    // }
    //  if (item.name.includes("昝岗1号站") && centerNode == "220kv")  {
    //   item.line[0].line[0].x = item.line[0].line[0].x-45;
    //   item.line[0].line[0].y = item.line[0].line[0].y +12;
    //   item.line[0].line[1].x = item.line[0].line[1].x-30;
    //   item.line[0].line[1].y = item.line[0].line[1].y +30;
    //   item.line[0].line[2].x = item.line[0].line[2].x+20;
    //   // item.line[0].line[2].y = item.line[0].line[2].y +30;
    // }
    // if (item.name.includes("铺南站") && centerNode == "220kv")  {
    //   item.line[0].line[0].x = item.line[0].line[0].x-50;
    //   item.line[0].line[0].y = item.line[0].line[0].y +16;
    //   item.line[0].line[1].x = item.line[0].line[1].x-45;
    //   item.line[0].line[1].y = item.line[0].line[1].y +25;
    // }
    //  if ((item.name.includes("温泉城站") && centerNode == "220kv")) {
    //   // item.line[0].line[0].x = item.line[0].line[0].x-50;
    //   // item.line[0].line[0].y = item.line[0].line[0].y +16;
    //   item.line[0].line[3].x = item.line[0].line[3].x-15;
    //   item.line[0].line[3].y = item.line[0].line[3].y -10;
    // }
    // if (item.name.includes("东开站") && centerNode == "220kv") {
    //   item.line.forEach((data) => {
    //     data.line.forEach((e) => {
    //       e.x -= 10;
    //       e.y -= 10;
    //     });
    //   });
    // }
    // if (item.chargingStation === "35kv" && centerNode == "220kv") {
    //   // item.x-=10
    //   item.y += 20;
    //   item.line[0].line.forEach((e) => {
    //     // e.x-=10
    //     e.y += 20;
    //   });
    // }
    if (item.name.includes("雄县站") || (item.name.includes("温泉城站") && centerNode == "220kv")) {
      item.line.forEach((data) => {
        data.line.forEach((e) => {
          e.x += 20;
          e.y += 20;
        });
      });
    }

   


    if (
      (item.name.includes("昝岗站") && centerNode == "node1")
    ) {
      item.x += 20;
      item.y -= 20;
      item.line[0].line.forEach((e) => {
        e.x += 20;
        e.y -= 20;
      });
    }
    if (
      (item.name.includes("荷露站") && centerNode == "node1") ||
      (item.name.includes("羊定站") && centerNode == "220kv") ||
      (item.name.includes("奥威站") && centerNode == "220kv")
    ) {
      item.x -= 10;
      item.y += 10;
      item.line[0].line.forEach((e) => {
        e.x -= 10;
        e.y += 10;
      });
    }
  
  });
};

export const getAngle = (p1, p2) => {
  const deltaX = p2.x - p1.x;
  const deltaY = p2.y - p1.y;
  const radians = Math.atan2(deltaY, deltaX);
  return (radians * 180) / Math.PI;
};

export const stationHtml_antv = (anomaly, suspectedAnomaly) => {
  var div = document.createElement("div");
  let iframe = document.createElement("div");
  // iframe.src = cache.url = protocol + '//www.hightopo.com';
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  // const list = dataList
  let bg = require("./symbols/anomaly_window.png");
  let miniBg = require("./symbols/anomaly_window_mini.png");
  if (anomaly && !suspectedAnomaly) {
    iframe.innerHTML = `
        <div style="width:135px;height:80px; background:url(${miniBg}) 100% 18%  no-repeat; padding:10px 10px 10px 10px; display: flex; flex-direction: column; color: #fff; font-size: 14px; ">
          <div   style="padding:4px 0 0 10px; cursor: pointer;"  >  <span style="color:#fff;font-weight:700; cursor: pointer;  " > 停电</span>    &nbsp;  &nbsp;    &nbsp;&nbsp;  &nbsp;  <p style="display:inline-block;background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >${anomaly}</p> </div>
        </div>
        `;
  } else if (!anomaly && suspectedAnomaly) {
    iframe.innerHTML = `
        <div style="width:135px;height:80px;  background:url(${miniBg}) 100% 18%  no-repeat;  padding:10px 10px 10px 10px; display: flex; flex-direction: column; color: #fff; font-size: 14px; ">
          <div  style="padding:4px 0 0 10px; cursor: pointer;"  >  <span  style="color:#fff;font-weight:700; cursor: pointer;  " > 疑似停电</span>      &nbsp;&nbsp;  &nbsp;  <p style="background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;cursor: pointer; display:inline-block"  >${suspectedAnomaly}</p> </div>
        </div> `;
  } else if (anomaly && suspectedAnomaly) {
    iframe.innerHTML = `
        <div style="width:135px;height:90px;  background:url(${bg}) 100% 100%  no-repeat;  padding:10px 10px 10px 10px; display: flex; flex-direction: column; color: #fff; font-size: 14px; ">
          
        <div style=" font-weight:700; text-align:center; font-size:15px;background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >  </div>
          <div   style="padding:4px 0 0 10px; cursor: pointer;"  >  <span style="color:#fff;font-weight:700; cursor: pointer;  " > 停电</span>    &nbsp;  &nbsp;    &nbsp;&nbsp;  &nbsp;  <p style="display:inline-block;background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >${anomaly}</p> </div>
          <div  style="padding:4px 0 0 10px; cursor: pointer;"  >  <span  style="color:#fff;font-weight:700; cursor: pointer;  " > 疑似停电</span>      &nbsp;&nbsp;  &nbsp;  <p style="background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;cursor: pointer; display:inline-block"  >${suspectedAnomaly}</p> </div>
        </div>`;
  }

  div.appendChild(iframe);
  return div;
};

export const edgeAnimation = (edge, Timing, reverse) => {
  // console.log(reverse,'reversereverse')
  let time = reverse ? 0 : 1;
  let atConnectionRatio = reverse ? 1 : 0;
  const options = {
    duration: 5000,
    timing: Timing.linear,
    complete: (p) => {
      const attr = "arrow1";
      edge.updateAttrs(
        {
          [attr]: { atConnectionRatio: atConnectionRatio },
        },
        { silent: true }
      );
      edge.transition(p.path, time, options);
    },
    repeat: true,
  };
  // if(edge.data.name =="134雄大线"){
  //   vertices = line[i].line.reverse()
  //   [source,target] = [target,source]
  // }
  edge.transition("attrs/arrow1/atConnectionRatio", time, options);
  // edge.transition('attrs/arrow2/atConnectionRatio', 1, {...options,duration:2000})
};

export const lineAnomalyHtml_antv = (name, id) => {
  var div = document.createElement("div"),
    iframe = document.createElement("div");
  // iframe.src = cache.url = protocol + '//www.hightopo.com';
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  let bg = require("./symbols/anomalyLine_window.png");
  // const list = dataList
  iframe.innerHTML = `
<div  id=${id} style="width:195px;height:136px; background:url(${bg}) 100% 100%  no-repeat; padding:4px; display: flex; flex-direction: column; color: #fff; font-size: 6px; ">
<div   style="padding:4px; cursor: pointer;"  >  <p style="color:#fff" >${name}</p> </div>
</div>
`;
  div.appendChild(iframe);

  return div;
};

// 内部的10kv弹窗
export const htmlFunctionMap_antv = {
  get10kvHtml1: (dataList, id) => {
    var div = document.createElement("div");
    let iframe = document.createElement("div");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    const list = dataList;
    for(let k in list){
      if(list[k]==null)list[k] = 0
    }
    iframe.innerHTML = `
<div style="padding:25px 10px 10px 10px; display: flex; flex-direction: column; color: #fff; font-size: 14px;">
<div style="padding-top:6px; font-weight:700; text-align:center; font-size:15px;background:linear-gradient(0deg, #DCFAF9 0.1220703125%, #23AFFF 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" > ${list.title} </div>
<div style=" font-weight:700;padding-top:6px; text-align:center; font-size:15px;background:linear-gradient(0deg, #DCFAF9 0.1220703125%, #23AFFF 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" > 停电数/总数</div>
<div class=${id} id="zx" style="padding:6px 0 0 0px;    text-align: center;"  >  <span class=${id} id="zx"    style="color:#fff;font-weight:700; cursor: pointer;   " > ${list.zxName}</span>      
<p style="background:linear-gradient(0deg, #DCFAF9 0.1220703125%, #23AFFF 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block; cursor: pointer;" class=${id} id="zxTd"  > ${list.zxOffNum}</p>
&nbsp;/&nbsp;<p style="background:linear-gradient(0deg, #DCFAF9 0.1220703125%, #23AFFF 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block; cursor: pointer;" class=${id} id="zx"  > ${list.zxValue}</p>   </div>


<div class=${id} id="zb" style="padding:12px 0 0 0px; cursor: pointer;text-align: center; "  >  <span class=${id} id="zb"  style="color:#fff;font-weight:700;   cursor: pointer; " > ${list.zbName}</span>      
<p style="background:linear-gradient(0deg, #DCFAF9 0.1220703125%, #23AFFF 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block; cursor: pointer;" class=${id} id="zbTd"  > ${list.zbOffNum}</p>
&nbsp;/&nbsp;<p style="background:linear-gradient(0deg, #DCFAF9 0.1220703125%, #23AFFF 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block; cursor: pointer;" class=${id} id="zb"  > ${list.zbValue}</p>    </div>

<div class=${id} id="gb" style="padding:12px 0 0 0px; cursor: pointer; text-align: center;"  >  <span class=${id} id="gb" style="color:#fff;font-weight:700;    cursor: pointer;" > ${list.gbName}</span>      
<p style="background:linear-gradient(0deg, #DCFAF9 0.1220703125%, #23AFFF 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block; cursor: pointer;" class=${id} id="gbTd"  > ${list.gbOffNum}</p>
&nbsp;/&nbsp;<p style="background:linear-gradient(0deg, #DCFAF9 0.1220703125%, #23AFFF 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block;    cursor: pointer;" class=${id} id="gb"  > ${list.gbValue}</p> </div>

<div   style="cursor: pointer;padding:12px 0 0 0px;text-align: center;"  >  <span style="color:#fff;font-weight:700;"    > ${list.dyName}</span>   
<p class=${id} id="dyTd" style="cursor: pointer;background:linear-gradient(0deg, #DCFAF9 0.1220703125%, #23AFFF 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block; " > ${list.dyOffNum}</p>
&nbsp;/&nbsp;<p style="background:linear-gradient(0deg, #DCFAF9 0.1220703125%, #23AFFF 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block;cursor: unset; " > ${list.dyValue}</p> </div>
</div>
`;
    div.appendChild(iframe);
    let bg = require("./symbols/10kv_normalBg.png");
    div.style.backgroundImage = `url(${bg})`;
    div.style.backgroundRepeat = `no-repeat`;
    div.style.backgroundSize = `100% 100%`;
    div.style.height = `100%`;

    return div;
  },
  get10kvHtml2: (dataList, id) => {
    var div = document.createElement("div");
    let iframe = document.createElement("div");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    const list = dataList;
    for(let k in list){
      if(list[k]==null)list[k] = 0
    }
    // iframe.innerHTML = `
    //         <div style="padding:25px 10px 10px 10px; display: flex; flex-direction: column; color: #fff; font-size: 14px;"  class="doc">
    //           <div style=" font-weight:700; text-align:center; font-size:15px;background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" > ${list.title} </div>
    //           <div style=" font-weight:700;padding-top:3px; text-align:center; font-size:15px;background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" > 停电数/总数 </div>
    //           <div  class=${id} id="zx" style="padding:12px 0 0 10px" cursor: pointer; >  <span id="zx" class=${id} style="color:#fff;font-weight:700; cursor: pointer; " > ${list.zxName}</span>&nbsp;&nbsp;&nbsp;<p style="background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;cursor: pointer;display:inline-block" class=${id} id="zx" > ${list.zxValue}</p> </div>
    //           <div  class=${id} id="zb" style="padding:12px 0 0 10px" cursor: pointer; >  <span id="zb" class=${id} style="color:#fff;font-weight:700; cursor: pointer; " > ${list.zbName}</span>&nbsp;&nbsp;&nbsp;<p style="background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;cursor: pointer;display:inline-block" class=${id} id="zb" > ${list.zbValue}</p> </div>
    //           <div  class=${id} id="gb" style="padding:12px 0 0 10px" cursor: pointer; >  <span id="gb" class=${id} style="color:#fff;font-weight:700; cursor: pointer; " > ${list.gbName}</span>&nbsp;&nbsp;&nbsp;<p style="background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;cursor: pointer;display:inline-block" class=${id} id="gb" > ${list.gbValue}</p> </div>
    //           <div style="padding:12px 0 0 10px"  >  <span style="color:#fff;font-weight:700;   " > ${list.dyName}</span>&nbsp;&nbsp;&nbsp;<p style="background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block" > ${list.dyValue}</p> </div>
    //         </div>
    //         `;
    iframe.innerHTML = `
  <div style="padding:25px 10px 10px 10px; display: flex; flex-direction: column; color: #fff; font-size: 14px;"  class="doc">
    <div style="padding-top:6px; font-weight:700; text-align:center; font-size:15px;background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" > ${list.title} </div>

  <div style=" font-weight:700;padding-top:6px; text-align:center; font-size:15px;background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" > 停电数/总数</div>
  <div class=${id} id="zx" style="padding:6px 0 0 0px; text-align: center; "  >  <span class=${id} id="zx"    style="color:#fff;font-weight:700; cursor: pointer;   " > ${list.zxName}</span>     
   <p style="background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block; cursor: pointer;" class=${id} id="zxTd"  > ${list.zxOffNum}</p>
  &nbsp;/&nbsp;<p style="background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block; cursor: pointer;" class=${id} id="zx"  > ${list.zxValue}</p>   </div>


  <div class=${id} id="zb" style="padding:12px 0 0 0px; cursor: pointer;text-align: center; "  >  <span class=${id} id="zb"  style="color:#fff;font-weight:700;   cursor: pointer; " > ${list.zbName}</span>    
  <p style="background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block; cursor: pointer;" class=${id} id="zbTd"  > ${list.zbOffNum}</p>
  &nbsp;/&nbsp;<p style="background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block; cursor: pointer;" class=${id} id="zb"  > ${list.zbValue}</p>    </div>

  <div class=${id} id="gb" style="padding:12px 0 0 0px; cursor: pointer; text-align: center;"  >  <span class=${id} id="gb" style="color:#fff;font-weight:700;    cursor: pointer;" > ${list.gbName}</span>  
  <p style="background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block; cursor: pointer;" class=${id} id="gbTd"  > ${list.gbOffNum}</p>
  &nbsp;/&nbsp;<p style="background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block;    cursor: pointer;" class=${id} id="gb"  > ${list.gbValue}</p> </div>
    
  <div    style="padding:12px 0 0 0px;text-align: center;"  >  <span style="color:#fff;font-weight:700;  "   >${list.dyName}</span>      
   <p style=" cursor: pointer;background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block" class=${id} id="dyTd"> ${list.dyOffNum}</p>
   &nbsp;/&nbsp;<p style="background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block;"  > ${list.dyValue}</p> </div>
  
  
   </div>
  `;
    div.appendChild(iframe);
    let bg = require("./symbols/10kv_abnormalBg.png");
    div.style.backgroundImage = `url(${bg})`;
    div.style.backgroundRepeat = `no-repeat`;
    div.style.backgroundSize = `100% 100%`;
    div.style.height = `100%`;
    div.id = `get10kvHtml`;

    return div;
  },
  get10kvHtml3: (dataList, id) => {
    var div = document.createElement("div");
    let iframe = document.createElement("div");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    // console.log(id,'dataList');
    const list = dataList;
        for(let k in list){
      if(list[k]==null)list[k] = 0
    }
    //         iframe.innerHTML = `
    //    <div style="padding:25px 10px 10px 10px; display: flex; flex-direction: column; color: #fff; font-size: 14px;">
    //      <div style=" font-weight:700; text-align:center; font-size:15px;background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" > ${list.title} </div>
    //      <div style=" font-weight:700;padding-top:6px; text-align:center; font-size:15px;background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" > 停电数/总数</div>
    //      <div  class=${id} id="zx"  style="padding:12px 0 0 10px; cursor: pointer;"  >  <span class=${id} id="zx" style="color:#fff;font-weight:700; cursor: pointer;  " > ${list.zxName}</span>      &nbsp;&nbsp;  &nbsp;  <p style="background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;cursor: pointer; display:inline-block" class=${id} id="zx" > ${list.zxValue}</p> </div>
    //      <div class=${id}  id="zb" style="padding:12px 0 0 10px; cursor: pointer;"  >  <span class=${id}  id="zb" style="color:#fff;font-weight:700; cursor: pointer;  " > ${list.zbName}</span>      &nbsp;&nbsp;  &nbsp;  <p style="background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;cursor: pointer; display:inline-block" class=${id} id="zb" > ${list.zbValue}</p> </div>
    //      <div class=${id}  id="gb" style="padding:12px 0 0 10px; cursor: pointer;"  >  <span class=${id}  id="gb" style="color:#fff;font-weight:700; cursor: pointer;  " > ${list.gbName}</span>      &nbsp;&nbsp;  &nbsp;  <p style="background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;cursor: pointer; display:inline-block" class=${id} id="gb" > ${list.gbValue}</p> </div>
    //      <div style="padding:12px 0 0 10px"  >  <span style="color:#fff;font-weight:700;   " > ${list.dyName}</span>      &nbsp;&nbsp;  &nbsp;  <p style="background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block" > ${list.dyValue}</p> </div>
    //    </div>
    //  `;

    iframe.innerHTML = `
<div style="padding:25px 10px 10px 10px; display: flex; flex-direction: column; color: #fff; font-size: 14px;"  class="doc">
<div style="padding-top:6px; font-weight:700; text-align:center; font-size:15px;background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" > ${list.title} </div>

<div style=" font-weight:700;padding-top:6px; text-align:center; font-size:15px;background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" > 停电数/总数</div>
<div class=${id} id="zx" style="padding:6px 0 0 0px; text-align: center; "  >  <span class=${id} id="zx"    style="color:#fff;font-weight:700; cursor: pointer;   " > ${list.zxName}</span>     
<p style="background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block; cursor: pointer;" class=${id} id="zxTd"  > ${list.zxOffNum}</p>
&nbsp;/&nbsp;<p style="background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block; cursor: pointer;" class=${id} id="zx"  > ${list.zxValue}</p>   </div>


<div class=${id} id="zb" style="padding:12px 0 0 0px; cursor: pointer;text-align: center; "  >  <span class=${id} id="zb"  style="color:#fff;font-weight:700;   cursor: pointer; " > ${list.zbName}</span>    
<p style="background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block; cursor: pointer;" class=${id} id="zbTd"  > ${list.zbOffNum}</p>
&nbsp;/&nbsp;<p style="background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block; cursor: pointer;" class=${id} id="zb"  > ${list.zbValue}</p>    </div>

<div class=${id} id="gb" style="padding:12px 0 0 0px; cursor: pointer;text-align: center; "  >  <span class=${id} id="gb" style="color:#fff;font-weight:700;    cursor: pointer;" > ${list.gbName}</span>  
<p style="background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block; cursor: pointer;" class=${id} id="gbTd"  > ${list.gbOffNum}</p>
&nbsp;/&nbsp;<p style="background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block;    cursor: pointer;" class=${id} id="gb"  > ${list.gbValue}</p> </div>

<div  style="padding:12px 0 0 0px;text-align: center;"  >  <span style="color:#fff;font-weight:700; " > ${list.dyName}</span>      
<p style="background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block;cursor: pointer;" class=${id} id="dyTd"   > ${list.dyOffNum}</p>
&nbsp;/&nbsp;<p style="background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent; display:inline-block; "> ${list.dyValue}</p> </div>


</div>
`;
    div.appendChild(iframe);
    let bg = require("./symbols/10kv_suspectedBg.png");
    div.style.backgroundImage = `url(${bg})`;
    div.style.backgroundRepeat = `no-repeat`;
    div.style.backgroundSize = `100% 100%`;
    div.style.height = `100%`;

    return div;
  },
};

// 10kv台区拓扑的label
export const label_10kv_antv = (name, type) => {
  var div = document.createElement("div");
  let iframe = document.createElement("div");
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.innerHTML = `
   <div  id="labelName" style="z-index:6;width:100px;line-height:14px;font-size:10px;text-align:center;color:#fff;margin:0 auto">
     ${name}
   </div>
 `;
  if (type == "terminal") {
    iframe.innerHTML = `
  <div  id="labelName" style="z-index:6;width:200px;line-height:14px;font-size:10px;text-align:center;color:#fff;margin:0 auto">
    ${name}
  </div>
`;
  }
  div.appendChild(iframe);

  return div;
};

// 10kv页面终端下面的数量
export const terminalNum_antv = (length, power, target) => {
  var div = document.createElement("div");
  let iframe = document.createElement("div");

  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.innerHTML = `
     <div  class=${target.id} id='powerSum' style="z-index:6;width:120px;height:28px;line-height:14px;font-size:18px;background:linear-gradient(to right, #27bdef1a,#27bdef,#27bdef1a)">
     <div class=${target.id} id='powerSum' style="width:100%;height:2px;left:0;top:0;background:linear-gradient(to right, #27bdef00,#27bdef74,#27bdef00)" ></div>
     <div  class=${target.id} id='powerSum' style="width:100%;height:2px;left:0;bottom:0;background:linear-gradient(to right, #27bdef00,#27bdef74,#27bdef00)" ></div>
       <div class=${target.id} id='powerSum'  style="padding:4px;text-align:center;background:linear-gradient(0deg, #DCFAF9 0.1220703125%, #23AFFF 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;text-align:center  cursor: pointer;"  >  <span  class=${target.id} id='powerSum' style="font-weight:700; cursor: pointer; " >${power} / ${length}</span>   </div>
     </div>
   `;
  div.appendChild(iframe);
  div.classList.add(target.id);
  div.id = "powerSum";

  return div;
};

// 10kv页面展示公变专变个数
export const GbOrZbSum_antv = (flag, num) => {
  var div = document.createElement("div");
  let iframe = document.createElement("div");

  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  let name = flag ? "公变用户" : "专变用户";
  iframe.innerHTML = `
  <div style="z-index:9999; font-weight:700; text-align:center; font-size:16px;background:linear-gradient(0deg, #DCFAF9 0.1220703125%, #23AFFF 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" > ${name}(${num}户)</div>
                   `;
  div.appendChild(iframe);

  return div;
};

export const lineName_antv = (target) => {
  var div = document.createElement("div");
  let iframe = document.createElement("div");
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.innerHTML = `
          <div style=" font-weight:700;font-size:20px; text-align:center; background:linear-gradient(0deg, #DCFAF9 0.1220703125%, #23AFFF 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" > ${target} </div>
                           `;
  div.appendChild(iframe);

  return div;
};

// 内部的10kv电表与终端的浮窗

export const floatingWindowInfo1_antv = (target, isGBflag = true) => {
  var div = document.createElement("div");
  let iframe = document.createElement("div");
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  // let src = require("../../../assets/home/ss.png");
  let src = require("./symbols/anomaly_window2.png");
  let result;
  if (target.chargingStationStatus == "2") {
    result = `<div style="display:inline-block; font-weight:700;padding-top:6px; text-align:center; font-size:15px;background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >${
      target.tmnlOffStatus || "--"
    }</div>`;
  } else {
    result = `<div style="display:inline-block; font-weight:700;padding-top:6px; text-align:center; font-size:15px;background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >${
      target.tmnlOffStatus || "--"
    }</div>`;
  }
  // const list = targetNode.chargingStationInfo;
  iframe.innerHTML = `
                  <div style=" z-index:999;padding:55px; display: flex; flex-direction: column; color: #fff; font-size: 13px;">
                      <div style="margin-bottom:15px"  ><span>资产编号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
                        target.terminalDevId || "--"
                      }  </div>
                      <div style="margin-bottom:15px"  ><span>电表地址</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
                        target.terminalAddress || "--"
                      }  </div>
                      <div style="margin-bottom:15px"  ><span>用户编号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
                        target.terminalUserId || "--"
                      }  </div>
                      <div style="margin-bottom:15px"  ><span>用户名称</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
                        target.terminalUserName || "--"
                      }  </div>
                      <div style="margin-bottom:35px"  ><span>用户地址</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
                        target.terminalUserAddress || "--"
                      }  </div>

                      <div style="margin-bottom:15px"  ><span>正向有功</span>
                             &nbsp;&nbsp;&nbsp; 
                             <p  style=" display:inline-block; margin-right:10px;width:70px;font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                              ${target.positiveActive || "--"}
                              </p>
                           <span>反向有功</span>
                           &nbsp;&nbsp;&nbsp;
                           <span  style=" font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >
                              ${target.reverseActive || "--"}</span>
                      </div>

                      <div style="margin-bottom:15px"  ><span>有功功率</span>
                             &nbsp;&nbsp;&nbsp;
                             <p style=" display:inline-block; margin-right:10px; width:70px;font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                              ${target.activePower || "--"}
                              </p>
                           <span>无功功率</span>
                           &nbsp;&nbsp;&nbsp;
                           <span  style=" font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >
                              ${target.reactivePower || "--"}</span>
                      </div>
                      <div style="margin-bottom:15px"  ><span>A相电压</span>
                             &nbsp;&nbsp;&nbsp;&nbsp;
                             <p style="display:inline-block;width:70px; margin-right:10px;font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                              ${target.aphaseVoltage || "--"}
                              </p>
                           <span>B相电压</span>
                           &nbsp;&nbsp;&nbsp;
                           <span  style="  font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >
                              ${target.bphaseVoltage || "--"}</span>
                      </div>

                      <div style="margin-bottom:15px"  ><span>C相电压</span>
                             &nbsp;&nbsp;&nbsp;&nbsp;
                             <p style="display:inline-block;width:70px; margin-right:10px;font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                              ${target.cphaseVoltage || "--"}
                              </p> 
                           <span>A相电流</span>
                           &nbsp;&nbsp;&nbsp;
                           <span  style=" font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >
                              ${target.aphaseCurrent || "--"}</span>
                      </div>
                      <div style="margin-bottom:15px"  ><span>B相电流</span>
                             &nbsp;&nbsp;&nbsp;&nbsp; 
                             <p style=" display:inline-block; margin-right:10px; width:70px; font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                              ${target.bphaseCurrent || "--"}
                              </p>
                           <span>C相电流</span>
                           &nbsp;&nbsp;&nbsp;
                           <span  style=" font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >
                              ${target.cphaseCurrent || "--"}</span>
                      </div>
                  </div>
                `;

  if (!isGBflag) {
    if (target.chargingStationStatus == "1") {
      iframe.innerHTML = `
            <div style=" z-index:999;padding:55px; display: flex; flex-direction: column; color: #fff; font-size: 13px;">
<div style="margin-bottom:15px"  ><span>资产编号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
        target.terminalDevId || "--"
      }  </div>
<div style="margin-bottom:15px"  ><span>电表地址</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
        target.terminalAddress || "--"
      }  </div>
<div style="margin-bottom:15px"  ><span>用户编号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
        target.terminalUserId || "--"
      }  </div>
<div style="margin-bottom:15px"  ><span>用户名称</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
        target.terminalUserName || "--"
      }  </div>
<div style="margin-bottom:15px"  ><span>用户地址</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
        target.terminalUserAddress || "--"
      }  </div>

</div>
`;
    } else {
      iframe.innerHTML = `
            <div style=" z-index:999;padding:55px; display: flex; flex-direction: column; color: #fff; font-size: 13px;">
<div style="margin-bottom:15px"  ><span>资产编号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
        target.terminalDevId || "--"
      }  </div>
<div style="margin-bottom:15px"  ><span>电表地址</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
        target.terminalAddress || "--"
      }  </div>
<div style="margin-bottom:15px"  ><span>用户编号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
        target.terminalUserId || "--"
      }  </div>
<div style="margin-bottom:15px"  ><span>用户名称</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
        target.terminalUserName || "--"
      }  </div>
<div style="margin-bottom:15px"  ><span>用户地址</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
        target.terminalUserAddress || "--"
      }  </div>
<div style="font-weight: 700;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"   ><img  style="width:35px;height:35px;display:inline-block" src="${src}" /> 异常信息提示  </div>
<div style="color:#fff;font-size: 12px;" >${target.tmnlOffMsg || "--"}${result}</div>
</div>
`;
    }
  } else {
    if (target.chargingStationStatus == "1") {
      iframe.innerHTML = `
                    <div style=" z-index:999;padding:55px; display: flex; flex-direction: column; color: #fff; font-size: 13px;">
                        <div style="margin-bottom:15px"  ><span>资产编号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
                          target.terminalDevId || "--"
                        }  </div>
                        <div style="margin-bottom:15px"  ><span>电表地址</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
                          target.terminalAddress || "--"
                        }  </div>
                        <div style="margin-bottom:15px"  ><span>用户编号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
                          target.terminalUserId || "--"
                        }  </div>
                        <div style="margin-bottom:15px"  ><span>用户名称</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
                          target.terminalUserName || "--"
                        }  </div>
                        <div style="margin-bottom:15px"  ><span>用户地址</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
                          target.terminalUserAddress || "--"
                        }  </div>
                        <div style="margin-bottom:10px; padding:3px;width:50%; border:1px solid #2d8cd0"  > ${
                          target.dataTime || "--"
                        }  </div>

                        <div style="margin-bottom:15px"  ><span>正向有功</span>
                               &nbsp;&nbsp;&nbsp; 
                               <p  style=" display:inline-block; margin-right:10px;width:70px;font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                                ${target.positiveActive || "--"}
                                </p>
                             <span>反向有功</span>
                             &nbsp;&nbsp;&nbsp;
                             <span  style=" font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >
                                ${target.reverseActive || "--"}</span>
                        </div>

                        <div style="margin-bottom:15px"  ><span>有功功率</span>
                               &nbsp;&nbsp;&nbsp;
                               <p style=" display:inline-block; margin-right:10px; width:70px;font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                                ${target.activePower || "--"}
                                </p>
                             <span>无功功率</span>
                             &nbsp;&nbsp;&nbsp;
                             <span  style=" font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >
                                ${target.reactivePower || "--"}</span>
                        </div>
                        <div style="margin-bottom:15px"  ><span>A相电压</span>
                               &nbsp;&nbsp;&nbsp;&nbsp;
                               <p style="display:inline-block;width:70px; margin-right:10px;font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                                ${target.aphaseVoltage || "--"}
                                </p>
                             <span>B相电压</span>
                             &nbsp;&nbsp;&nbsp;
                             <span  style="  font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >
                                ${target.bphaseVoltage || "--"}</span>
                        </div>

                        <div style="margin-bottom:15px"  ><span>C相电压</span>
                               &nbsp;&nbsp;&nbsp;&nbsp;
                               <p style="display:inline-block;width:70px; margin-right:10px;font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                                ${target.cphaseVoltage || "--"}
                                </p> 
                             <span>A相电流</span>
                             &nbsp;&nbsp;&nbsp;
                             <span  style=" font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >
                                ${target.aphaseCurrent || "--"}</span>
                        </div>
                        <div style="margin-bottom:15px"  ><span>B相电流</span>
                               &nbsp;&nbsp;&nbsp;&nbsp; 
                               <p style=" display:inline-block; margin-right:10px; width:70px; font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                                ${target.bphaseCurrent || "--"}
                                </p>
                             <span>C相电流</span>
                             &nbsp;&nbsp;&nbsp;
                             <span  style=" font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >
                                ${target.cphaseCurrent || "--"}</span>
                        </div>
                    </div>
                  `;
    } else {
      iframe.innerHTML = `
                    <div style=" z-index:999;padding:55px; display: flex; flex-direction: column; color: #fff; font-size: 13px;">
                        <div style="margin-bottom:10px"  ><span>资产编号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
                          target.terminalDevId || "--"
                        }  </div>
                        <div style="margin-bottom:10px"  ><span>电表地址</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
                          target.terminalAddress || "--"
                        }  </div>
                        <div style="margin-bottom:10px"  ><span>用户编号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
                          target.terminalUserId || "--"
                        }  </div>
                        <div style="margin-bottom:10px"  ><span>用户名称</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
                          target.terminalUserName || "--"
                        }  </div>
                        <div style="margin-bottom:10px"  ><span>用户地址</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
                          target.terminalUserAddress || "--"
                        }  </div>
                        <div style="margin-bottom:10px; padding:3px;width:50%; border:1px solid #2d8cd0"  > ${
                          target.dataTime || "--"
                        }  </div>
                        <div style="margin-bottom:10px"  ><span>正向有功</span>
                               &nbsp;&nbsp;&nbsp; 
                               <p  style=" display:inline-block; margin-right:10px;width:70px;font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                                ${target.positiveActive || "--"}
                                </p>
                             <span>反向有功</span>
                             &nbsp;&nbsp;&nbsp;
                             <span  style=" font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >
                                ${target.reverseActive || "--"}</span>
                        </div>

                        <div style="margin-bottom:10px"  ><span>有功功率</span>
                               &nbsp;&nbsp;&nbsp;
                               <p style=" display:inline-block; margin-right:10px; width:70px;font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                                ${target.activePower || "--"}
                                </p>
                             <span>无功功率</span>
                             &nbsp;&nbsp;&nbsp;
                             <span  style=" font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >
                                ${target.reactivePower || "--"}</span>
                        </div>
                        <div style="margin-bottom:10px"  ><span>A相电压</span>
                               &nbsp;&nbsp;&nbsp;&nbsp;
                               <p style="display:inline-block;width:70px; margin-right:10px;font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                                ${target.aphaseVoltage || "--"}
                                </p>
                             <span>B相电压</span>
                             &nbsp;&nbsp;&nbsp;
                             <span  style="  font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >
                                ${target.bphaseVoltage || "--"}</span>
                        </div>

                        <div style="margin-bottom:10px"  ><span>C相电压</span>
                               &nbsp;&nbsp;&nbsp;&nbsp;
                               <p style="display:inline-block;width:70px; margin-right:10px;font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                                ${target.cphaseVoltage || "--"}
                                </p> 
                             <span>A相电流</span>
                             &nbsp;&nbsp;&nbsp;
                             <span  style=" font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >
                                ${target.aphaseCurrent || "--"}</span>
                        </div>
                        <div style="margin-bottom:10px"  ><span>B相电流</span>
                               &nbsp;&nbsp;&nbsp;&nbsp; 
                               <p style=" display:inline-block; margin-right:10px; width:70px; font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                                ${target.bphaseCurrent || "--"}
                                </p>
                             <span>C相电流</span>
                             &nbsp;&nbsp;&nbsp;
                             <span  style=" font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >
                                ${target.cphaseCurrent || "--"}</span>
                        </div>
                        <div style="font-weight: 700;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"   ><img  style="width:35px;height:35px;display:inline-block" src="${src}" /> 异常信息提示  </div>
<div style="color:#fff;font-size: 12px;" >${target.tmnlOffMsg || "--"}${result}</div>

                    </div>
                  `;
    }
  }
  let closeBtn = document.createElement("div");
  closeBtn.innerHTML = ` <div id="closeBtn"  style="position:fixed;   width:30px;height:30px;background:url(${require("./symbols/fold1.png")});background-size:100% 100%;top:10px;right:10px"  >  </div>`;
  let lineBtn = document.createElement("div");
  lineBtn.innerHTML = ` <div id="line_btn"  style="position:fixed; width:60px;height:60px;background:url(${require("./symbols/line_btn.png")});background-size:100% 100%;top:30px;right:30px"  >  </div>`;

  iframe.appendChild(closeBtn);
  iframe.appendChild(lineBtn);

  div.appendChild(iframe);
  // let img =  require('./symbols/floatingWindow.png')
  div.style.backgroundImage = `url(${require("./symbols/floatingWindow.png")})`;
  div.style.backgroundSize = "100% 100%";
  div.id = "floatingWindowInfo";

  return div;
};

export const floatingWindowInfo2_antv = (target) => {
  var div = document.createElement("div");
  let iframe = document.createElement("div");
  let result;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  let comIcon = require("../components/symbols/comIcon.png");
  if (target.chargingStationStatus == "2") {
    result = `<div style="display:inline-block; font-weight:700;padding-top:6px; text-align:center; font-size:15px;background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >${target.tmnlOffStatus}</div>`;
  } else {
    result = `<div style="display:inline-block; font-weight:700;padding-top:6px; text-align:center; font-size:15px;background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >${target.tmnlOffStatus}</div>`;
  }

  iframe.innerHTML = `
            <div style="z-index:999;padding:25px;padding-left: 30px;display: flex; flex-direction: column; color: #fff; font-size: 13px;">
                <div style="margin-bottom:10px;font-weight: 700;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"   ><img  style="width:35px;height:35px;display:inline-block" src="${comIcon}" /> ${
    target.energyUserName || "--"
  }  </div>
                

                <div style="margin-bottom:15px"  ><span>电表资产号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
                  target.energyAssetId || "--"
                }  </div>
                <div style="margin-bottom:15px"  ><span>电表地址</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
                  target.energyAddress || "--"
                }  </div>
                <div style="margin-bottom:15px"  ><span>用户编号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
                  target.energyUserId || "--"
                }  </div>
                <div style="margin-bottom:15px"  ><span>用户地址</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
                  target.energyUserAddress || "--"
                }  </div>
                <div style="margin-bottom:15px; padding:3px;width:50%; border:1px solid #2d8cd0"  > ${
                  target.dataTime || "--"
                }  </div>


                <div style="margin-bottom:10px"  ><span>正向有功</span>
                &nbsp;&nbsp;&nbsp; 
                <p  style=" display:inline-block; margin-right:10px;width:70px;font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                 ${target.positiveActive || "--"}
                 </p>
              <span>反向有功</span>
              &nbsp;&nbsp;&nbsp;
              <span  style=" font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >
                 ${target.reverseActive || "--"}</span>
         </div>

         <div style="margin-bottom:10px"  ><span>有功功率</span>
                &nbsp;&nbsp;&nbsp;
                <p style=" display:inline-block; margin-right:10px; width:70px;font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                 ${target.activePower || "--"}
                 </p>
              <span>无功功率</span>
              &nbsp;&nbsp;&nbsp;
              <span  style=" font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >
                 ${target.reactivePower || "--"}</span>
         </div>
         <div style="margin-bottom:10px"  ><span>A相电压</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <p style="display:inline-block;width:70px; margin-right:10px;font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                 ${target.aphaseVoltage || "--"}
                 </p>
              <span>B相电压</span>
              &nbsp;&nbsp;&nbsp;
              <span  style="  font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >
                 ${target.bphaseVoltage || "--"}</span>
         </div>

         <div style="margin-bottom:10px"  ><span>C相电压</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <p style="display:inline-block;width:70px; margin-right:10px;font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                 ${target.cphaseVoltage || "--"}
                 </p> 
              <span>A相电流</span>
              &nbsp;&nbsp;&nbsp;
              <span  style=" font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >
                 ${target.aphaseCurrent || "--"}</span>
         </div>
         <div style="margin-bottom:10px"  ><span>B相电流</span>
                &nbsp;&nbsp;&nbsp;&nbsp; 
                <p style=" display:inline-block; margin-right:10px; width:70px; font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                 ${target.bphaseCurrent || "--"}
                 </p>
              <span>C相电流</span>
              &nbsp;&nbsp;&nbsp;
              <span  style=" font-weight: 600;color: #FFF;background: linear-gradient(0deg, #DEFFFB 0.1220703125%, #35FFE7 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" >
                 ${target.cphaseCurrent || "--"}</span>
         </div>

         
            </div>
          `;

  let closeBtn = document.createElement("div");
  closeBtn.innerHTML = ` <div id="closeBtn"  style="position:fixed; width:30px;height:30px;background:url(${require("./symbols/fold1.png")});background-size:100% 100%;top:10px;right:10px"  >  </div>`;
  let lineBtn = document.createElement("div");
  lineBtn.innerHTML = ` <div id="line_btn"  style="position:fixed;width:60px;height:60px;background:url(${require("./symbols/line_btn.png")});background-size:100% 100%;top:30px;right:30px"  >  </div>`;

  iframe.appendChild(closeBtn);
  iframe.appendChild(lineBtn);

  div.appendChild(iframe);
  div.style.backgroundImage = `url(${require("./symbols/floatingWindow.png")})`;
  div.style.backgroundSize = "100% 100%";
  div.id = "floatingWindowInfo";

  return div;
};

// 统一管理枚举
export const enumerationList = {
  // 节点图片枚举
  chargingStationStatusObj: {
    1: require("./symbols/110kv_normal.png"),
    // '2': require('./symbols/110kv_abnormal.png'),
    2: require("./symbols/wholeStation.png"),
  },
  chargingStationStatusObj_10kv: {
    1: require("./symbols/10kv_normal.png"),
    2: require("./symbols/10kv_abnormal.png"),
    3: require("./symbols/10kv_suspected.png"),
  },
  directionObj: {
    up: -30,
    right: 30,
    down: -30,
    left: 30,
  },
  lineColor_10kv: {
    1: "#299bf9",
    2: "#f31a1d",
    3: "#cc6f30",
  },
  titleObj: {
    zx: "专线用户明细",
    zxTd: "专线停电用户明细",
    zb: "专变用户明细",
    zbTd: "专变停电用户明细",
    gb: "公变用户明细",
    gbTd: "公变停电用户明细",
    dy: "低压用户明细",
    dyTd: "低压停电用户明细",
  },
  terminalStatusObj_10kv: {
    1: require("./symbols/terminal_10kv_Y.png"),
    2: require("./symbols/terminal_10kv_N.png"),
    3: require("./symbols/terminal_10kv_Y3.png"),
  },
  getChargingStationObj: function (key, centerNodeId) {
    return {
      "110kv": {
        img: this.chargingStationStatusObj[key],
        size: { w: 120, h: 120 },
      },
      "35kv": {
        img: require("./symbols/35kv_normal.png"),
        size: { w: 60, h: 65 },
      },
      "10kv": {
        img: this.chargingStationStatusObj_10kv[key],
        size: { w: 90, h: 115 },
      },
      "220kv": {
        img: centerNodeId == "334453673" ? require("./symbols/center_point.png") : require("./symbols/node1_ZT.png"),
        size: { w: 220, h: 220 },
      },
    };
  },
  getLineColor: function (key) {
    return {
      1: "#269bff",
      2: "#FF1A1B",
      3: "#FB6F13",
      "35kv": "#f3db3a",
      "110kv": "#00f1fa",
      "10kv": this.lineColor_10kv[key],
    };
  },
  get10kvNode: function (key) {
    return {
      terminal: {
        img: this.terminalStatusObj_10kv[key],
        size: { w: 120, h: 120 },
      },
      "10kv": {
        img: this.chargingStationStatusObj_10kv[key],
        size: { w: 120, h: 125 },
      },
      fold: {
        img: require("./symbols/folds.png"),
        size: { w: 20, h: 20 },
      },
      energy: {
        img: key === "1" ? require("./symbols/energy_10kv_Y.png") : require("./symbols/energy_10kv_N.png"),
        size: { w: 120, h: 125 },
      },
    };
  },
  abnormalIconObj: {
    2: "node4_abnormalIcon",
    3: "node4_suspectedIcon",
  },
};

export const detailHtml_antv = (item, flag = false) => {
  var div = document.createElement("div");
  let iframe = document.createElement("div");
  let order = "";
  if (flag) {
    if (!item.imTagBoList) return;

    item.imTagBoList.forEach((e) => {
      order += `<p style="text-align:left">${e.impoConsTypeName}  :  ${e.cnt}</p>`;
    });
  } else {
    if (!item.imTagList) return;
    item.imTagList.forEach((e) => {
      order += `<p style="text-align:center">${e}</p>`;
    });
    div.style.display = "none";
  }

  iframe.innerHTML = `<div style="width:100%; height:70px;color:#fff;" >
    <div style="width:100%;background:rgba(19,31,47,.3);border:1px solid #fff; border-radius:10px;padding:7px"  >
    ${order}
    </div>
    <div  style="width:100%;height:25%;background:rgba(255,255,255,.5);border-radius:15px;clip-path:polygon(40% 0,60% 0,50% 100%)"   ></div>
  </div>`;
  div.appendChild(iframe);
  div.id = item.terminalUserName;
  return div;
};

export const detai10kvlHtml_antv = (item) => {
  var div = document.createElement("div");
  let iframe = document.createElement("div");
  console.log(item,'pppppppppppppp')
  iframe.id = "show";
  iframe.classList.add(item.id)
  let order = "";
  let src;
  if (item.chargingStation !== "10kv") {
    if (item.extendData) {
      let tagNameList = {
        anomaly: "线路停电数",
        suspectedAnomaly: "线路疑似停电数",
        custOffNum: "用户停电数",
        dyOffNum: "低压用户停电数",
        gbOffNum: "公变用户停电数",
        zbOffNum: "专变用户停电数",
        zxOffNum: "专线用户停电数",
      };
      for (let k in item.extendData) {
        order += `<div style="text-align:left;margin-bottom:5px;display: flex;justify-content: space-between;"><div   style="font-size:14px;" >${
          tagNameList[k]
        }: </div>  <div  class="${tagNameList[k]}"  id=${item.id} style="cursor:pointer;font-weight:700;font-size:16px;background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" > ${
          item.extendData[k] || "0"
        }</div></div>
       
     
        `;
      }
      src = require("./symbols/anomaly_window2.png");
    }
  } else {
    if (!item.imTagBoList) return;
    item.imTagBoList.forEach((e) => {
      if (item.chargingStationStatus === "2") {
        order += `<div style="text-align:left;margin-bottom:5px;display: flex;justify-content: space-between;"><div   style="font-size:14px;" >${e.impoConsTypeName}: </div>  <div style="font-weight:700;font-size:16px;background: linear-gradient(0deg, #FFEEEC 0.1220703125%, #FF2222 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" > ${e.cnt}</div></div>`;
      } else {
        order += `<div style="text-align:left;margin-bottom:5px;display: flex;justify-content: space-between;"><div   style="font-size:14px;" >${e.impoConsTypeName}: </div>  <div style="font-weight:700;font-size:16px;background: linear-gradient(0deg, #FAF2DC 0.1220703125%, #FF8124 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;" > ${e.cnt}</div></div>`;
      }
    });
    src =
      item.chargingStationStatus === "2"
        ? require("./symbols/anomaly_window2.png")
        : require("./symbols/anomaly_window1.png");
  }
  iframe.innerHTML = `
  <style >
    ::-webkit-scrollbar {
      width:6px;
      height:4px;

    }
    
    ::-webkit-scrollbar-track {
      border-radius: 8px;

    }
    ::-webkit-scrollbar-thumb{
      border-radius: 8px;
      background: #ba7c7ca3;
    }
    ::-webkit-scrollbar-thumb:hover{
      background:#fff;
    }
    ::-webkit-scrollbar-thumb:active{
      background:#fff;
    }

    #show{
      overflow: hidden;
      height:80%
   }
    #show:hover{
       overflow: auto;
    }

    </style>
  <div style="width:100%; height:100%;color:#fff;padding:10px"" >
    ${order}
  </div>`;
  div.appendChild(iframe);
  div.style.background = `url(${src})`;
  div.style.height = "100%";
  div.style.width = "100%";
  div.style.transform = "scale(0.8)";
  return div;
};
