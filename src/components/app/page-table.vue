<template>
    <el-row style="padding: 5px">
        <el-row style="width: 100%">
            <slot name="query" :query="refresh"></slot>
        </el-row>
        <el-row style="width: 100%">
            <el-table :data="tableData.list" stripe :max-height="tableData.tableMaxHeight"
                      :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                <slot name="column"></slot>
            </el-table>
        </el-row>
        <el-row style="padding: 5px;text-align: right;width: 100%">
            <el-pagination small :page-sizes="[10, 50, 100, 200]" :page-size="tableData.pageSize"
                           :current-page="tableData.page"
                           :total="tableData.count" :disabled="tableData.pageDisabled"
                           @size-change="sizeChange" @current-change="currentChange" @prev-click="prevClick"
                           @next-click="nextClick">
            </el-pagination>
        </el-row>
    </el-row>
</template>

<script setup>
import {reactive} from 'vue'

const props = defineProps({
    dataFun: {
        type: Function
    },
    paramFun: {
        type: Function
    },
    queryOnLoad: {
        type: Boolean,
        default: false
    }
})

const tableData = reactive({
    tableMaxHeight: 500,
    page: 1,
    pageSize: 50,
    pageDisabled: false,
    queryDisabled: false,

    count: 0,
    list: []
})

const refresh = () => {
    if (tableData.queryDisabled) {
        return
    }
    changeQueryDisabled(true)

    const param = props.paramFun()
    if (!param) {
        changeQueryDisabled(false)
        return
    }
    param.page = tableData.page
    param.pageSize = tableData.pageSize

    props.dataFun(param, data => {
        tableData.count = data.count
        tableData.list = data.list
        changeQueryDisabled(false)
    }, () => changeQueryDisabled(false))
}

const changeQueryDisabled = (disabled) => {
    tableData.pageDisabled = disabled
    tableData.queryDisabled = disabled
}

const sizeChange = (pageSize) => {
    tableData.page = 1
    tableData.pageSize = pageSize
    refresh()
}

const currentChange = (page) => {
    tableData.page = page
    refresh()
}

const prevClick = (page) => {
    tableData.page = page
    refresh()
}

const nextClick = (page) => {
    tableData.page = page
    refresh()
}

refresh()
</script>

<style scoped>
.el-table__body tr, .el-table__body td {
    padding: 0;
    height: 54px;
}

.el-table th,
.el-table tr,
.el-table td {
    background-color: #063570;
    border: 0;
    color: #93dcfe;
    font-size: 24px;
    height: 5px;
    font-family: Source Han Sans CN Normal, Source Han Sans CN Normal-Normal;
    font-weight: Normal;
}

.el-table::before {
    height: 0px;
}


.el-table__header-wrapper {
    border: solid 1px #04c2ed;
    box-sizing: border-box;
}
</style>