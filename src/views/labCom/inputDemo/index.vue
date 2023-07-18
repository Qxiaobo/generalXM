<template>
    <el-card>
        <SelectAdd :labelslist="selectList" val="value" label="label">
        </SelectAdd>
        <el-divider content-position="left">
            输入框新增选项</el-divider>
        <inputIp clearable v-model="ip" ></inputIp>
        <el-divider content-position="left">
            ip输入框>>> 参数配置：【v-model：绑定数据】，【disabled：是否禁用】，【clearable：是否可清空】，【readonly：是否只读】，【size：大小】，【formatStyle：返回格式(node/noNode-->noNode不带·)】   </el-divider>
    </el-card>
</template>

<script>
export default {
    name: 'LabProjectIndex',

    data() {
        return {
            selectList: [
                {
                    value: "1",
                    label: "小红",
                },
                {
                    value: "2",
                    label: "小明",
                },
                {
                    value: "3",
                    label: "小李",
                },
                {
                    value: "4",
                    label: "小张",
                },
                {
                    value: "5",
                    label: "小刘",
                },
            ],
            ip: ''
        };
    },

    mounted() {

    },

    methods: {

    },
};
</script>

<style lang="scss" scoped></style>