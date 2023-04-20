<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="lab" v-for="(item,index) in list" :key="index" >{{item.name}}</div>
    <div @click="doClick" >  点击</div>
  </div>
</template>

<script>
import {firstData} from '@/api/data.js'
// import axios from 'axios'
export default {
  name: 'AboutView',
  data(){
    return {
      list :[]
    }
  },
  created() {
    // this.getFirstData()
  //   const Mock = require('mockjs')
  //  const data = require('../mock/data.js')
  //  console.log(data)
//   axios.post("api/data").then(response => {
//     console.log(response)
// });
  },
  methods: {
    async doClick(){
      const res = await firstData()
      this.list = res.list
      console.log(res)
    },
    async getFirstData() {
      const res = await firstData()
      this.list = res.list
      console.log(res)
    }
  }
};

</script>
<style lang="scss" >
@import '@/styles/variables.scss' ;

.lab{
  font-family: 'ZhenyanGB-Regular';
  color: $leo-theme-color;
}
</style>
 