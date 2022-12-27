<template>
    <div class="layout">
        <menu-page v-if="state.showMenu"></menu-page>
        <el-container v-else class="container">
            <router-view/>
        </el-container>
    </div>
</template>

<script setup>
import {reactive} from 'vue'
import {useRouter} from 'vue-router'
import MenuPage from '@/components/app/menu-page.vue'
import {getToken} from '@/utils/auth'

const noMenu = ['/login']
const router = useRouter()
const state = reactive({
    showMenu: true,
    defaultOpen: ['1', '2', '3', '4'],
    currentPath: '/',
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        // 如果路径是 /login 则正常执行
        next()
    } else {
        // 如果不是 /login，判断是否有 token
        if (!getToken()) {
            // 如果没有，则跳至登录页面
            next({path: '/login'})
        } else {
            // 否则继续执行
            next()
        }
    }
    state.showMenu = !noMenu.includes(to.path)
    state.currentPath = to.path
    // document.title = pathMap[to.name]
})
</script>

<style scoped>
.layout {
    min-height: 100vh;
    background-color: #ffffff;
}

.container {
    height: 100vh;
}
</style>

<style>
body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
</style>