<template>
    <div class="header">
        <div>
            <el-icon class="menu-icon" @click="menuIconClick">
                <fold v-show="showFold"/>
                <expand v-show="!showFold"/>
            </el-icon>
            <span class="page-name-span">测试</span>
        </div>
        <div>
            <el-dropdown>
                <span>
                    {{ userInfo.username || '' }}
                  <el-icon>
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
                    <el-button style="width: 100%" type="primary" @click="submit" size="large">修改</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup>
import {getUserInfo, removeToken} from '@/utils/auth'
import {reactive, ref} from 'vue'
import {changePassword} from '@/api/system/user'

const props = defineProps({
    changeMenuVisible: Function
})

const showFold = ref(true)
const menuIconClick = () => {
    showFold.value = props.changeMenuVisible()
}

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
            changePassword(formData.data, () => showChangePassword.value = false)
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

.menu-icon {
    font-size: 35px;
    margin-left: -10px;
    cursor: pointer;
    vertical-align: middle;
}

.menu-icon:hover {
    color: #409eff;
}

.page-name-span {
    vertical-align: middle;
    margin-left: 10px;
    font-size: 20px;
}
</style>