import { register, getUserToken, getUserInfo } from '@/api/user'

const state = {
  token: localStorage.getItem('token') || '',
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
}

const getters = {
  getUser: state => state.user,
  getToken: state => state.token
}

const mutations = {
  // 身份token
  SET_TOKEN: (state, token) => {
    state.token = token
    localStorage.setItem('token', token)
  },
  // 用户信息
  SET_USER: (state, user) => {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
  },
}

const actions = {
  // user register
  async register({ commit }, form) {
    const { account, password, code } = form

    let res = await register({ account, password, code })

    if (res.code === 200) {
      commit('SET_TOKEN', res.data.token)
    }
    return res
  },

  // user login
  async login({ commit }, form) {
    const { account, password } = form

    let res = await getUserToken({ account, password })

    if (res.code === 200) {
      commit('SET_TOKEN', res.data.token)
    }
    return res
  },

  // get user info
  async getInfo({ commit }) {

    const res = await getUserInfo();

    if (res.code === 200) {
      commit('SET_USER', res.data)
    }

    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
