
<template>
  <div class="wrap">
    <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
      {{ tag }}
    </el-tag>
    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
      @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    <el-button type="primary" size="small" @click="confirmSave">确定</el-button>
    <el-card class="box-card">
      <CleanForm :tableOptionWidth="400" :searShow="false" :showIndex="true" :showColumnHandle="false"
        :showColumnSetting="false" :showCheckbox="false" :field-list="headList" :api="getFromApi01"
        :queryParam="queryDetailParam" ref="queryStaSumDetails" :page="false" :dialogPage="true">
      </CleanForm>
    </el-card>
  </div>
</template>
<script>
import '@/mock/labMock/index.js'
import { getFromApi01 } from '@/api/labApi/fromApi.js'
export default {
  name: 'labComPage',
  components: {
    // getFromApi01
  },
  data() {
    return {
      getFromApi01,
      dynamicTags: JSON.parse(localStorage.getItem('labTags')) || this.$store.state.labTags || [],
      inputVisible: false,
      inputValue: '',
      queryDetailParam:{},
      headList: [
        {
          name: "姓名",
          value: "batchName",
          noSort: true
        },
        { name: "国家", value: "unitCode", noSort: true, },
        { name: "地区", value: "areaCode", noSort: true },
        { name: "开始时间", value: "validTime", noSort: true },
        { name: "出发时间", value: "buyTime", noSort: true },
        { name: "总额", value: "subsidyEstimate", noSort: true },
        { name: "一月流量", value: "month1", noSort: true },
        { name: "二月流量", value: "month2", noSort: true },
      ]
    }
  },
  async mounted() {
    const res = await getFromApi01()
    console.log(res)
  },
  computed: {

  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    confirmSave() {
      try {
        this.$store.commit('labSaveTags', this.dynamicTags)
        this.$message.success('保存成功')
      } catch (error) {
        this.$message.error('保存失败')
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.box-card{
  margin-top: 10px;
}
.wrap {
  width: 100%;
  height: calc(100% - 50px);
  /* margin-top: 10px; */
  padding: 10px;
  /* overflow-x: hidden; */
  /* background-color: aquamarine; */
}

.el-tag+.el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
  margin-right: 10px
}
</style>
