<template>
  <div class="container">
  <div class="btn">
    <div class="btn-left">
      <div class="item reportAble">可上报</div>
      <div class="item notReportAble">不可上报</div>
      <div class="item reported">已上报</div>
      <div class="item occupied">已占用</div>
      <div class="item currentlySelected">当前选中</div>
      <div class="item cancelReporting">取消上报</div>
    </div>
    <div class="btn-right">
      <!-- <el-button type="primary" @click="reporting">上报</el-button>
      <el-button type="danger" @click="cancelReporting">取消上报</el-button> -->
    </div>
  </div>
  <div class="wrap">
    <div class="left">
      <div class="merge-column"><span class="title1">日期</span><br><span class="title2">时间</span></div>
      <div v-for="(item, index) in leftTime" :key="index" class="td-title">{{ item.time }}</div>
    </div>
    <div class="right">
      <div class="top">
        <div v-for="(item, index) in dataItem" ref="day" :key="index" class="day">{{ item.day }}</div>
      </div>
      <div class="bottom" @mousedown="handleMouseDown" @contextmenu="handleContextMenu">
        <div
          v-show="positionList.is_show_mask"
          :style="'width:' + mask_width + 'left:' + mask_left + 'height:' + mask_height + 'top:' + mask_top"
          class="mask"
        />
        <div class="area">
          <div v-for="(item, index) in dataItem" :key="index" class="area-item">
            <div
              v-for="(childItem, idx) in item.data"
              :key="idx"
              class="select-item"
              :x="index"
              :y="idx"
              :class="{ currentlySelected: childItem.status == 4, notReportAble: childItem.status == 1, reported: childItem.status == 2, occupied: childItem.status == 3, cancelReporting: childItem.status == 5 }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      leftTime: [], // 左侧时间
      dataItem: [],
      positionList: { 
        is_show_mask: false,
        box_screen_left: 0, // 盒子距离浏览器左侧的距离
        box_screen_top: 0, // 盒子距离浏览器顶部的距离
        start_x: 0,
        start_y: 0,
        end_x: 0,
        end_y: 0
      },
      areaWith: '',
    }
  },
  computed: {
    mask_width() {
      return `${Math.abs(this.positionList.end_x - this.positionList.start_x)}px;`
    },
    mask_height() {
      return `${Math.abs(this.positionList.end_y - this.positionList.start_y)}px;`
    },
    mask_left() {
      return `${Math.min(this.positionList.start_x, this.positionList.end_x) - this.positionList.box_screen_left}px;`
    },
    mask_top() {
      return `${Math.min(this.positionList.start_y, this.positionList.end_y) - this.positionList.box_screen_top}px;`
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    // 模拟二维数据 
     init() {
      const allArr = []
      for (let i = 1; i <= 31; i++) {
        const obj = {
          day: i,
          id: i,
          data: []
        }
        const arr = []
        for (let j = 0; j <= 24; j++) {
          // notReportAble 不可上报 1  reported 已上报 2  occupied 已占用 3
          let status = 0
          if (j < 5) {
            status = 1
          } else if (j > 10 && j < 15) {
            status = 2
          } else if (j > 20) {
            status = 3
          }
          const map = {
            id: j + 1,
            time: j,
            status
          }
          arr.push(map)
        }
        obj.data = arr
        allArr.push(obj)
      }
      console.log(allArr)
      this.dataItem = allArr
      this.leftTime = allArr[0]['data']
    },
    /**
     * status 0 可上报 1 不可上报 2 已上报 3 已暂用 4 当前选中 5 取消上报
     */
    handleCurrentSelected(x, y) {
      const status = this.dataItem[x].data[y].status // 当前状态
      // this.dataItem[x].data[y].selected = !this.dataItem[x].data[y].selected
      if (status == 0) {
        this.dataItem[x].data[y].status = 4
        return
      }
      if (status == 4) {
        this.dataItem[x].data[y].status = 0
        return
      }
      if (status == 2) {
        this.dataItem[x].data[y].status = 5
        return
      }
      if (status == 5) {
        this.dataItem[x].data[y].status = 2
        return
      }
    },
    handleMouseDown(event) {
      // 0 左键 2 右键
      console.log(event.button)
      this.positionList.is_show_mask = true
      this.positionList.start_x = event.clientX
      this.positionList.start_y = event.clientY
      this.positionList.end_x = event.clientX
      this.positionList.end_y = event.clientY
      this.positionList.box_screen_left = document.querySelector('.bottom').getBoundingClientRect().left
      this.positionList.box_screen_top = document.querySelector('.bottom').getBoundingClientRect().top
      document.body.addEventListener('mousemove', this.handleMouseMove) // 监听鼠标移动事件
      document.body.addEventListener('mouseup', this.handleMouseUp) // 监听鼠标抬起事件
    },
    handleMouseMove(event) {
      this.positionList.end_x = event.clientX
      this.positionList.end_y = event.clientY
    },
    handleMouseUp(event) {
      document.body.removeEventListener('mousemove', this.handleMouseMove)
      document.body.removeEventListener('mouseup', this.handleMouseUp)
      this.positionList.is_show_mask = false
      this.handleDomSelect()
      this.resSetXY()
    },
    handleDomSelect() {
      const dom_mask = window.document.querySelector('.mask')
      // getClientRects()方法 每一个盒子的边界矩形的矩形集合
      const rect_select = dom_mask.getClientRects()[0]
      document.querySelectorAll('.select-item').forEach((node, index) => {
        const rects = node.getClientRects()[0]
        if (this.collide(rects, rect_select) === true) {
          const x = node.getAttribute('x')
          const y = node.getAttribute('y')
          // 当前选中
          this.handleCurrentSelected(x, y)
          // this.dataItem[x].data[y].selected = !this.dataItem[x].data[y].selected
        }
      })
    },
    collide(rect1, rect2) {
      const maxX = Math.max(rect1.x + rect1.width, rect2.x + rect2.width)
      const maxY = Math.max(rect1.y + rect1.height, rect2.y + rect2.height)
      const minX = Math.min(rect1.x, rect2.x)
      const minY = Math.min(rect1.y, rect2.y)
      return maxX - minX <= rect1.width + rect2.width && maxY - minY <= rect1.height + rect2.height
    },
    resSetXY() {
      this.positionList.start_x = 0
      this.positionList.start_y = 0
      this.positionList.end_x = 0
      this.positionList.end_y = 0
    },
  }
}

