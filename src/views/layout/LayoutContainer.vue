<script setup>
// 退出，清除token
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
const onCommand = () => {
  userStore.removeToken()
  router.push('/login')
}
</script>
<template>
  <div><h1>主页</h1></div>
  <el-button @click="onCommand">退出</el-button>
</template>
<style scoped lang="scss"></style>
