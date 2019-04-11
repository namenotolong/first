import Mock from 'mockjs';
import sysUserData from "./sysUser.js";
import dashboardData from "./dashboard.js";

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
        this.custom.xhr.withCredentials = this.withCredentials || false
    }
    this.proxy_send(...arguments)
}


Mock.mock(/\/sysUser\/login/, "post", sysUserData.login);
Mock.mock(/\/sysUser\/userInfo/, "get", sysUserData.getUserInfo);

Mock.mock(/\/dashboard\/grid/, "get", dashboardData.getGridData);
Mock.mock(/\/dashboard\/lineChart/, "get", dashboardData.getLineChartData);
// Mock.mock(/\/dashboard\/todoList/, "get", dashboardData.getTodoListData);



export default Mock;