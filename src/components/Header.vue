<template>
    <div class="header">
        <div class="left">
            <span style="font-size: 20px">测试</span>
        </div>
        <div class="right">
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ userInfo.username || '' }}
                  <el-icon class="el-icon--right">
                    <arrow-down/>
                  </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <el-button type="primary" @click="showChangePassword = true">修改密码</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <el-button type="danger" style="width: 100%" @click="logonOut">退出</el-button>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <el-dialog v-model="showChangePassword" title="修改密码" width="300px">
            <el-form :rules="formData.rules" :model="formData.data" ref="form">
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model="formData.data.username" size="large" readonly></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model.trim="formData.data.password" size="large"></el-input>
                </el-form-item>
                <el-form-item style="margin-top: 10px">
                    <el-button style="width: 100%" type="primary" @click="submit" size="large">立即登录</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup>
import {getUserInfo, removeToken} from '@/utils/auth'
import {reactive, ref} from 'vue'

const userInfo = getUserInfo() || {}

const logonOut = () => {
    removeToken()
    window.location.href = '/'
}

const showChangePassword = ref(false)
const formData = reactive({
    data: {
        username: userInfo.username,
        password: ''
    },
    rules: {
        username: [{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
        }],
        password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
        }]
    }
})

const form = ref(null)
const submit = () => {
    form.value.validate(valid => {
        if (valid) {
            console.log(formData.data)
        } else {
            return false
        }
    })
}
</script>

<style scoped>
.header {
    height: 50px;
    border-bottom: 1px solid #e9e9e9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}
</style>