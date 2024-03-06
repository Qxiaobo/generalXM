<template>
  <div style="text-align: center; margin-top: 20px; height: 790px;">
    <el-tree :data="data" show-checkbox node-key="id" :props="defaultProps" class="custom-tree">
    </el-tree>
  </div>
</template>

<style scoped>
 ::v-deep .custom-tree .el-tree-node.is-level-1 .el-checkbox {
  display: none;
}
</style>

<script>
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  }
};
</script>