</script>
<style  lang="scss" scope >

.container {
  background: #fff;
  .notReportAble {
    background: #f3f3f3;
  }
  .reported {
    background: #5573e9;
  }
  .occupied {
    background: #ffefdd;
  }
  .currentlySelected {
    background: #a0b1f3;
  }
  .cancelReporting {
    background: #ff4949;
  }
  .btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .btn-left {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .btn-item {
        display: flex;
        flex-direction: row;
        font-size: 14px;
        align-items: center;
        margin-left: 20px;
        .circle {
          width: 15px;
          height: 15px;
          border: 1px solid #d7e2ff;
          margin-right: 10px;
        }
      }
      .item {
        width: 100px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border: 1px solid #d7e2ff;
        cursor: pointer;
      }
      .reportAble {
        background: #fff;
      }
    }
  }
  .wrap {
    display: flex;
    flex-direction: row;
    border: 1px solid #d7e2ff;
    border-bottom: 0;
    align-items: flex-start;
    .left {
      overflow: hidden;
      width: 60px;
      .merge-column {
        width: 100%;
        height: 30px;
        font-size: 12px;
        display: flex;
        align-items: center;
        border-right: 1px solid #d7e2ff;
        border-bottom: 1px solid #d7e2ff;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          width: 1px;
          height: 65px;
          top: 0;
          left: 0;
          background-color: #d7e2ff;
          display: block;
          transform: rotate(-63deg);
          transform-origin: top;
          -ms-transform: rotate(-63deg);
          -ms-transform-origin: top;
        }
        .title1 {
          position: absolute;
          top: 2px;
          right: 2px;
        }
        .title2 {
          position: absolute;
          top: 14px;
          left: 2px;
        }
      }
      .td-title {
        height: calc((100vh - 260px)/24);
        line-height: calc((100vh - 260px)/24);
        text-align: center;
        border-right: 1px solid #d7e2ff;
        border-bottom: 1px solid #d7e2ff;
      }
      &:last-child {
        border-bottom: 0;
      }
    }
    .right {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      .top {
        width: 100%;
        height: 30px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        overflow: hidden;
        .day {
          flex: 1;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-right: 1px solid #d7e2ff;
          border-bottom: 1px solid #d7e2ff;
        }
      }
      .bottom {
        width: 100%;
        height: calc(100vh - 260px);
        position: relative;
        display: flex;
        flex-wrap: wrap;
        user-select: none;
        .mask {
          position: absolute;
          background: #409eff;
          opacity: 0.4;
          z-index: 100;
          left: 0;
          top: 0;
        }
        .area {
          width: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-content: flex-start;
          .area-item {
            flex: 1;
          }
        }
        .select-item {
          width: 100%;
          height: calc((100vh - 260px)/24);
          cursor: pointer;
          border-right: 1px solid #d7e2ff;
          border-bottom: 1px solid #d7e2ff;
        }
      }
    }
  }
}


</style>
