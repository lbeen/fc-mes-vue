<template>
    <el-aside class="aside">
        <div class="head">
            <div>
                <span>MES</span>
            </div>
        </div>
        <div class="line"/>
        <el-menu background-color="#222832" text-color="#fff" router>
            <el-sub-menu v-for="(menu,index) in menus" :index="index.toString()">
                <template #title>
                    <span>{{ menu.title }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item v-for="child in menu.children" :index="child.path">
                        {{ child.title }}
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<script setup>
import {ref} from 'vue'
import SystemRouter from '@/router/system/system'

const menus = []
const addMenu = (title, routers) => {
    const children = []
    for (let item of routers) {
        if (item.path.startsWith('/menu/') && item.title) {
            children.push({
                title: item.title,
                path: item.path
            })
        }
    }
    menus.push({
        title,
        children
    })
}

addMenu('系统管理', SystemRouter)
</script>

<style scoped>
.aside {
    width: 200px !important;
    background-color: #222832;
}

.head {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
}

.head > div {
    display: flex;
    align-items: center;
}

.head img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
}

.head span {
    font-size: 20px;
    color: #ffffff;
}

.line {
    border-top: 1px solid hsla(0, 0%, 100%, .05);
    border-bottom: 1px solid rgba(0, 0, 0, .2);
}

.el-menu {
    border-right: none !important;
}
</style>