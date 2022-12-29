<template>
    <page-table :data-fun="dataFun" :param-fun="paramFun" query-on-load>
        <template #query="scope">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="时间">
                    <el-date-picker v-model="param.time" type="datetimerange" unlink-panels
                                    value-format="YYYY-MM-DD HH:mm:ss" range-separator="至"
                                    start-placeholder="开始时间" end-placeholder="结束时间">
                    </el-date-picker>
                </el-form-item>
                <!--                <el-form-item label="车间">-->
                <!--                    <el-select v-model="param.workshop" placeholder="请选择车间">-->
                <!--                        <el-option v-for="item in workshops" :key="item" :label="item" :value="item"></el-option>-->
                <!--                    </el-select>-->
                <!--                </el-form-item>-->
                <!--                <el-form-item label="工单号">-->
                <!--                    <el-input v-model="param.orderNumber" placeholder="请输入工单号"></el-input>-->
                <!--                </el-form-item>-->
                <!--                <el-form-item label="晶编">-->
                <!--                    <el-input v-model="param.crystalNumber" placeholder="请输入晶编"></el-input>-->
                <!--                </el-form-item>-->
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

new Date().
const param = reactive({
    startTime: '2022-12-28 00:00:00',
    endTime: '2022-12-30 00:00:00',
    level: '',
    user: '',
    content: '',
    time: ''
})

const dataFun = queryLogPage
const paramFun = () => {
    console.log(param.time)
    if (!param.startTime || !param.endTime) {
        Tips.error('开始结束时间不能为空')
        return
    }
    return param
}
</script>