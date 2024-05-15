<template>
  <div id="manageQuestionView">
    <h2>题目管理</h2>
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
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">
            修改</a-button
          >
          <a-button status="danger" @click="doDelete(record)"
            >删除</a-button
          >
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import {
  Question,
  QuestionControllerService
} from '../../../generated'
import { Message } from '@arco-design/web-vue/'
const show = ref(true)
const dataList = ref([])
const total = ref(0)
const searchParams = ref({
  pageSize: 5,
  current: 1
})
const loadData = async () => {
  const res =
    await QuestionControllerService.listQuestionByPageUsingPost(
      searchParams.value
    )
  console.log('这是list' + res)
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
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '内容',
    dataIndex: 'content'
  },
  {
    title: '标签',
    dataIndex: 'tags'
  },
  {
    title: '答案',
    dataIndex: 'answer'
  },
  {
    title: '提交数',
    dataIndex: 'submitNum'
  },
  {
    title: '通过数',
    dataIndex: 'acceptedNum'
  },
  {
    title: '用户id',
    dataIndex: 'userId'
  },
  {
    title: '判题用例',
    dataIndex: 'judgeCase'
  },
  {
    title: '判题配置',
    dataIndex: 'judgeConfig'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: 'Optional',
    slotName: 'optional'
  }
]
const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost(
    {
      id: question.id
    }
  )
  if (res.code === 0) {
    Message.success('删除成功')
    loadData()
  } else {
    Message.error('删除失败')
  }
}
const router = useRouter()
//修改操作应该在另外一个页面
//
const doUpdate = async (question: Question) => {
  console.log(question)
  router.push({
    path: '/update/question',
    query: {
      id: question.id
    }
  })
}
//分页按钮
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page
  }
}
</script>

<style scoped>
#manageQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
