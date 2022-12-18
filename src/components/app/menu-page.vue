<template>
    <el-container class="container">
        <left-menu/>
        <el-container class="content">
            <Header/>
            <div class="main">
                <router-view/>
            </div>
        </el-container>
    </el-container>

</template>

<script setup>
import LeftMenu from '@/components/app/left-menu.vue'
import Header from '@/components/Header.vue'
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
    height: calc(100vh - 100px);
    overflow: auto;
    padding: 10px;
}
</style>