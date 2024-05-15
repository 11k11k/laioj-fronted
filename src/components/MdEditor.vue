<template>
  <div>
    <Editor
      :value="value"
      :mode="mode"
      :plugins="plugins"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue'
import gfm from '@bytemd/plugin-gfm'
import hightLight from '@bytemd/plugin-highlight'
import { Editor } from '@bytemd/vue-next'

/**  
 * 定义组件属性类型
 */
interface Props {
  value: string
  mode?: string
  handleChange: (v: string) => void
}

const plugins = [
  gfm(),

  hightLight()
  // Add more plugins here
]

const props = withDefaults(defineProps<Props>(), {
  value: () => '',
  mode: () => 'split',
  handleChange: (v: string) => {
    console.log(v)
  }
})
</script>

<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
