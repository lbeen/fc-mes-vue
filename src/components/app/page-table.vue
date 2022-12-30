<template>
    <el-row :id="mainId">
        <el-row :id="queryPartId">
            <slot name="query" :query="query"/>
        </el-row>
        <el-row>
            <el-table :data="tableData.list" stripe :max-height="tableData.tableMaxHeight"
                      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                      @row-click="rowClick">
                <slot name="column"/>
            </el-table>
        </el-row>
        <el-row :id="paginationPartId" style="padding: 5px;text-align: right;">
            <el-pagination small :page-sizes="[10, 15, 50, 100]" :page-size="tableData.pageSize"
                           :current-page="tableData.page"
                           layout="sizes, prev, pager, next, total"
                           :total="tableData.count" :disabled="tableData.pageDisabled"
                           @size-change="sizeChange" @current-change="currentChange" @prev-click="prevClick"
                           @next-click="nextClick">
            </el-pagination>
        </el-row>
    </el-row>
</template>

<script setup>
import {onMounted, reactive} from 'vue'

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
    },
    rowClick: {
        type: Function,
        default: () => {}

    }
})

const mainId = Math.random().toString(36)
const queryPartId = mainId + 'part'
const paginationPartId = mainId + 'pagination'

const tableData = reactive({
    tableMaxHeight: 500,
    page: 1,
    pageSize: 15,
    pageDisabled: false,
    queryDisabled: false,

    count: 0,
    list: []
})

const query = () => {
    tableData.page = 1
    refresh()
}

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

const changeQueryDisabled = disabled => {
    tableData.pageDisabled = disabled
    tableData.queryDisabled = disabled
}

const sizeChange = pageSize => {
    tableData.page = 1
    tableData.pageSize = pageSize
    refresh()
}

const currentChange = page => {
    tableData.page = page
    refresh()
}

const prevClick = page => {
    tableData.page--
    refresh()
}

const nextClick = page => {
    console.log(page)
    tableData.page = page + 1
    refresh()
}

onMounted(() => {
    const main = document.getElementById(mainId)
    const queryPart = document.getElementById(queryPartId)
    const paginationPart = document.getElementById(paginationPartId)
    tableData.tableMaxHeight = window.innerHeight - main.offsetTop - queryPart.offsetHeight - paginationPart.offsetHeight - 10
    refresh()
})
</script>
<style scoped>
.el-row {
    width: 100%;
}
</style>