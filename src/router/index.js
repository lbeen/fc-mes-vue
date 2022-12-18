import {createRouter, createWebHistory} from 'vue-router'

import SystemRouter from '@/router/system/system'

const routers = [
    ...SystemRouter
]

const router = createRouter({
    history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
    routes: routers
})

export default router