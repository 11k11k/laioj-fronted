<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig?.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig?.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig?.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论" disabled>
            评论区</a-tab-pane
          >
          <a-tab-pane key="answer" title="答案">
            <CodeEditor
              :value="questionAnswer?.answer as string"
              :language="form.language"
              ref="codeEditor"
            />
            <a-button type="primary" @click="showAnswer"
              >显示答案</a-button
            >
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px"
          >
            <a-select
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="选择编程语言"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
              <a-option>html</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="form.code as string"
          :language="form.language"
          :handle-change="changeCode"
        />

        <a-divider size="0" />
        <a-button
          type="primary"
          style="min-width: 200px"
          @click="doSubmit"
        >
          提交代码
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  watchEffect,
  withDefaults,
  defineProps
} from 'vue'
import { useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import CodeEditor from '@/components/CodeEditor.vue'
import MdViewer from '@/components/MdViewer.vue'
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  Question,
  QuestionVO
} from '../../../generated'

interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  id: () => ''
})

const question = ref<QuestionVO>()
const questionAnswer = ref<Question>()
const loadData = async () => {
  const res =
    await QuestionControllerService.getQuestionVoByIdUsingGet(
      props.id as any
    )
  if (res.code === 0) {
    question.value = res.data
  } else {
    Message.error('加载失败，' + res.message)
  }
  const res2 =
    await QuestionControllerService.getQuestionByIdUsingGet(
      props.id as any
    )
  if (res.code === 0) {
    questionAnswer.value = res2.data
  } else {
    Message.error('加载失败' + res2.message)
  }
}
const form = ref<QuestionSubmitAddRequest>({
  language: 'java',
  code: ''
})

/**
 * 提交代码
 */
const router = useRouter()
const doSubmit = async () => {
  if (!question.value?.id) {
    return
  }

  const res =
    await QuestionControllerService.doQuestionSubmitUsingPost({
      ...form.value,
      questionId: question.value.id
    })
  if (res.code === 0) {
    Message.success('提交成功')
    router.push('/question_submit')
  } else {
    Message.error('提交失败,' + res.message)
  }
}

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  // test()
  loadData()

  //在创建组件的时候调用子组件的方法
  // console.log('这是组件dom调用参数', codeEditor.value?.testValue)
})

const changeCode = (value: string) => {
  form.value.code = value
}
//定义一个显示答案的方法
//触发子组件的赋值方法
const codeEditor = ref(null)
const showAnswer = () => {
  codeEditor.value?.fillValueAn()
}
</script>

<style>
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
