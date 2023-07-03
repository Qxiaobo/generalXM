<template >
<div class="yy-tree-org-node" >
  <!-- 最大父节点 -->
  <div v-if="parentNode" >
    <div
      class="parentDiv"
      @click="toggleExpand"
    >
      <YyIcon
        box="32"
        :icon-component="company"
        size="20"
      />

      <div class="parentTitle" >
        {{ data[treeOrgConfig.nodeName] }}
      </div>
    </div>
  </div>

  <!-- 子节点 -->
  <div
    v-else
    :key="data"
    class="yy-tree-org-node__content"

    :style="store.focusStatus === data[treeOrgConfig.nodeId] ? `background-color:${focusColor}` :'' "
    @click="treeOrgClickComponents(data)"
  >
    <div class="text" >
      {{ data[treeOrgConfig.nodeName] }}
    </div>

    <div >
      <div style="height: 15px;" >
        <div
          v-if="!showLowerLevelNum"
          style="display: flex;"
        >
          <!-- 尾部议题添加插槽 -->
          <div
            class="yyIcon"
            style="margin-left: 5px;"
          >
            <YyIcon
              v-if="data[treeOrgConfig.children]?.length=== false?'':data[treeOrgConfig.children]?.length"
              box="32"
              color="#9a9a9a"
              :icon-component="user"
              size="15"
            />
          </div>

          <div
            class="yyIconNum"
            style="font-weight: 500;font-size: 12px;margin-right: 2px;"
          >
            {{ data[treeOrgConfig.children]?.length=== 0?'':data[treeOrgConfig.children]?.length }}
          </div>
        </div>
      </div>

      <div style="height: 15px;" >
        <div
          v-if="data[treeOrgConfig.middleIconNum] && data[treeOrgConfig.middleIcon] !== 0"
          style="display: flex;"
        >
          <!-- 尾部议题(中间)添加插槽 -->
          <div
            class="yyIcon"
            style="margin-left: 5px;"
          >
            <YyIcon
              box="32"
              color="#9a9a9a"
              :icon-component="middleIcon"
              size="15"
            />
          </div>

          <div
            class="yyIconNum"
            style="font-weight: 500;font-size: 12px;margin-right: 2px;"
          >
            {{ middleIconNum }}
          </div>
        </div>
      </div>

      <div style="height: 15px;" >
        <div
          v-if="data[treeOrgConfig.bottomIconNum] && data[treeOrgConfig.bottomIconNum] !== 0"
          style="display: flex;"
        >
          <!-- 尾部议题（底部）添加插槽 -->
          <div
            class="yyIcon"
            style="margin-left: 5px; "
          >
            <YyIcon
              box="32"
              color="#9a9a9a"
              :icon-component="bottomIcon"
              size="15"
            />
          </div>

          <div

            class="yyIconNum"
            style="font-weight: 500;font-size: 12px;margin-right: 2px;"
          >
            {{ bottomIconNum }}
          </div>
        </div>
      </div>
    </div>
    <!-- 节点按钮 -->
    <button
      v-if="!parentNode"
      class="yy-tree-org-node__expand"
      @click="toggleExpand"
    >
      <YyIcon
        v-if="data[treeOrgConfig.children]?.length === 0"
        box="32"
        color="#9a9a9a"
        :icon-component="minus"
        size="15"
        style="margin-top: 4px;margin-left: 3px;"
      />

      <YyIcon
        v-else-if="isExpanded"
        box="32"
        color="#9a9a9a"
        :icon-component="minus"
        size="15"
        style="margin-top: 4px;margin-left: 3px;"
      />

      <YyIcon
        v-else-if="!isExpanded"
        box="32"
        color="#9a9a9a"
        :icon-component="add"
        size="15"
        style="margin-top: 4px;margin-left: 3px;"
      />
    </button>
  </div>
  <!-- 第二级 -->
  <!-- 目的是为了去除页面中children的线条 -->
  <div v-if="parentNode" >
    <div
      v-show="isExpanded && data[treeOrgConfig.children]?.length > 0"
      class="yy-tree-org-node__parent_children"
    >
      <YyTreeOrgNode
        v-for="(child, index) in data[treeOrgConfig.children]"
        :key="index"
        :bottom-icon="bottomIcon"
        :data="child"
        :middle-icon="middleIcon"
        :parent-node="false"
        :tree-org-click="(clickedData)=>treeOrgClick(clickedData)"
      />
    </div>
  </div>
  <!-- 第三级 -->
  <div
    v-if="!parentNode"
    class="childrenTreeOrgNode"
  >
    <div
      v-show="isExpanded && data[treeOrgConfig.children]?.length > 0"
      class="yy-tree-org-node__children"
    >
      <YyTreeOrgNode
        v-for="(child, index) in data[treeOrgConfig.children]"
        :key="index"
        :bottom-icon="bottomIcon"
        :data="child"
        :middle-icon="middleIcon"
        :parent-node="false"
        :tree-org-click="(clickedData)=>treeOrgClick(clickedData)"
      />
    </div>
  </div>
