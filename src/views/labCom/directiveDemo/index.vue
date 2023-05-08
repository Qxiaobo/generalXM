<template>
  <div>
    <el-card class="box-card">
      <div class="titleHead">自定义指令的演示</div>
      <el-divider></el-divider>
      <!-- 节流指令演示 -->
      <div class="itemDemo">
        <el-button
          type="primary"
          v-throttle="[doThrottle, 1000, 'click', '这个是传递的参数']"
          >节流指令演示</el-button
        >
        <el-divider content-position="left">
          v-throttle="[函数名(例如：doThrottle),1000, 'click',
          '这个是传递的参数']" >>>
          前面三个参数固定，函数要传递的参数从第四个开始都是</el-divider
        >
      </div>
      <!-- 复制指令演示 -->
      <div class="itemDemo">
        <el-button
          type="primary"
          style="display: inline-block"
          v-copyDirective="copyText"
          >复制指令演示</el-button
        >
        <el-input
          style="display: inline-block; width: 40%"
          v-model="copyInput"
          placeholder="复制之后可以粘贴在此处进行验证"
        ></el-input>
        <el-divider content-position="left">
          v-copyDirective="copyText" >>>copyText指要复制的文本</el-divider
        >
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "LabProjectIndex",

  data() {
    return {
      copyText: "这个是复制的结果",
      copyInput: "",
      LazyLoad:require('@/assets/images/login_bg.jpg')
    };
  },

  mounted() {},

  methods: {
    doThrottle(e) {
      this.$message.success("节流成功");
    },
  },
};
</script>

<style lang="scss" scoped>
.titleHead {
  color: rgba(64, 158, 255);
  font-size: 32px;
  font-weight: 700;
}
.itemDemo {
  padding: 10px;
}
</style>