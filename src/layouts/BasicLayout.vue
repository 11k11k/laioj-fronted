<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header"
        ><GolbalHeader></GolbalHeader
      ></a-layout-header>
      <a-layout-content class="content">
        <router-view
      /></a-layout-content>
      <a-layout-footer class="footer">
        <a href="http://baidu.com" target="_blank">by laiyijun</a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script>
import GolbalHeader from '@/components/GolbalHeader.vue'
export default {
  components: {
    GolbalHeader
  }
}
</script>
<style scoped>
#basicLayout {
}
#basicLayout .header {
  box-shadow: #eee 1px 1px 5px;
}
#basicLayout .content {
  background: linear-gradient(to right, #fefefefe, #fff);
  margin-bottom: 16px;
  padding: 20px;
}
#basicLayout .footer {
  background: #efefef;

  position: sticky;
  padding: 16px;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
