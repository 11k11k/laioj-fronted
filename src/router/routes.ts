import { RouteRecordRaw } from 'vue-router'
import noPowerView from '@/views/noPower.vue'
import LayoutView from '@/layouts/UserLayout.vue'
import UserLoginView from '@/views/user/UserLoginView.vue'
import UserRegisterView from '@/views/user/UserRegisterView.vue'
import AddQuestionView from '@/views/question/AddQuestionView.vue'
import manageQuestionView from '@/views/question/ManageQuestionView.vue'
import questionsView from '@/views/question/QuestionsView.vue'
import ViewQuestionView from '@/views/question/ViewQuestionView.vue'
import QuestionSubmitView from '@/views/question/QuestionSubmitView.vue'
import ACCESS_ENUM from '@/access/accessEnum'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/user',
    name: '用户界面',
    component: LayoutView,
    meta: {
      hideInMenu: 'hide'
    },
    children: [
      {
        path: '/user/login',
        component: UserLoginView,
        name: '登录界面'
      },
      {
        path: '/user/register',
        name: '注册界面',
        component: UserRegisterView
      }
    ]
  },
  {
    path: '/questions',
    name: '浏览题目',
    component: questionsView
  },
  {
    path: '/question_submit',
    name: '浏览题目提交',
    component: QuestionSubmitView
  },
  {
    path: '/add/question',
    name: '创建题目',
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN
    }
  },
  {
    path: '/update/question',
    name: '更新题目',
    component: AddQuestionView,
    meta: {
      hideInMenu: 'hide',
      access: ACCESS_ENUM.ADMIN
    }
  },
  {
    path: '/view/question/:id',
    name: '在线做题',
    component: ViewQuestionView,
    props: true,
    meta: {
      hideInMenu: 'hide',
      access: ACCESS_ENUM.USER
    }
  },

  {
    path: '/manage/question',
    name: '管理题目',
    component: manageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN
    }
  },
  { path: '/', name: '主页', component: questionsView },
  // { path: '/about', name: '关于我的', component: AboutView },
  {
    path: '/noAuth',
    name: '没有权限',
    component: noPowerView,
    meta: {
      hideInMenu: 'hide'
    }
  }
  // {
  //   path: '/admin',
  //   name: '管理员可见',
  //   component: AdminView,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN
  //   }
  // }
  // {
  //   path: '/hide',
  //   name: '隐藏页面',
  //   component: HideView,
  //   meta: {
  //     hideInMenu: 'hide'
  //   }
  // }
]