</div>
</template>

<script setup >
import { ref, computed, inject } from "vue";
import YyIcon from "@/components/YyIcon/YyIcon.vue";
import user from "./Icons/user.svg";
import company from "./Icons/company.svg";
import minus from "./Icons/minus.svg";
import add from "./Icons/add.svg";

const props = defineProps({
  treeOrgConfig: { // 组织架构树配置项
    type: Object,
    default: () => ({
      nodeName: "nodeName", // 节点名称
      nodeId: "nodeId", // 节点id
      children: "children", // 子节点数组
      middleIconNum: "middleIconNum", // 节点后段（中间）插槽字段名称
      bottomIconNum: "bottomIconNum", // 节点后段（中间）插槽字段名称
    }),
  },
  data: { // 必传！架构树渲染数组树形结构
    type: Object,
    required: true,
  },
  focusColor: {
    type: String,
    default: "#f1f3f4",
  },
  parentNode: { // 目的是为了判断是否是最大节点，非必传
    type: Boolean,
    default: true,
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

const store = inject("YyTreeOrgStore");

const treeOrgClickComponents = (data) => {
  store.focusStatus = data[props.treeOrgConfig.nodeId];
  props.treeOrgClick(data);
};
const isExpanded = ref(true);
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};
const hasIconNum = computed(() => {
  return props.data[props.treeOrgConfig.iconNum] && props.data[props.treeOrgConfig.iconNum] !== 0;
});

const iconNum = computed(() => {
  return props.data[props.treeOrgConfig.iconNum];
});

</script>

<style scoped lang="scss" >

.yy-tree-org-node__content_background{
  background-color: #f1f3f4!important;

}
.parentDiv{
  position: relative;
  z-index: 100000;
  margin-left: 17px;
  display: flex;
  align-items: center;
  line-height: 15px;
  background-color: #ffffff;
}
.parentTitle{
   padding-bottom: 5px;
}
.yy-tree-org-node {
  z-index: 1000;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 30px;

  &__content {
    cursor: pointer;
    z-index: 10000000;
    height: 60px;
    position: relative;
    margin-top: 20px;
    padding: 5px;
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 2px 2px 4px rgba(197, 197, 197, 0.5);
    padding: 8px;
    font-weight: 700;
    display: flex;
    align-items: center;
    .text{
      margin-right: 40px;
    }
    .num{
      position: absolute;
      top: 5px;
      right: 10px;
      font-weight: 500;
      font-size: 10px;
      display: flex;
    }
  }
  // &__content::before{
  //    content: "";
  //   position: absolute;
  //   top: calc(50% - 4px);
  //   left: -30px;
  //   bottom: 100%;
  //   width:30px;
  //   height: calc(100% + 18px) ;
  //   border-top: 1px solid black; /* 左边边框的样式 */
  // }

  &__expand {
    z-index: 1000;
    position: absolute;
    top:25%;
    left:-41px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    line-height: 17px;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__expand::before {
   z-index: -1000000;
   content: "";
    position: absolute;
    // top: calc(-100% - 8px);
    left: 9px;
    bottom: 100%;
    // width:calc(50% + 10px);
    width: 1px;
    height: calc(100% + 43px) ;
    border-left: 1px solid #e5e5e5; /* 左边边框的样式 */
  }
  &__expand::after {
   content: "";
    position: absolute;
    bottom: 50%;
    left: 100%;
    width: calc(100% + 2px);
    height: 1px;
    background-color:  #e5e5e5;
  }

  &__children {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-left: 30px;
  }
  &__parent_children {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-left: 30px;
  }

  &__children::before {
     z-index: -1000;
    content: "";
    position: absolute;
    top: -30px;
    left: -60px;
    width: 1px;
    height: calc(100% + 10px);
    background-color: #e5e5e5;
  }
}
.yy-tree-org-node__children:first-child::after {
  content: none!important;
  display: none !important;
}
.childrenTreeOrgNode{
  .yy-tree-org-node:last-child{
    .yy-tree-org-node__children::before {
      background-color:green !important;
      content: none!important;
      display: none !important;
    }

  }
}

</style>
