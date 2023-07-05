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
      :key="index"
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
    </div>
  </template>
  
  <script>
  export default {
    name: "myTextName",
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