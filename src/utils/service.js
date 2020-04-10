import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/store';

class Service {

  baseConfig = {
    baseURL: 'http://localhost:8081',
    headers: {},
    //timeout: 8000
  }

  // axios实例
  instance = null

  constructor() {
    this.initInstance();
  }

  initInstance() {
    this.instance = axios.create(this.baseConfig);
    this.setReqInterceptors();
    this.setResnterceptors();
  }

  // 设置请求头
  setHeader = (headers) => {
    this.baseConfig.headers = { ...this.baseConfig.headers, ...headers };
    this.initInstance();
  }

  // 请求拦截器
  setReqInterceptors = () => {
    this.instance.interceptors.request.use(
      config => {
        let authorization = store.getters.token;
        if(authorization) {
          config.headers.authorization = authorization
        }
        return config;
      },
      err => {
        Message({
          type: 'error',
          message: '请求失败',
          showClose: true,
        })
        return Promise.reject(err);
      })
  }

  // 响应拦截器
  setResnterceptors = () => {
    this.instance.interceptors.response.use(
      res => {
        const { code, data, message, success } = res.data;
        if (success) {
          return data;
        } else if (code == 333) {
          console.log(res)
          Message({
            type: 'error',
            message: message || '没有权限！',
            showClose: true,
          })
          sessionStorage.clear();
          return Promise.reject(res);
        } else {
          console.log(res)
          Message({
            type: 'error',
            message: message,
            showClose: true,
          })
          return Promise.reject(res);
        }
      },
      err => {
        Message({
          type: 'error',
          message: '服务器响应失败',
          showClose: true,
        })
        return Promise.reject(err);
      }
    );
  }

  // get请求
  get = (url, data = {}, config = {}) => this.instance({ ...{ url, method: 'get', params: data }, ...config })

  // post请求
  post = (url, data = {}, config = {}) => this.instance({ ...{ url, method: 'post', data }, ...config })


  // 不经过统一的axios实例的get请求
  postOnly = (url, data = {}, config = {}) => axios({
    ...this.baseConfig,
    ...{ url, method: 'post', data },
    ...config
  })

  // 不经过统一的axios实例的post请求
  getOnly = (url, data = {}, config = {}) => axios({
    ...this.baseConfig,
    ...{ url, method: 'get', params: data },
    ...config
  })


  // delete请求
  deleteBody = (url, data = {}, config = {}) => this.instance({ ...{ url, method: 'delete', data }, ...config })

  deleteParam = (url, data = {}, config = {}) => this.instance({ ...{ url, method: 'delete', params: data }, ...config })

}

export default new Service();
