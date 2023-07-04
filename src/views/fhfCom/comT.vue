<template>
    <div class="order-table-contain">
        <!-- <MergeTabel :showIndex="false" :searShow="false" :showColumnHandle="false" :showColumnSetting="false"
        :showCheckbox="true" :showExportBtn="false" :field-list="fieldList" :api="paList" :queryParam="searchObj"
        tableOptionWidth="100" ref="mergeTabel" :page="false" :dialogPage="true" :height="'calc(100vh - 450px)'">
      </MergeTabel> -->
    </div>
</template>
<script>
import MergeTabel from "@/components/mergeForm/index.vue"
export default {
    components:{
        MergeTabel
    },
    data() {
        return {
            searchObj:{},
            fieldList: [
        { name: "项目名称", value: "itemName", noSort: true, ifchoose: true,},
        { name: "项目编码", value: "itemCode", noSort: true, ifchoose: true, width: '160px' },
        { name: "项目所属单位", value: "deptCodeName", noSort: true, ifchoose: true },
        { name: "项目所属专项", value: "specialityName", noSort: true, ifchoose: true, width: '160px' },
        { name: "项目管理类型", value: "magTypeName", noSort: true, ifchoose: true, width: '160px' },
      ],
        };
    },
    created() {
        
    },
    methods: {
        
    }
};
</script>
<style lang="scss">
.order-table-contain {
    padding: 20px;
    padding-top: 5px;
    box-sizing: border-box;
}
</style>

