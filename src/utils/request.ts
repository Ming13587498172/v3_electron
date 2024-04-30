import axios from 'axios'

const request = axios.create({
  baseURL: '',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求拦截器
request.interceptors.request.use(config => {
    config.headers = config.headers || {}
    if (localStorage.getItem('token')) {
      config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token') || ''
    }
    return config
  }, err => {
    return Promise.reject(err)
  }
)

// 响应拦截器
request.interceptors.response.use(res => {
    const code = res.status || 200
    if (code >= 200 && code < 300) {
      return res.data
    }
  }, err => {
    return Promise.reject(err)
  }
)

export default request

