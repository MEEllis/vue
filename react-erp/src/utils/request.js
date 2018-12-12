import axios from 'axios'

import loading from '@/utils/loading'

import { message } from 'antd';

// create an axios instance
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : 'http://69.171.69.13:3001', // api的base_url
  timeout: 20000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  loading.show(config)
  return config
}, error => {
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    loading.hide(response.config)
    const res = response.data;
    if(res.code === '0000'){
      return response.data;
    }else{
      message.error(res.desc);
      return Promise.reject(res);
    }
  },
  error => {
    loading.hide(error.config)
    if (error.response && error.response.status === 401) {
      if (error.config.url.indexOf("logout") === -1) {
        message.error('登陆信息已过期,请重新登陆!');
      }
    } else if (error.response && error.response.status === 500) {
      message.error('系统错误!');
    } else if (error.message&&error.message.indexOf("timeout") > -1) {
      message.error('网络超时!');
    }
    else if (error === "403") {
      message.error('没有请求权限!');
    } else {
      message.error('网络错误!');
    }
    return Promise.reject(error)

  })

export default service



