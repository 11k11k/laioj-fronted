<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="@/assets/123.png" class="logo" />
          <div>laioj</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view
      /></a-layout-content>
      <a-layout-footer class="footer">
        <a href="http://baidu.com" target="_blank">by laiyijun</a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
#userLayout {
  text-align: center;
  background: url('https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png')
    0% 0% / 100% 100%;
}
#userLayout .logo {
  width: 64px;
  height: 64px;
}
#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}
#userLayout .header {
  margin-top: 16px;
}

#userLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
