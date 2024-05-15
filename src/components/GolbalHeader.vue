<template>
  <div>
    <a-row
      id="menu-demo"
      class="grid-demo"
      align="center"
      :wrap="false"
    >
      <a-col flex="auto">
        <a-menu
          mode="horizontal"
          :default-selected-keys="['1']"
          :selected-keys="selectedKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img src="../assets/123.png" alt="" class="logo" />
              <div class="title">lYJOJ</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in visibleRouter" :key="item.path">
            <div v-if="item.path" :key="item.path">
              {{ item.name }}
            </div>
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="100px">
        <div>
          {{ store.state.user.loginUser?.userAccount ?? '未登录' }}
        </div>
      </a-col>
      <a-col flex="100px"
        ><a-button
          v-if="store.state.user.loginUser.userAccount == '未登录'"
          type="primary"
          shape="round"
          size="mini"
          @click="router.push('/user/login')"
          class="logbutton"
          >登录</a-button
        ><a-button
          v-else
          type="primary"
          shape="round"
          size="mini"
          @click="logout"
          class="logbutton"
          >退出登录</a-button
        ></a-col
      >
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { routes } from '../router/routes'
import { useRouter } from 'vue-router'

import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import checkAccess from '@/access/checkAccess'
const store = useStore()
const router = useRouter()

//展示在菜单页面的路由
const visibleRouter = computed(() => {
  return routes.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false
    }
    //TODO:根据权限过滤
    if (
      !checkAccess(
        store.state.user.loginUser,
        item?.meta?.access as string
      )
    ) {
      return false
    }
    return true
  })
})
//

const doMenuClick = (key: string) => {
  router.push({ path: key })
}
const selectedKeys = ref(['/'])
//理由跳转时，更新选中的菜单
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path]
})
//获取用户名

// 使用 ref 函数创建响应式引用
const userName = ref<string>(store.state.user.loginUser.username)

// setTimeout(() => {
//   store.dispatch('user/getLoginUser', {
//     userName: 'laioj',
//     userRole: ACCESS_ENUM.ADMIN
//   })
// }, 3000)

const logout = () => {
  store.dispatch('user/getLogOut')
}
</script>
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}
.title {
  color: #444;
  margin-left: 16px;
}
.logo {
  height: 48px;
}
.logbutton {
  margin-right: 100px !important;
}
</style>
