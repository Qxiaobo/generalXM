<template>
  <div>
    <Map :cityData="cityData"></Map>
  </div>
</template>
<script>
export default {
  data() {
    return {
        cityData: [{ name: "南京", value: 0 },
      { name: "无锡", value: 0 },
      { name: "徐州", value: 0 },
      { name: "常州", value: 0 },
      { name: "苏州", value: 0 },
      { name: "南通", value: 0 },
      { name: "盐城", value: 0 },
      { name: "扬州", value: 0 },
      { name: "镇江", value: 0 },
      { name: "淮安", value: 0 },
      { name: "宿迁", value: 0 },
      { name: "泰州", value: 0 },
      { name: "连云港", value: 0 }],
    }
  },
  mounted(){

  },
  computed:{

  },
  methods:{

  },
}
</script>
<style scoped>

</style>
