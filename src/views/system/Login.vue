<template>
    <div class="login-body">
        <div class="login-container">
            <div class="head">
                <div class="name">
                    <div class="title">MES</div>
                </div>
            </div>
            <el-form label-position="top" :rules="formData.rules" :model="formData.data" ref="form"
                     class="login-form">
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model.trim="formData.data.username" size="large"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model.trim="formData.data.password" size="large"></el-input>
                </el-form-item>
                <el-form-item style="margin-top: 10px">
                    <el-button style="width: 100%" type="primary" @click="submit" size="large">立即登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import {doLogin} from '@/api/system/login'
import {setToken, setUserInfo} from '@/utils/auth'
import {reactive, ref} from 'vue'

const formData = reactive({
    data: {
        username: '',
        password: ''
    },
    rules: {
        username: [{
            required: true,
            message: '账户不能为空',
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
            doLogin(formData.data, data => {
                setToken(data.token)
                setUserInfo(data.user)
                window.location.href = '/'
            })
        }
    })
}
</script>

<style scoped>
.login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #fff;
}

.login-container {
    width: 420px;
    height: 500px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 21px 41px 0 rgba(0, 0, 0, 0.2);
}

.head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 20px 0;
}

.head img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
}

.head .title {
    font-size: 28px;
    color: #1BAEAE;
    font-weight: bold;
}

.login-form {
    width: 70%;
    margin: 0 auto;
}
</style>