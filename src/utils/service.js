import axios from 'axios';
import store from '@/store';
import { Message } from 'element-ui';
import config from '@/assets/config';

const service = axios.create({
  baseURL: config.apiUrl,
  timeout: 8000,
})

// 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // 让每个请求携带token,'X-Token'为自定义key
    config.headers['X-Token'] = sessionStorage.getItem('token');
  }
  return config;
}, error => {
  Message({
    type: 'error',
    message: '网络异常',
    showClose: true,
  })
  return Promise.reject(error);
})

// 响应拦截器
service.interceptors.response.use(res => {
  if (res.data.code === 200) {
    return res.data;
  } else {
    Message({
      type: 'error',
      message: res.data.message || '网络异常',
      showClose: true,
    })
    return Promise.reject(res);
  }
}, error => {
  Message({
    type: 'error',
    message: '网络异常',
    showClose: true,
  })
  return Promise.reject(error);
});

export default service;
