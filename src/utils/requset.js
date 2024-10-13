import axios from 'axios'
import { userStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'
const baseURL = 'http://big-event-vue-api-t.itheima.net'
// 1.创建axios对象
const instance = axios.create({
  baseURL,
  timeout: 5000
})

// 2.设置请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 发送请求前验证一下token
    const user = userStore()
    if (user.token) {
      config.headers.Authorization = user.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 3.设置响应拦截器
instance.interceptors.response.use(
  (res) => {
    // console.log(res, '这是响应拦截器器的结果')
    if (res.data.code === 0) {
      return res
    }
    ElMessage({ message: res.data.message || '服务异常', type: 'error' })
    return res.data
  },
  (err) => {
    // console.log(err, '这是响应拦截器报错返回的结果')
    ElMessage({
      message: err.response.data.message || '服务异常',
      type: 'error'
    })
    if (err.response?.status === 401) {
      router.push('/login')
    }
    return Promise.reject(err)
  }
)
// 4.导出配置好的axios对象
export default instance
export { baseURL }
