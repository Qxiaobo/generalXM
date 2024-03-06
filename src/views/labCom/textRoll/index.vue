<template>
    <div>
      <my-text1 :speed="16000" :showBell="true" url="/myMessage"
        >🎤🎤🎤 发展高新农业,做大做强再创辉煌,开拓新世界,做大做强，再创辉煌”。老子整把AK，再给你弄把莱福。,so let me shot🍭🍭🍭</my-text1
      >
      <br />
      <myText1 :speed="16000" :showBell="true" bgColor="#FEF0F0" color="#F56C6C"
        >🎤🎤🎤 做大做强，再创辉煌,开拓新世界”。劳资整把AK，再给你弄把莱福。,so let me shot🍭🍭🍭</myText1
      >
      <br />
      <br />
      <br />
      <br />
      <br />
      <myText1
        :speed="16000"
        :showBell="true"
        bgColor="#409eff"
        color="#fff"
        :showClose="false"
        >🎤🎤🎤 做大做强，再创辉煌,开拓新世界”。劳资整把AK，再给你弄把莱福。,so let me shot🍭🍭🍭</myText1
      >
      <br />
      <br />
      <br />
      <div class="t222">
        <myText2 :speed="12000" :text="textArr"></myText2>
      </div>
      <el-divider></el-divider>
      <el-divider></el-divider>

      <my-card
      class="cardClass cardClass2"
      :cardStyle="{
        background: '#CCDDEE',
        color: '#333',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
      }"
      :backCardStyle="{
        background: 'red',
        color: '#000',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        opacity: 0.72,
      }"
    >
      <!-- <div class="front">
        <div>
          {{ item.path.slice(1) }}
        </div>
        <div>{{ emoji[index] }}</div>
      </div> -->
      <div slot="back">
        <div class="backStyle">
          <div>点下呗...</div>
          <!-- <div>{{ yanWords[index] }}</div> -->
        </div>
      </div>
    </my-card>
    <div  style="width: 200px;height: 200px;background:#ccc;" v-clickOutside="clickoutside" @click="click"  >

    </div>
    <div style="padding-left:30px">
      <br/>step: {
      <br/>  // 数值越大速度滚动越快
      <br/>  type: Number,
      <br/>  default: 0.2
      <br/>},
      <br/>limitMoveNum: {
      <br/>  // 开始无缝滚动的数据量 this.dataList.length
      <br/>  type: Number,
      <br/>  default: 2
      <br/>},
      <br/>hoverStop: {
      <br/>  // 是否开启鼠标悬停stop
      <br/>  type: Boolean,
      <br/>  default: true
      <br/>},
      <br/>direction: {
      <br/>  // 0向下 1向上 2向左 3向右
      <br/>  type: Number,
      <br/>  default: 1,
      <br/>  validator(val) {
      <br/>    return val === 0 || val === 1 || val === 2 || val === 3;
      <br/>  }
      <br/>},
      <br/>openWatch: {
      <br/>  // 开启数据实时监控刷新dom
      <br/>  type: Boolean,
      <br/>  default: true
      <br/>},
      <br/>singleHeight: {
      <br/>  // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
      <br/>  type: Number,
      <br/>  default: 0
      <br/>},
      <br/>singleWidth: {
      <br/>  // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
      <br/>  type: Number,
      <br/>  default: 0
      <br/>},
      <br/>waitTime: {
      <br/>  // 单步运动停止的时间(默认值1000ms)
      <br/>  type: Number,
      <br/>  default: 1000
      <br/>}</div>
    <div style="background: red; height: 300px;overflow: hidden;margin-top: 50px;" >
      <ScrollMessage>
            <div v-for="i in 6" :key="i" >
                <el-button type="primary"> 测试{{ i }}}</el-button>
            </div>
    
        </ScrollMessage>
        
    </div>

    </div>
  </template>
  
  <script>
import ScrollMessage from '@/components/ScrollMessage/index';

  export default {
    name: "myTextName",
    components: {
        ScrollMessage
    },
    data() {
      return {
        textArr: [
          "孙悟空",
          "猪八戒",
          "沙和尚",
          "唐僧",
          "白龙马",
          "白骨精",
          "玉兔精",
          "嫦娥",
          "太上老君",
          "二郎神",
          "哪吒",
          "菩提祖师",
          "东海龙王",
          "西海龙王",
          "南海龙王",
          "北海龙王",
          "乌鸡国国王",
          "乌鸡国王后",
          "乌鸡国太子",
          "红孩儿",
        ],
        routesList: this.$router.options.routes,
      };
    },
    methods: {
      clickoutside() {
        this.$message.success("点击外部");
      },
      click(){
        this.$message.warning("点击内部");
      }
    },
  };
  </script>
  
  <style>
  .t222 {
    width: 360px;
    /* height: 240px; */
    border: 1px solid #666;
    color: blueviolet;
  }
  .cardClass {
    width: 160px;
    margin-right: 24px;
    margin-bottom: 24px;
  }
  .cardClass2 {
    height: 120px;
  }
  </style>