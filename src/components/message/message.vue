<template>
  <!-- #3 -->
  <transition name="message-transition">
    <!-- #2 -->
    <div class="xtx-message" :style="style[type]" v-show="isShow">
      <i class="iconfont" :class="style[type].icon" style="margin-right: 10px; transform: translateY(1px);"></i>
      <span class="text">{{ text }}</span>
    </div>

  </transition>

</template>
<script>
export default {
  name: 'MessageLab',
  props: {
    type: {
      type: String,
      default: 'success',
      validator: function (value) {
        return ['success', 'error', 'warning'].indexOf(value) !== -1
      },
    },
    text: {
      type: String,
    },
  },
  data() {
    return {
  
      isShow: false,
      style: {
        warning: {
          icon: 'el-icon-warning',
          color: '#E6A23C',
          backgroundColor: 'rgb(253, 246, 236)',
          borderColor: 'rgb(250, 236, 216)',
        },
        error: {
          icon: 'el-icon-error',
          color: '#F56C6C',
          backgroundColor: 'rgb(254, 240, 240)',
          borderColor: 'rgb(253, 226, 226)',
        },
        success: {
          icon: 'el-icon-success',
          color: '#67C23A',
          backgroundColor: 'rgb(240, 249, 235)',
          borderColor: 'rgb(225, 243, 216)',
        },
      },
    }
  },
  mounted() {
    this.isShow = true
  },
}
</script>
<style scoped lang="less">
.xtx-message {
  // width: 300px;
  min-width: 340px;
  height: 45px;
  position: fixed;
  z-index: 9999;
  left: 47%;
  margin-left: -150px;
  top: 20px;
  line-height: 45px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;

  i {
    margin-right: 4px;
    vertical-align: middle;
  }

  .text {
    vertical-align: middle;
  }
}

.message-transition-enter-active,
.message-transition-leave-active {
  transition: all 0.5s;
}

.message-transition-enter,
.message-transition-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}</style>