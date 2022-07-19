import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { HOST } from '@/config'
import { Toast } from 'mind-ui-vue'

// axios 配置
axios.defaults.timeout = 20000
axios.defaults.baseURL = HOST
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'


// 请求时的拦截
axios.interceptors.request.use(config => {
  if (store.state.user.token) {
    config.headers['Authorization'] = 'Bearer ' + store.state.user.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 返回值
axios.interceptors.response.use(res => {
  if (res.status === 200) {

    if (res.data.code >= 400) {
      Toast({
        position: 'top',
        message: res.data.message
      })
    }

    return res.data
  }

  return {
    code: res.status_code,
    message: res.message,
    data: {}
  }

}, error => {

  if (String(error).includes('timeout')) {
    Toast('网络请求超时')
  } else if (String(error).includes('Network Error')) {
    // Toast('网络异常')

    router.push({
      path: '/offline'
    })

  } else if (error.response) {
    const { status, statusText } = error.response

    // 未登录
    if (status === 401) {

      // 清空
      store.commit("user/SET_USER", null);
      store.commit("user/SET_TOKEN", "");
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      if (!['Login', 'Profile', 'Register', 'NotFound', 'Forget'].includes(router.currentRoute.name)) {
        router.push({
          path: '/login',
          query: { redirect: router.currentRoute.fullPath }
        })
      }

      return error.response.data
    }

    Toast(status + '' + statusText)
  }

  return {
    'code': 400,
    'messsage': 'error'
  }
})


export default {
  get(url, params) {
    return axios({
      method: 'get',
      url,
      params
    })
  },

  post(url, data) {
    return axios({
      method: 'post',
      url,
      data
    })
  },

  patch(url, data) {
    return axios({
      method: 'patch',
      url,
      data
    })
  },

  put(url, data) {
    return axios({
      method: 'put',
      url,
      data
    })
  },

  delete(url, data) {
    return axios({
      method: 'delete',
      url,
      data
    })
  }
}