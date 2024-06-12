import axios from 'axios'

/** 获取当前IP地址 */
import os from 'node:os'
const getNetworkIp = () => {
	let needHost = '' // 打开的host
	try {
		// 获得网络接口列表
		let network = os.networkInterfaces()
		for (let dev in network) {
			let iface = network[dev]
			for (let i = 0; i < iface!.length; i++) {
				let alias = iface![i]
				if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
					needHost = alias.address
				}
			}
		}
	} catch (e) {
		// needHost = '127.0.0.1'
		needHost = 'localhost'
	}
	return needHost
}

const request = axios.create({
  // baseURL: '',
  // baseURL: 'http://localhost:5173',
  baseURL: `http://${getNetworkIp()}:5173`,
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

