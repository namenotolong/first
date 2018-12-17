import axios from "axios";
import {
    Message
} from "element-ui";

const DEV_URL = "https://www.easy-mock.com/mock/5c1615095cc05a711845cf5d/admin";
const PROD_URL = "";

const service = axios.create({
    baseURL: DEV_URL,
    timeout: 8000,

})

// 请求拦截器
service.interceptors.request.use(config => {

    return config;
}, (error) => {
    console.log(error)
    return Promise.reject(error);
})

// 响应拦截器
service.interceptors.response.use(res => {
    if (res.data.code == 200) {
        return res.data;
    } else {
        Message({
            type: "error",
            message: res.data.message,
            showClose: true,
        })
        return Promise.reject(res);
    }
}, error => {
    Message({
        type: "error",
        message: "网络异常",
        showClose: true,
    })
    return Promise.reject(error);
});

export default service;