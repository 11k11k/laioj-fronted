// initial state
import { StoreOptions } from 'vuex'
import ACCESS_ENUM from '@/access/accessEnum'
import { UserControllerService } from '../../generated'

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userAccount: '未登录'
    }
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      // 从远程请求获取登录信息
      const res = await UserControllerService.getLoginUserUsingGet()
      console.log('这是获取登录用户信息' + res.data)
      if (res.code === 0) {
        commit('updateUser', res.data)
      } else {
        commit('updateUser', {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN
        })
      }
    },
    async getLogOut({ commit, state }, payload) {
      await UserControllerService.userLogoutUsingPost()

      commit('updateUser', {
        ...state.loginUser,
        userAccount: '未登录',
        userRole: ACCESS_ENUM.NOT_LOGIN,
        userName: ''
      })
    }
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload
    }
  }
} as StoreOptions<any>
