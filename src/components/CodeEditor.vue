<template>
  <!-- 使用ref绑定这个组件，目的是为了使用组件的value值 -->
  <div
    id="container"
    ref="editorRef"
    style="min-height: 400px; height: 60vh"
  ></div>
</template>

<script setup lang="ts">
// 导入对应的模块
import * as monaco from 'monaco-editor'
import {
  onMounted,
  ref,
  toRaw,
  watch,
  defineComponent,
  defineExpose,
  onUpdated
} from 'vue'
import { withDefaults, defineProps } from 'vue'
import gfm from '@bytemd/plugin-gfm'
import hightLight from '@bytemd/plugin-highlight'
import { Editor } from '@bytemd/vue-next'

/**
 * 定义组件属性类型接口
 * 是父组件需要控制的变量和方法
 */
interface Props {
  value: string
  language?: string
  handleChange: (v: string) => void
}
/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => '你有好好思考吗？',
  language: () => 'java',
  handleChange: (v: string) => {
    console.log(v)
  }
})

//插件
const plugins = [
  gfm(),
  hightLight()
  // Add more plugins here
]
// const answer = 'value'
// defineExpose({
//   answer
// })
//定义默认值
// const value = ref('hello word')
// //这是填充方法
// const fillValue = () => {
//   //判断是否有值
//   if (!editorValue.value) {
//     return
//   }
//   //使用toRaw方法，将值转为响应式,并存入新的值
//   toRaw(editorValue.value).setValue(value)
// }
const fillValueAn = () => {
  toRaw(editorValue.value).setValue(props.value)
}
// 将回答写入到编辑器中，父组件触发子组件的answerShow方法,
defineExpose({ fillValueAn })
//组件引用
const editorRef = ref()
//创建空编辑器实例

const editorValue = ref()
//监听语言的属性变化
watch(
  () => props.language,
  () => {
    //判断编辑器实例已经初始化了
    if (editorValue.value) {
      //设置编辑器语言
      monaco.editor.setModelLanguage(
        // 获取编辑器实例
        //因为editorValue.value是一个响应式对象，所以需要使用toRaw方法
        toRaw(editorValue.value).getModel(),
        // 获取props中的language属性
        props.language
      )
    }
  }
)

//监听组件加载完成
onMounted(() => {
  //判断组件是否加载完成
  if (!editorRef.value) {
    return
  }
  //创建编辑器实例
  editorValue.value = monaco.editor.create(editorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: false
    },
    readOnly: false,
    theme: 'vs-dark'
  })

  //编辑监听内容变化
  editorValue.value.onDidChangeModelContent(() => {
    //如果内容值发生变化，触发handleChange事件,将内容值传入
    //toRaw方法，将值转为响应式
    props.handleChange(toRaw(editorValue.value).getValue())
  })
})
</script>

<style lang="scss" scoped></style>
