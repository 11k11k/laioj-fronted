<template>
  <div id="loginView">
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input
          v-model="form.userAccount"
          placeholder="请输入账号"
        />
      </a-form-item>
      <a-form-item
        field="userPassword"
        label="密码"
        tooltip="密码不少于8位"
      >
        <a-input
          v-model="form.userPassword"
          placeholder="请输入你的密码"
        />
      </a-form-item>
      <!-- <a-form-item field="isRead">
        <a-checkbox v-model="form.isRead">
          I have read the manual
        </a-checkbox>
      </a-form-item> -->
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          style="width: 120px"
        >
          登录
        </a-button>

        <a-button
          type="primary"
          style="width: 120px"
          @click="router.push('/user/register')"
        >
          注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import {
  UserControllerService,
  UserLoginRequest
} from '../../../generated'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const form = reactive({
  userAccount: '',
  userPassword: ''
  // isRead: false
  //通过强制绑定格式来作为基础的判断数据逻辑
} as UserLoginRequest)
const router = useRouter()
const store = useStore()
// 提交表单
const handleSubmit = async () => {
  //调用openApi根据后端文档生成的接口,使用文件名.方法来使用
  const res = await UserControllerService.userLoginUsingPost(form)
  console.log('这是resvuex' + res.code)
  //通过判断res.code来判断是否登录成功
  if (res.code === 0) {
    await store.dispatch('user/getLoginUser')
    router.push({
      path: '/',
      replace: true
    })
  } else {
    router.push({
      path: '/user/register'
    })
    Message.error('登录失败' + res.message)
  }
}
</script>
<style scoped>
.arco-btn-primary,
.arco-btn-primary[type='button'],
.arco-btn-primary[type='submit'] {
  color: #fff;
  background-color: rgb(var(--primary-6));
  border: 1px solid transparent;
  margin-left: 50px;
}
</style>
