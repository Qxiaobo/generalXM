<template>
  <div class="hello">
     <!-- <vue-seamless-scroll :data="listData"  :class-option="classOption"  ref="seamlessScroll" @ScrollEnd="ScrollEnd">
        <ul >
            <li v-for="item in listData" :key="item.index">
                <span  v-text="item.title"></span><span  v-text="item.date"></span>
            </li>
        </ul>
    </vue-seamless-scroll> -->
  </div>
  
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
       step: 0.1, // 数值越大速度滚动越快
        limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停时间,
      listData: [{
                   'title': '1',
                   'date': '|||||||||||||||||||||||||||||||||||||||||||'
                 }, {
                    'title': '2',
                      'date': '|||||||||||||||||||||||||||||||||||||||||||'
                 }, {
                     'title': '3',
                    'date': '|||||||||||||||||||||||||||||||||||||||||||'
                 }, {
                     'title': '4',
                      'date': '|||||||||||||||||||||||||||||||||||||||||||'
                 },{
                   'title': '5',
                      'date': '|||||||||||||||||||||||||||||||||||||||||||'
                 }, {
                    'title': '6',
                     'date': '|||||||||||||||||||||||||||||||||||||||||||'
                 }, {
                     'title': '7',
                     'date': '|||||||||||||||||||||||||||||||||||||||||||'
                 }, {
                     'title': '8',
                     'date': '|||||||||||||||||||||||||||||||||||||||||||'
                 }, {
                    'title': '9',
                     'date': '|||||||||||||||||||||||||||||||||||||||||||'
                 }, {
                     'title': '10',
                     'date': '|||||||||||||||||||||||||||||||||||||||||||'
                 }],
                 num:9,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    classOption() {
      return {
        step: 0.5, //数值越大速度滚动越快
        limitMoveNum:0, //开始无缝滚动的数据量  //this.fourDatata.length
        hoverStop: true, //是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, //开启数据实时监控刷新dom
        singleHeight: 0, //单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, //单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 //单步运动停止的时间(默认值1000ms)
      };
    }
  },
  mounted(){
    this.getzb();
  },
  methods:{
    ScrollEnd(){
      console.log(this.$refs)
       this.listData=[]
       for( var j=0;j<=8;j++){
this.num+=1;
 this.listData.push({
                   'title': this.num,
                   'date': '||||||||||||||||||||||||||||||||||||||||||||||||'
                 })
       }
      
                  this.$refs.seamlessScroll.reset();
    },
    change(){
      console.log(this.$refs)
       this.listData=[]
       for( var j=9;j<=20;j++){
this.num=j;
 this.listData.push({
                   'title': this.num,
                   'date': '2017-12-162017-12-162017-12-16'
                 })
       }
      
                  this.$refs.seamlessScroll.reset();
    },
    getzb(){
      //模拟数据格式，树形
      let vJson={
        id:1,
        name:"1",
        children:[
          {
            id:11,
            name:"1-1",
            line:"线路1-1",
            children:[{
              id:111,
              name:"1-1-1",
              line:"线路1-1-1"
            },{
              id:112,
              name:"1-1-2",
              line:"线路1-1-2"
            }]
          },
          {
            id:12,
            name:"1-2",
            line:"线路1-2",
            children:[{
              id:121,
              name:"1-2-1",
              line:"线路1-2-1"
            }]
          },
          {
            id:13,
            name:"1-3",
            line:"线路1-3",
            children:[{
              id:131,
              name:"1-3-1",
              line:"线路1-3-1"
            }]
          },
          {
            id:14,
            name:"1-4",
            line:"线路1-4",
            children:[{
              id:141,
              name:"1-4-1",
              line:"线路1-4-1"
            }]
          },{
            id:15,
            name:"1-5",
            line:"线路1-5",
            children:[{
              id:151,
              name:"1-5-1",
              line:"线路1-5-1"
            },{
              id:152,
              name:"1-5-2",
              line:"线路1-5-2"
            },{
              id:153,
              name:"1-5-3",
              line:"线路1-5-3"
            }]
          },{
            id:16,
            name:"1-6",
            line:"线路1-6",
            children:[{
              id:161,
              name:"1-6-1",
              line:"线路1-6-1"
            },{
              id:162,
              name:"1-6-2",
              line:"线路1-6-2"
            },{
              id:163,
              name:"1-6-3",
              line:"线路1-6-3"
            }]
          }
        ]
      }
      // //图标大小相关
      // //一级图标中心距边长度
      // let oneSize=4;
      // //二级图标中心距边长度
      // let twoSize=2;

      //坐标调整相关
      //逆时针旋转角度
      let angle=45
      //逆时针旋转后y轴压缩比例
      let flex=1.2

      //图标间距相关
      //二级图标间距
      let twoSpace=200;
      //三级图标间距
      let threeSpace=100;

      //层级间距相关
      //一级到二级间距
      let one2two=250;
      //二级到三级间距
      let two2three=150;

       //坐标原点相关
         // 原点x
         let zeroX=850.5;
      //原点y
      let zeroY=380.5;
  
     

      //获取二级总数用于排版分布
      let totalTSize=vJson.children.length;
      //整数值
      let divisible=parseInt(totalTSize/4)
      //余数值
      let remainder=totalTSize%4
       //将整体分为上下左右，定义每边二级和三级的数量
       let up=divisible;
      let left=divisible;
      let down=divisible;
      let right=divisible;
      //不能均分的按上左下进行顺序分配
      if(remainder==1){
        up+=1;
      }else if(remainder==2){
        up+=1;
        left+=1;
      }else if(remainder==3){
        up+=1;
        left+=1;
        right+=1;
      }

      //坐标数组
      let xy=new Array();
      if(up>0){
        xy= xy.concat(this.getXY(up,0,up,"up",twoSpace,one2two,vJson,threeSpace,two2three,zeroX,zeroY,angle,flex))
      }
      if(left>0){
        xy= xy.concat(this.getXY(left,up,up+left,"left",twoSpace,one2two,vJson,threeSpace,two2three,zeroX,zeroY,angle,flex))
      }
      if(down>0){
        xy= xy.concat(this.getXY(down,up+left,up+left+down,"down",twoSpace,one2two,vJson,threeSpace,two2three,zeroX,zeroY,angle,flex))
      }
      if(right>0){
        xy= xy.concat(this.getXY(right,up+left+down,up+left+down+right,"right",twoSpace,one2two,vJson,threeSpace,two2three,zeroX,zeroY,angle,flex))
      }

console.log(xy)
    },
    getXY(totalNum,start,end,direction,twoSpace,one2two,vJson,threeSpace,two2three,zeroX,zeroY,angle,flex){
      let xy=new Array();
//二级所需偏移
let Deviation=(totalNum-1)*(twoSpace/2);
      //开始计算上方点位坐标
       //二级图标计数
       let num=0;
      for(let i=start;i<end;i++){
         //二级图标坐标
         let twoX=0;
         let twoY=0;
         if(direction=="up"){
           twoX=zeroX+num*twoSpace-(Deviation);
          twoY=zeroY+one2two;
         }else if(direction=="down"){
           twoX=zeroX+num*twoSpace-(Deviation);
          twoY=zeroY-one2two;
         }else if(direction=="left"){
           twoX=zeroX-one2two;
          twoY= zeroY+num*twoSpace-(Deviation);
         }else if(direction=="right"){
           twoX=zeroX+one2two;
          twoY= zeroY+num*twoSpace-(Deviation);
         }
        
        xy.push({x:twoX,y:twoY,name:vJson.children[i].name,source:null})
        // xy.push(this.deflectionXY(zeroX,zeroY,twoX,twoY,vJson.children[i].name,angle,flex))
        //开始处理三级图标
        let children=vJson.children[i].children;
        let source=vJson.children[i].name;
        //三级所需偏移
        let Deviation3=(children.length-1)*(threeSpace/2);
        //三级图标计数
        let num3=0;
        for(let j=0;j<children.length;j++){
          let threeX=0;
         let threeY=0;
          if(direction=="up"){
             threeX=twoX+num3*threeSpace-(Deviation3);
          threeY=twoY+two2three;
         }else if(direction=="down"){
          threeX=twoX+num3*threeSpace-(Deviation3);
          threeY=twoY-two2three;
         }else if(direction=="left"){
          threeX=twoX-two2three ;
          threeY=twoY+num3*threeSpace-(Deviation3);
         }else if(direction=="right"){
          threeX=twoX+two2three ;
          threeY=twoY+num3*threeSpace-(Deviation3);
         }
          
        xy.push({x:threeX,y:threeY,name:children[j].name,source:source})
        // xy.push(this.deflectionXY(zeroX,zeroY,threeX,threeY,children[j].name,angle,flex,source))
        num3++;
        }
        //三级图标处理结束
        num++;
      }
      return xy;
    },
    deflectionXY(zX,zY,pX,pY,name,angle,flex,source){
      //偏转后的X
      let deflectionX=(zX - pX)*Math.cos(angle) - (zY - pY)*Math.sin(angle) + pX
      //偏转后的Y
      let deflectionY=(zX - pX)*Math.sin(angle) - (zY - pY)*Math.cos(angle) + pY
      let point={
        x:deflectionX,
        y:deflectionY*flex,
        name:name,
        source
      }
      return point;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
 ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;
      
    }
    li,
      a {
        display: block;
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        font-size: 15px;
      }
.hello{
   height: 270px;
    width: 360px;
    margin: 0 auto;
    overflow: hidden;
    clear: both;
    overflow: hidden;
   
}
</style>
