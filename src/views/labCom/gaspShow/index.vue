<template>
  <div id="clock">
    <div id="h10" class="num">
      <div class="upper"></div>
      <div class="base upper"></div>
      <div class="base lower"></div>
      <div class="lower"></div>
    </div>
    
    <div id="h0" class="num">
      <div class="upper"></div>
      <div class="base upper"></div>
      <div class="base lower"></div>
      <div class="lower"></div>
    </div>
    
    <div class="colon">:</div>
    
    <div id="m10" class="num">
      <div class="upper"></div>
      <div class="base upper"></div>
      <div class="base lower"></div>
      <div class="lower"></div>
    </div>
    
    <div id="m0" class="num">
      <div class="upper"></div>
      <div class="base upper"></div>
      <div class="base lower"></div>
      <div class="lower"></div>
    </div>
    
    <div class="colon">:</div>
    
    <div id="s10" class="num">
      <div class="upper"></div>
      <div class="base upper"></div>
      <div class="base lower"></div>
      <div class="lower"></div>
    </div>
    
    <div id="s0" class="num">
      <div class="upper"></div>
      <div class="base upper"></div>
      <div class="base lower"></div>
      <div class="lower"></div>
    </div>
  </div>

</template>
// 显示
<script>
export default {
  name: "Show",
  mounted() {
    setTimeout(() => {
      this.show();
    }, 0);
  },
  methods: {
    // 显示
    show() {
      //格式化时间
      const formatTime = (time) => {
        if (time < 10) time = "0" + time;
        return time;
      };
      //翻转前面下面的盒子向上180deg
      const rotateUp = (ele, time, n) => {
        //传入的为一开始翻转的元素，即前面下面的盒子，以及新时间，以及第几个li盒子
        let rotateDeg = 0;
        ele.style.zIndex = 50;
        //这个是所有上面的盒子
        const allUpBox = document
          .querySelector(`li:nth-child(${n})`)
          .querySelectorAll(".upBox");
        //所有前面的盒子
        const beforeTime = document
          .querySelector(`li:nth-child(${n})`)
          .querySelectorAll(".beforeTime");
        // 让上面后面的盒子先不可见，然后设置为270°
        allUpBox[1].style.display = "none";
        allUpBox[1].transform = `rotateX(270deg)`;
        const animation = () => {
          rotateDeg += 3;
          ele.style.transform = `perspective(500px) rotateX(${rotateDeg}deg)`;
          if (rotateDeg == 90) {
            //让它更新为最近时间后隐藏
            ele.innerHTML = time;
            ele.style.zIndex = -1;
            //让刚刚上面隐藏的盒子重新显示出来并且完成90°-180°的旋转
            allUpBox[1].style.display = "block";
            allUpBox[0].style.zIndex = 1;
            rotateDown(allUpBox[1]);
            allUpBox[1].style.zIndex = 1;
          }
          if (rotateDeg == 150) {
            beforeTime[0].innerHTML = time;
          }
          if (rotateDeg < 180) {
            requestAnimationFrame(animation);
          }
        };
        animation();
      };

      const rotateDown = (ele) => {
        let rotateDeg = 270;
        const animation = () => {
          rotateDeg += 3;
          ele.style.transform = `perspective(500px) rotateX(${rotateDeg}deg)`;
          if (rotateDeg < 360) {
            requestAnimationFrame(animation);
          }
        };
        animation();
      };
      let time = new Date();
      let oldHour = time.getHours();
      var oldMinute = time.getMinutes();
      var oldSecond = time.getSeconds();
      document
        .querySelector("li:nth-child(1)")
        .querySelectorAll(".beforeTime")
        .forEach((ele) => (ele.innerHTML = formatTime(oldHour)));
      document
        .querySelector(" li:nth-child(3)")
        .querySelectorAll(".beforeTime")
        .forEach((ele) => (ele.innerHTML = formatTime(oldMinute)));
      document
        .querySelector(" li:nth-child(5)")
        .querySelectorAll(".beforeTime")
        .forEach((ele) => (ele.innerHTML = formatTime(oldSecond)));
      const changeTime = () => {
        let time = new Date();
        let hour = time.getHours();
        let minute = time.getMinutes();
        let second = time.getSeconds();
        const setHourBox = document
          .querySelector("li:nth-child(1)")
          .querySelectorAll(".afterTime");
        console.log(document.querySelector("li:nth-child(1)"), "setHourBox");
        if (
          !setHourBox[0].innerHTML ||
          setHourBox[0].innerHTML != formatTime(hour)
        ) {
          if (setHourBox[0].innerHTML)
            rotateUp(
              document
                .querySelector("li:nth-child(1)")
                .querySelectorAll(".beforeTime")[1],
              formatTime(hour),
              1
            );
          setHourBox.forEach((ele) => (ele.innerHTML = formatTime(hour)));
        }
        const setMinuteBox = document
          .querySelector("li:nth-child(3)")
          .querySelectorAll(".afterTime");
        if (
          !setMinuteBox[0].innerHTML ||
          setMinuteBox[0].innerHTML != formatTime(minute)
        ) {
          if (setMinuteBox[0].innerHTML)
            rotateUp(
              document
                .querySelector("li:nth-child(3)")
                .querySelectorAll(".beforeTime")[1],
              formatTime(minute),
              3
            );
          setMinuteBox.forEach((ele) => (ele.innerHTML = formatTime(minute)));
        }
        const setSecondBox = document
          .querySelector("li:nth-child(5)")
          .querySelectorAll(".afterTime");
        setSecondBox.forEach((ele) => (ele.innerHTML = formatTime(second)));
        rotateUp(
          document
            .querySelector("li:nth-child(5)")
            .querySelectorAll(".beforeTime")[1],
          formatTime(second),
          5
        );

        setTimeout(changeTime, 1000);
      };
      changeTime();
    },
  },
};
</script>
<style>

html, body { width:100%; height:100%; margin:0; padding:0; background:#141414; }

#clock {
  position: absolute;
  top:0; bottom:0; left:50%; right:0;
  margin:auto;
  margin-left:-465px;
  width:930px;
  height:200px;
  text-align:center;
}

.num {
  position:relative;
  display:inline-block;
  width:140px;
  height:200px;
  font: 140px 'Roboto Slab', sans-serif;
  color:#404040;
  background:rgba(90,90,90,1);
  border:solid 3px #404040;
  box-sizing:border-box;
  border-radius:18px;
}

.colon {
  position:relative;
  display:inline-block;
  font: 140px 'Roboto Slab', sans-serif;
  top:-60px;
  left:-2px;
  color:#404040;
}

.base span {
  position:absolute;
  display:block;
  width:100%;
}

.upper {
  position:absolute;  
  width:100%;
  height:50%;
  background:linear-gradient(0deg, rgba(200,200,200,1), rgba(255,255,255,1) 15%);
  border-radius:15px 15px 0 0;  
  box-shadow: inset 0 1px 8px rgba(0,0,0,.1);
  overflow:hidden;
  border-bottom:solid 1px rgba(0,0,0,.5);
  box-sizing:border-box;
}

.lower {
  position:absolute;
  top:50%;
  width:100%;
  height:50%;
  background:linear-gradient(180deg, rgba(200,200,200,1), rgba(255,255,255,1) 15%);
  border-radius:0 0 15px 15px;  
  box-shadow: inset 0 -3px 5px rgba(0,0,0,.2);
  overflow:hidden;
  border-top:solid 1px #ddd;
  box-sizing:border-box;
}

.lower span {
  position:relative;
  top:-100%;
}
</style>
