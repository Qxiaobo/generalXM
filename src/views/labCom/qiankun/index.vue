<template>
    <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="vue" name="first">
        <!-- 使用qiankun把子应用展示出来 -->

        <div id="vue">
            
        </div>
    </el-tab-pane>
    <el-tab-pane label="react" name="second">
        <div id="react">
            
        </div>
    </el-tab-pane>

  </el-tabs>
    </el-card>
</template>

<script>
export default {
    name: 'LabProjectIndex',

    data() {
        return {
            activeName: 'first'
        };
    },

    mounted() {
        
    },

    methods: {
        handleClick(tab, event) {
        console.log(tab, event);
      }
    },
};
</script>

<style lang="scss" scoped>
#vue{
    width: 100%;
    height: 500px;
    // background:#ccc;
}
#react{
    width: 500px;
    height: 500px;
    background:#555;

}
</style>
