<template>
  <div id="addQuestionAdd">
    <h2>创建题目</h2>

    <a-form :model="form">
      <a-form-item field="title" label="标题"
        ><a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-item>

      <a-form-item field="tags" label="标签">
        <a-input-tag
          v-model="form.tags"
          :style="{ width: '320px' }"
          placeholder="输入标签"
          allow-clear
      /></a-form-item>
      <a-form-item field="answer" label="答案">
        <MdEditor
          :value="form.answer"
          :handle-change="onAnswerChange"
        ></MdEditor>
      </a-form-item>
      <a-form-item field="content" label="题目内容">
        <MdEditor
          :value="form.content"
          :handle-change="onContentChange"
        ></MdEditor>
      </a-form-item>

      <a-form-item
        label="判题配置"
        :content-flex="false"
        :merge-props="false"
      >
        <a-space direction="vertical" style="min-width=480px">
          <a-form-item
            field="form.judgeConfig.timeLimit"
            label="时间限制"
          >
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              placeholder="请输入时间限制"
              mode="button"
              min="0"
              size="large"
            />
          </a-form-item>

          <a-form-item
            field="form.judgeConfig.memoryLimit"
            label="栈限制"
          >
            <a-input-number
              v-model="form.judgeConfig.stackLimit"
              placeholder="请输入堆栈限制"
              mode="button"
              min="0"
              size="large"
            />
          </a-form-item>

          <a-form-item
            field="form.judgeConfig.memoryLimit"
            label="内存限制"
          >
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              placeholder="请输入内存限制"
              mode="button"
              min="0"
              size="large"
            />
          </a-form-item>
        </a-space>
      </a-form-item>

      <a-form-item
        label="测试判题用例配置"
        :content-flex="false"
        :merge-props="false"
      >
        <a-form :model="form" :style="{ width: '600px' }">
          <a-form-item
            v-for="(judgeCaseItem, index) of form.judgeCase"
            :label="`测试用例 ${index + 1}`"
            :key="index"  
            no-style
          >
            <a-space direction="vertical" style="min-width=480px">
              <a-form-item
                :field="`form.judgeCase[${index}].input`"
                :label="`输入用例-${index}`"
                :key="index"
                ><a-input
                  v-model="judgeCaseItem.input"
                  placeholder="请输入测试输入用例"
                />
              </a-form-item>
              <a-form-item
                :field="`form.judgeCase[${index}].output`"
                :label="`输出用例-${index}`"
                :key="index"
                ><a-input
                  v-model="judgeCaseItem.output"
                  placeholder="请输入测试输出用例"
                />
              </a-form-item>
              <a-button
                @click="handleDelete(index)"
                :style="{ marginBottom: '20px' }"
                status="danger"
                >删除</a-button
              >
            </a-space>
          </a-form-item>
        </a-form>
        <div>
          <a-button @click="handleAdd" type="outline" status="success"
            >新增测试用例</a-button
          >
        </div>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" @click="onSubmit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import MdEditor from '@/components/MdEditor.vue'
import { reactive, onMounted, getCurrentInstance, ref } from 'vue'
import {
  QuestionAddRequest,
  QuestionControllerService
} from '../../../generated'
import { Message } from '@arco-design/web-vue'
import { useRoute } from 'vue-router'

let form = ref({
  title: '',
  tags: [],
  answer: '',
  content: '',
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000
  },
  judgeCase: [
    {
      input: '',
      output: ''
    }
  ]
})

const route = useRoute()
const loadData = async () => {
  const id = route.query.id
  if (!id) {
    return
  }
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  )
  if (res.code === 0) {
    form.value = res.data as any
    if (!form.value.judgeCase) {
      form.value.judgeCase = [
        {
          input: '',
          output: ''
        }
      ]
    } else {
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any)
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = {
        memoryLimit: 1000,
        stackLimit: 1000,
        timeLimit: 1000
      }
    } else {
      form.value.judgeConfig = JSON.parse(
        form.value.judgeConfig as any
      )
    }
    if (!form.value.tags) {
      form.value.tags = []
    } else {
      form.value.tags = JSON.parse(form.value.tags as any)
    }
  } else {
    Message.error('加载失败，' + res.message)
  }
}

const proxy = ref()
onMounted(() => {
  proxy.value = getCurrentInstance()?.proxy
  loadData()
})
// 如果页面地址包含 update，视为更新页面
const updatePage = route.path.includes('update')

const onSubmit = async () => {
  console.log('这是表单内容' + form.value)
  if (updatePage) {
    const res =
      await QuestionControllerService.updateQuestionUsingPost(
        form.value
      )
    if (res.code === 0) {
      Message.success('修改成功')
    } else {
      Message.error('修改失败，' + res.message)
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    )
    if (res.code === 0) {
      Message.success('创建成功')
    } else {
      Message.error('创建失败，' + res.message)
    }
  }
}
const onAnswerChange = (value: string) => {
  form.value.answer = value
}
const onContentChange = (value: string) => {
  form.value.content = value
}
const handleAdd = () => {
  if (form.value.judgeCase) {
    form.value.judgeCase.push({
      input: '',
      output: ''
    })
  }
}
//删除判题用例
const handleDelete = (index: number) => {
  // form.value.judgeCase.splice(index, 1)
  form.value.judgeCase.splice(index, 1)
}
</script>

<style scoped>
#addQuestionAdd {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
