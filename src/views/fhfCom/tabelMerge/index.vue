<template>
    <div class="order-table-contain">
        <el-table :data="tableRowData" border style="width: 100%;" :span-method="mergeRowMethod">
            <el-table-column align="center" prop="sort" label="编号">
            </el-table-column>
            <el-table-column align="center" prop="sex" label="性别">
            </el-table-column>
            <el-table-column align="center" prop="mz" label="民族">
            </el-table-column>
            <el-table-column align="center" prop="name" label="名称">
            </el-table-column>
            <el-table-column align="center" prop="age" label="年龄">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            originData: [
                {
                    sort: '01',
                    label: '编号',
                    children: [
                        {
                            label: '性别',
                            sex: '女',
                            children: [
                                {
                                    label: '民族',
                                    mz: '汉族',
                                    children: [
                                        {
                                            name: '01-1号',
                                            age: '12岁'
                                        },
                                        {
                                            name: '01-2号',
                                            age: '12岁'
                                        },
                                        {
                                            name: '01-3号',
                                            age: '12岁'
                                        },
                                    ]
                                }, {
                                    label: '民族',
                                    mz: '其他',
                                    children: [
                                        {
                                            name: '01-1号',
                                            age: '12岁'
                                        },
                                        {
                                            name: '01-2号',
                                            age: '12岁'
                                        },
                                        {
                                            name: '01-3号',
                                            age: '12岁'
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            label: '性别',
                            sex: '男',
                            children: [
                                {
                                    label: '民族',
                                    mz: '汉族',
                                    children: [
                                        {
                                            name: '01-1号',
                                            age: '12岁'
                                        },
                                        {
                                            name: '01-2号',
                                            age: '12岁'
                                        },
                                        {
                                            name: '01-3号',
                                            age: '12岁'
                                        },
                                    ]
                                }, {
                                    label: '民族',
                                    mz: '其他',
                                    children: [
                                        {
                                            name: '01-1号',
                                            age: '12岁'
                                        },
                                        {
                                            name: '01-2号',
                                            age: '12岁'
                                        },
                                        {
                                            name: '01-3号',
                                            age: '12岁'
                                        },
                                    ]
                                },

                            ]
                        },
                    ]
                },
                {
                    sort: '02',
                    label: '编号',
                    children: [
                        {
                            label: '性别',
                            sex: '女',
                            children: [
                                {
                                    label: '民族',
                                    mz: '汉族',
                                    children: [
                                        {
                                            name: '01-1号',
                                            age: '12岁'
                                        },
                                        {
                                            name: '01-2号',
                                            age: '12岁'
                                        },
                                        {
                                            name: '01-3号',
                                            age: '12岁'
                                        },
                                    ]
                                }, {
                                    label: '民族',
                                    mz: '其他',
                                    children: [
                                        {
                                            name: '01-1号',
                                            age: '12岁'
                                        },
                                        {
                                            name: '01-2号',
                                            age: '12岁'
                                        },
                                        {
                                            name: '01-3号',
                                            age: '12岁'
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            label: '性别',
                            sex: '男',
                            children: [
                                {
                                    label: '民族',
                                    mz: '汉族',
                                    children: [
                                        {
                                            name: '01-1号',
                                            age: '12岁'
                                        },
                                        {
                                            name: '01-2号',
                                            age: '12岁'
                                        },
                                        {
                                            name: '01-3号',
                                            age: '12岁'
                                        },
                                    ]
                                }, {
                                    label: '民族',
                                    mz: '其他',
                                    children: [
                                        {
                                            name: '01-1号',
                                            age: '12岁'
                                        },
                                        {
                                            name: '01-2号',
                                            age: '12岁'
                                        },
                                        {
                                            name: '01-3号',
                                            age: '12岁'
                                        },
                                    ]
                                },

                            ]
                        },
                    ]
                },
            ],
            tableRowData: [],
            columnLength: 0
        };
    },
    created() {
        this.loadRowData()
    },
    methods: {
        loadRowData() {
            this.tableRowData = []
            let originArr = JSON.parse(JSON.stringify(this.originData))
            // 普通的数据转换，将后台格式转换成element表格需要的格式
            if (Array.isArray(originArr)) {
                originArr.map(res => {
                    if (Array.isArray(res.children)) {
                        res.children.map((subRes, subIndex) => {
                            subRes.children.map((item, index) => {
                                item.children.map((obj, objIdx) => {
                                    let content = {}
                                    content['sort'] = res.sort
                                    content['sex'] = subRes.sex
                                    if (subIndex == 0 && index == 0&&objIdx == 0) {
                                        content['rowNum'] = res.children.length * subRes.children.length * item.children.length
                                    }
                                    content['mz'] = item.mz
                                    // 重点！赋值合并的行数数值，只需要取子循环的第一个数赋值待合并的行数即可
                                    if (index == 0&&objIdx == 0) {
                                        content['rowNum2'] = subRes.children.length * item.children.length
                                    }
                                    if (objIdx == 0) {
                                        content['rowNum3'] = item.children.length
                                    }
                                    content['name'] = obj.name
                                    content['age'] = obj.age
                                    
                                    this.tableRowData.push(content)
                                })

                            })

                        })
                    }
                })
            }
            console.log(this.tableRowData);
        },
        // 合并行
        mergeRowMethod({ row, column, rowIndex, columnIndex }) {
            // columnIndex 代表列数，从0开始计数,我们要合并的字段属于第一列，取0
            if (columnIndex == 0) {
                return {
                    rowspan: row.rowNum, // 待合并行数 -- 合并的行数长度就等于之前赋值的子数据的长度；未赋值的即表示0，不显示
                    colspan: row.rowNum > 0 ? 1 : 0  // 待合并列数 -- 合并的列数自身占一列，被合并的要返回0，表示不显示
                };
            }
            if (columnIndex == 1) {
                return {
                    rowspan: row.rowNum2, // 待合并行数 -- 合并的行数长度就等于之前赋值的子数据的长度；未赋值的即表示0，不显示
                    colspan: row.rowNum2 > 0 ? 1 : 0  // 待合并列数 -- 合并的列数自身占一列，被合并的要返回0，表示不显示
                };
            }
            if (columnIndex == 2) {
                return {
                    rowspan: row.rowNum3, // 待合并行数 -- 合并的行数长度就等于之前赋值的子数据的长度；未赋值的即表示0，不显示
                    colspan: row.rowNum3 > 0 ? 1 : 0  // 待合并列数 -- 合并的列数自身占一列，被合并的要返回0，表示不显示
                };
            }
        },
    }
};
</script>
<style lang="scss">
.order-table-contain {
    padding: 20px;
    padding-top: 5px;
    box-sizing: border-box;

    // 设置表头样式
    .el-table__header-wrapper {
        .el-table__header {
            .is-group {
                tr:nth-child(2) {
                    display: none;
                }
            }
        }
    }
}
</style>

