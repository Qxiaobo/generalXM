<template>
  <div>
    <LabVideo
        style="width: 70%"
        src="http://vjs.zencdn.net/v/oceans.mp4"
        poster="https://dss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=3116969970,369998502&fm=218&app=92&f=PNG?w=121&h=75&s=1215A96407E49F491CF3C98B0300B08F"/>
        <el-button  type="primary" @click="playMusic" > 点击播放媒体 </el-button>
  </div>
</template>

<script>
import LabVideo from '@/components/labVideo/index.vue';
import { playSound } from '@/utils/utils';
export default {
  name: 'LabProjectMain',
  components: {
    LabVideo
  },
  data() {
    return {
      
    };
  },

  mounted() {
    clearTimeout(this.timer);
  },

  methods: {
    playMusic(){
      playSound(require('@/assets/audio/spaceLine.mp3'))
    }
  },
};
</script>

<style lang="scss" scoped>

</style>