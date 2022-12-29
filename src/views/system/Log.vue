<template>
    <page-table :data-fun="dataFun" :param-fun="paramFun" query-on-load>
        <template #query="scope">
            <el-form inline class="demo-form-inline">
                <el-form-item label="时间">
                    <el-date-picker v-model="param.time" type="datetimerange" unlink-panels
                                    value-format="YYYY-MM-DD HH:mm:ss" range-separator="至"
                                    start-placeholder="开始时间" end-placeholder="结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="级别">
                    <el-select v-model="param.level" placeholder="请选择级别" clearable>
                        <el-option v-for="item in levels" :key="item.value" :label="item.label"
                                   :value="item.value"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户">
                    <el-input v-model="param.user" placeholder="请输入用户" clearable/>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="param.content" placeholder="请输入内容" clearable/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="scope.query">查询</el-button>
                </el-form-item>
            </el-form>
        </template>
        <template #column>
            <el-table-column label="序号" prop="rn" align="center" width="60px"></el-table-column>
            <el-table-column label="时间" prop="create_time" align="center" width="165px"></el-table-column>
            <el-table-column label="服务" prop="server" align="center" width="75px"></el-table-column>
            <el-table-column label="用户" prop="operate_user" align="center" width="90px"></el-table-column>
            <el-table-column label="级别" prop="log_level" align="center" width="70px"></el-table-column>
            <el-table-column label="内容" prop="log_content" align="center"></el-table-column>
        </template>
    </page-table>
</template>

<script setup>
import PageTable from '@/components/app/page-table.vue'
import {queryLogPage} from '@/api/system/log'
import {reactive} from 'vue'
import Tips from '@/utils/Tips'
import {format0OClock, formatDateTime} from '@/utils/date'

const param = reactive({
    level: '',
    user: '',
    content: '',
    time: [format0OClock(new Date()), formatDateTime(new Date())]
})

const levels = [{
    value: 0,
    label: '信息',
}, {
    value: 1,
    label: '错误',
}]

const dataFun = queryLogPage
const paramFun = () => {
    if (!param.time[0] || !param.time[1]) {
        Tips.error('开始结束时间不能为空')
        return
    }
    return {
        startTime: param.time[0],
        endTime: param.time[1],
        level: param.level,
        user: param.user,
        content: param.content
    }
}
</script>