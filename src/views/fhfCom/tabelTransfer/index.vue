<template>
    <div class="wrap">
        <el-form :model="StakeForm" ref="jsAddDialog" label-width="130px" class="demo-ruleForm">
            <el-row style="margin-top: 20px;">
                <el-col :span="4">
                    <el-form-item label="充电站" style="margin-left: -70px;">
                        <el-input v-model="StakeForm.stationId" style="width: 180px;" disabled />
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-button class="newButtonColor SearchBTN" size="midden" @click="search">查询</el-button>
                </el-col>
                
            </el-row>
            <el-row>
                <el-col :span="11">
                    <div class="tableTitle">
                        <span style="font-size: 18px; color: #000; font-weight: 700;">左侧</span>
                        <span>{{ staffCheckNum }}/{{ staffNum }}</span>
                    </div>
                    <!-- :key="tableKey" -->
                    <el-table ref="staffTable" :stripe="true" :data="staffList" max-height="345" :row-key="getRowKey" border
                        fit highlight-current-row @selection-change="handleStaffChange"
                        :header-cell-style="tableHeaderColor">
                        <el-table-column type="index" width="50" align="center" />
                        <el-table-column type="selection" :reserve-selection="true" width="55"
                            align="center"></el-table-column>
                        <el-table-column label="编码" align="center">
                            <template slot-scope="{ row }">
                                <span>{{ row.code }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column label="名称" align="center">
                            <template slot-scope="{ row }">
                                <span>{{ row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="类型" align="center">
                            <template slot-scope="{ row }">
                                <span>{{ row.type }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="分数" align="center">
                            <template slot-scope="{ row }">
                                <span>{{ row.power }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="2" align="center" class="buttonAll"
                    style="display: flex;flex-direction: column;align-items: center;">
                    <el-button @click="addStaff('single')" type="primary" size="mini" :disabled="!staffData.length"
                        class="staffButton">
                        加入右侧
                        <i class="el-icon-arrow-right"></i>
                    </el-button>
                    <el-button @click="removeStaff('single')" type="primary" size="mini"
                        :disabled="!selectedStaffData.length" class="staffButton">
                        <i class="el-icon-arrow-left"></i>
                        加入左侧
                    </el-button>
                </el-col>
                <el-col :span="11">
                    <div class="tableTitle">
                        <span style="font-size: 18px; color: #000; font-weight: 700;">右侧</span>
                        <span>{{ selectedStaffCheckNum }}/{{ selectedStaffNum }}</span>
                    </div>
                    <el-table ref="selectedStaffTable" :stripe="true" :data="selectedStaffList" max-height="345"
                        :row-key="getRowKey" border fit highlight-current-row @selection-change="handleSelectedStaffChange"
                        :header-cell-style="tableHeaderColor">
                        <el-table-column type="index" width="50" align="center" />
                        <el-table-column type="selection" :reserve-selection="true" width="55"
                            align="center"></el-table-column>
                        <el-table-column label="编码" align="center">
                            <template slot-scope="{ row }">
                                <span>{{ row.code }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column label="名称" align="center">
                            <template slot-scope="{ row }">
                                <span>{{ row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="类型" align="center">
                            <template slot-scope="{ row }">
                                <span>{{ row.type }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="分数" align="center">
                            <template slot-scope="{ row }">
                                <span>{{ row.power }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-row style="margin-top: 20px;">
                <el-col :span="2" :push="18" style="transform: translateX(35px);">
                    <el-button size="mini" class="SearchBTN otherBTN">取消</el-button>
                </el-col>
                <el-col :span="2" :push="18">
                    <el-button class="newButtonColor SearchBTN" size="mini" @click="save">保存</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import "@/mock/fhfMock/index.js";
import { getTabelTransfer } from "@/api/fhfApi/tabelTransferApi"
export default {
    data() {
        return {
            StakeForm: {
                stationId: ''
            },
            // 左边列表
            staffList: [],
            // 右边列表
            selectedStaffList: [],
            // 左侧选中列表
            staffData: [],
            // 右侧选中列表
            selectedStaffData: [],
            // 左侧总数
            staffNum: 0,
            // 左侧选中数量
            staffCheckNum: 0,
            // 右侧总数
            selectedStaffNum: 0,
            // 右侧选中数量
            selectedStaffCheckNum: 0,           
        }
    },
    mounted() {
        this.getTabelTransfer()
    },
    computed: {

    },
    methods: {
        search(){
            this.getTabelTransfer() 
        },
        getTabelTransfer() {
            let obj = {
                stationId: this.StakeForm.stationId,
            }
            getTabelTransfer(obj).then(res => {
                console.log(res, "穿梭框数据");
                this.staffList = res.data.left
                this.staffNum = this.staffList.length
                this.selectedStaffList = res.data.right
                this.selectedStaffNum = this.selectedStaffList.length
            })
        },
        // 左边表格选中存入staffData
        handleStaffChange(rows) {
            this.staffCheckNum = rows.length
            this.staffData = []
            if (rows) {
                rows.forEach((row) => {
                    if (row) {
                        this.staffData.push(row)
                    }
                })
            }
        },
        // 左->右(单选-全选)
        addStaff(type) {
            setTimeout(() => {
                // 清空选择
                this.$refs['staffTable'].clearSelection()
                this.$refs['selectedStaffTable'].clearSelection()
            }, 0)
            console.log(this.staffData, 'this.staffData');
            if (type === 'single') {
                this.staffData.forEach((item) => {
                    // this.selectedStaffList.push({ equipmentId: item.devId, equipmentName: item.devName, equipmentType: item.engSupTypeName, equipmentCapacity: item.ratePower, isCheck: item.isCheck, optTime: item.optTime })
                    this.selectedStaffList.push(item)
                })
                this.selectedStaffNum = this.selectedStaffList.length
                for (let i = 0; i < this.staffList.length; i++) {
                    for (let j = 0; j < this.staffData.length; j++) {
                        if (this.staffList[i].code === this.staffData[j].code) {
                            this.staffList.splice(i, 1)
                            this.staffNum = this.staffList.length
                        }
                    }
                }
            }

        },
        // 右边表格选中存入selectedStaffData
        handleSelectedStaffChange(rows) {
            this.selectedStaffCheckNum = rows.length
            this.selectedStaffData = []
            if (rows) {
                rows.forEach((row) => {
                    if (row) {
                        this.selectedStaffData.push(row)
                    }
                })
            }
        },
        // 右->左(单选-全选)
        removeStaff(type) {
            setTimeout(() => {
                this.$refs['staffTable'].clearSelection()
                this.$refs['selectedStaffTable'].clearSelection()
            }, 0)
            if (type === 'single') {
                this.selectedStaffData.forEach((item) => {
                    // this.staffList.push({
                    //     devId: item.equipmentId,
                    //     devName: item.equipmentName,
                    //     engSupTypeName: item.equipmentType,
                    //     ratePower: item.equipmentCapacity,
                    //     isCheck: item.isCheck,
                    //     optTime: item.optTime
                    // })
                    this.staffList.push(item)
                    this.staffNum = this.staffList.length
                })

                console.log('this.staffList', this.staffList)
                for (let i = 0; i < this.selectedStaffList.length; i++) {
                    for (let j = 0; j < this.selectedStaffData.length; j++) {
                        if (
                            this.selectedStaffList[i] &&
                            this.selectedStaffData[j] &&
                            this.selectedStaffList[i].code === this.selectedStaffData[j].code
                        ) {
                            this.selectedStaffList.splice(i, 1)
                            this.selectedStaffNum = this.selectedStaffList.length
                        }
                    }
                }
            }
            // if (type === 'all') {
            //   this.selectedStaffList.forEach((item) => {
            //     this.staffList.push(item)
            //     this.staffNum = this.staffList.length
            //   })
            //   this.selectedStaffList = []
            //   this.selectedStaffNum = 0
            // }
        },
        getRowKey(row) {
            return row.code
        },
        tableHeaderColor({ row, column, rowIndex, columnIndex }) {
            return {
                'background-color': '#F4F4F4',
                'color': "#000000"
            }
        },
        save(){
            console.log(this.selectedStaffList,"右侧待保存的数组");
        }
    },
}
</script>
<style lang="scss" scoped>
.wrap {
    width: 100%;
    height: calc(100% - 52px);
    // background-color: rgb(175, 251, 104);
    box-sizing: border-box;
}

.buttonAll {
    margin-top: 80px;

}

.staffButton {
    margin-top: 16px;
    width: 90%;
    height: 40px;
    margin-left: 0;
}
</style>
