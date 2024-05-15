<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="btn">按钮</button>
  </div>
</template>
<script setup lang="ts">
import ACCESS_ENUM from '@/access/accessEnum'
import { useStore } from 'vuex'
const store = useStore()
const btn = () => {
  store.dispatch('user/getLoginUser', {
    userName: 'laiyijun2',
    userRole: ACCESS_ENUM.ADMIN
  })
}
</script>
