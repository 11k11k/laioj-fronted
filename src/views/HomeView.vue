<template>
  <div class="home">
    <MdEditor :value="mdValue" :handleChange="mdOnChange" />
    <!-- 使用父组件进行控制组件的参数，例如value跟方法handleChange
    然后进入到子组件中编辑
    -->
    <CodeEditor
      :value="codeValue"
      :handleChange="codeOnChange"
    ></CodeEditor>
  </div>
</template>
<script setup lang="ts">
import CodeEditor from '@/components/CodeEditor.vue'
import MdEditor from '@/components/MdEditor.vue'
import { ref } from 'vue'

const mdValue = ref('')
const codeValue = ref('')

const mdOnChange = (v: string) => {
  mdValue.value = v
  console.log(v)
}
const codeOnChange = (v: string) => {
  codeValue.value = v
  console.log(v)
}
</script>
