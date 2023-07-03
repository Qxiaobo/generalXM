
<template >
<div >
  <YyTreeOrgNode
    :bottom-icon="bottomIcon"
    :data="data"
    :icon="icon"
    :middle-icon="middleIcon"
    :show-lower-level-num="showLowerLevelNum"
    :tree-org-click="(clickedData)=>treeOrgClick(clickedData)"
    :tree-org-config="treeOrgConfig"
  />
</div>
</template>

<script setup >
import { ref, reactive, provide } from "vue";
import YyTreeOrgNode from "./YyTreeOrgNode.vue";
const props = defineProps({
  treeOrgConfig: { // 组织架构树配置项
    type: Object,
    default: () => ({
      nodeName: "nodeName", // 节点名称
      nodeId: "nodeId", // 节点id
      children: "children", // 子节点数组
      iconNum: "iconNum", // 节点后段插槽字段名称
    }),
  },
  data: { // 必传！架构树渲染数组树形结构
    type: Object,
    required: true,
  },
  treeOrgClick: { // 节点点击事件，传递一个函数(data)=>{你的函数(data)}
    type: Function,
    default: () => {},
  },
  middleIcon: { // 节点后段(中间)插槽图标
    type: undefined,
    default: null,
  },
  bottomIcon: { // 节点后段插槽图标
    type: undefined,
    default: null,
  },
  showLowerLevelNum: {
    type: Boolean,
    default: true,
  },
});

const store = reactive({ focusStatus: "" });

provide("YyTreeOrgStore", store);
</script>

<style scoped >

</style>
