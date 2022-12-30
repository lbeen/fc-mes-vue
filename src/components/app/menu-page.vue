<template>
    <el-container class="container">
        <left-menu v-show="menuVisible"/>
        <el-container class="content">
            <Header :change-menu-visible="changeMenuVisible"/>
            <div class="main">
                <router-view/>
            </div>
        </el-container>
    </el-container>

</template>

<script setup>
import LeftMenu from '@/components/app/left-menu.vue'
import Header from '@/components/Header.vue'
import {ref} from 'vue'


const menuVisible = ref(true)
const changeMenuVisible = () => {
    menuVisible.value = !menuVisible.value
    return menuVisible.value
}
</script>

<style scoped>
.container {
    height: 100vh;
}

.content {
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    overflow: hidden;
}

.main {
    height: calc(100vh - 50px);
    overflow: auto;
    padding: 10px;
}
</style>