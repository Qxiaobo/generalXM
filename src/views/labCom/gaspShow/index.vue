<template>
  <div class="test-clock-container">
    <flip-clock />
  </div>
</template>
<script>
import FlipClock from "./src/FlipClock.vue";
export default {
  components: {
    FlipClock,
  },
};
</script>
<style lang="scss">
.test-clock-container {
  font: normal 14px "Helvetica Neue", Helvetica, sans-serif;
  user-select: none;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
  background: radial-gradient(ellipse at center, #969696 0%, #595959 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
::v-deep .inn{
  background: red;
}
</style>
