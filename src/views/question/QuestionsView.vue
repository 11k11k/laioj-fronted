<template>
  <div id="QuestionsView">
    <h2>题目管理</h2>
    <a-form :model="searchParams" layout="inline">
      <a-form-item
        field="title"
        label="名称"
        style="min-width: 240px"
      >
        <a-input
          v-model="searchParams.title"
          placeholder="请输入名称"
        />
      </a-form-item>
      <a-form-item field="tag" label="标签" style="min-width: 240px">
        <a-input-tag
          v-model="searchParams.tags"
          placeholder="请输入标签"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" shape="round" @click="onSubmit"
          >提交</a-button
        >
      </a-form-item>
    </a-form>
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total
      }"
      @page-change="onPageChange"
    >
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(tag, index) of record.tags"
            :key="index"
            color="green"
            >{{ tag }} </a-tag
          >-
        </a-space>
      </template>
      <template #acceptedRate="{ record }">
        {{
          `${
            record.submitNum
              ? record.acceptedNum / record.submitNum
              : '0'
          }% (${record.acceptedNum}/${record.submitNum})`
        }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format('YYYY-MM-DD') }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toQuestionView(record)">
            去做题</a-button
          >
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { reactive, ref, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import {
  Question,
  QuestionControllerService,
  QuestionQueryRequest
} from '../../../generated'
import { Message } from '@arco-design/web-vue/'
const show = ref(true)
const dataList = ref([])
const total = ref(0)
const searchParams = ref<QuestionQueryRequest>({
  title: '',
  tags: [],
  pageSize: 7,
  current: 1
})
const loadData = async () => {
  const res =
    await QuestionControllerService.listQuestionVoByPageUsingPost(
      searchParams.value
    )
  console.log('这是页面数据' + JSON.stringify(res.data.records))
  if (res.code === 0) {
    dataList.value = res.data.records
    total.value = res.data.total
  } else {
    Message.error('加载失败' + res.message)
  }
}
/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData()
})
onMounted(() => {
  loadData()
})
const columns = [
  {
    title: '题号',
    dataIndex: 'id'
  },
  {
    title: '题目名称',
    dataIndex: 'title'
  },

  {
    title: '标签',
    slotName: 'tags'
  },

  {
    title: '通过率',
    slotName: 'acceptedRate'
  },
  {
    title: '创建时间',
    slotName: 'createTime'
  },
  {
    title: '',
    slotName: 'optional'
  }
]

const router = useRouter()
//修改操作应该在另外一个页面
//
const toQuestionView = async (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`
  })
}
//分页按钮
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page
  }
}
//搜索
const form = reactive({
  name: '',
  post: '',
  isRead: false
})
const onSubmit = () => {
  searchParams.value = {
    ...searchParams.value,
    current: 1
  }
  loadData()
}
</script>

<style scoped>
#QuestionsView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
