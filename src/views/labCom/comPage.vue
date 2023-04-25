
<template>
  <div class="wrap">
    <el-tag style="cursor: pointer;" :key="index" v-for="(tag,index) in dynamicTags" @click="clickTag(tag.path)" closable :disable-transitions="false" @close="handleClose(tag)">
      {{ tag.name }}
    </el-tag>
    <!-- <el-button size="small"  class="tag-btn" :key="tag" v-for="tag in dynamicTags" @click="clickTag()" closable :disable-transitions="false" @close="handleClose(tag)">
      {{ tag }}
    </el-button> -->
    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
      @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    <el-button type="primary" size="small" @click="confirmSave" style="margin-top: 100px;">确定</el-button>
    <!-- This was made with GlassGenerator.netlify.app -->
    <router-view />
    
  </div>
  
</template>
<script>
export default {
  name: 'labComPage',
  components: {
    // getFromApi01
  },
  data() {
    return {
      dynamicTags: JSON.parse(localStorage.getItem('labTags')) || this.$store.state.labTags || [],
      inputVisible: false,
      inputValue: '',
   
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
    },
    clickTag(i){
      console.log(i)
      console.log('row');
      this.$router.push(`${i}`)
    },
  },
}
</script>
<style lang="scss" scoped>
/* This was made with GlassGenerator.netlify.app */ 

.box-card{
  margin-top: 10px;
  
}
.wrap {
  width: 100%;
  height: calc(100% - 52px);
  /* margin-top: 10px; */
  padding: 10px;
  /* overflow-x: hidden; */
  /* background-color: aquamarine; */
  box-sizing: border-box;
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
