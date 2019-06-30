import Mock from 'mockjs';
import accountData from "./account.js";
import dashboardData from "./dashboard.js";
import articleData from "./article.js";
import userData from "./user.js";
import tabData from "./tab.js";

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function () {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}


Mock.mock(/\/account\/login/, "post", accountData.login);
Mock.mock(/\/account\/logout/, "post", accountData.logout);
Mock.mock(/\/account\/userInfo/, "get", accountData.getUserInfo);

Mock.mock(/\/dashboard\/grid/, "get", dashboardData.getGridData);
Mock.mock(/\/dashboard\/lineChart/, "get", dashboardData.getLineChartData);
Mock.mock(/\/dashboard\/todoList/, "get", dashboardData.getTodoListData);

Mock.mock(/\/article\/authorList/, "get", articleData.getAuthorList);
Mock.mock(/\/article\/articleList/, "post", articleData.getArticleList);
Mock.mock(/\/article\/articleDetail/, "get", articleData.getArticleDetail);


Mock.mock(/\/user\/userList/, "post", userData.getUserList);
Mock.mock(/\/user\/userDetail/, "get", userData.getUserDetail);


Mock.mock(/\/tab\/tabList/, "get", tabData.getTabData);





export default Mock;
