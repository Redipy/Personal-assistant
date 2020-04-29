import axios from 'axios'
import qs from 'qs'

let service = axios.create({
  timeout: 20000, // 请求超时时间
  crossDomain: true, // 设置cross跨域
  withCredentials: false // 设置cross跨域 并设置访问权限 不允许跨域携带cookie信息
})

// 添加请求拦截器
service.interceptors.request.use(
  (res) => {
    // 判断请求方式是否为POST，进行转换格式
    res.method === 'post' ?
      res.data = qs.stringify({
        ...res.data
      }) :
      res.params = {
        ...res.params
      }
    // 请求发送前进行处理
    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (res) => {
    // console.log(res)
    let {
      data
    } = res
    return data
  },
  (err) => {
    if (!err.response) {
      console.log(err)
    } else {
      console.log(err)
    }
  }
)

export default service
