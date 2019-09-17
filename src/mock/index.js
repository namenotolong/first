import Mock from 'mockjs';

import accountRes from './modules/account';
import dashboardRes from './modules/dashboard';
import articleRes from './modules/article';
import userRes from './modules/user';
import tabRes from './modules/tab';

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function () {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}


Mock.mock(/\/account\/login/, 'post', accountRes.login);
Mock.mock(/\/account\/logout/, 'post', accountRes.logout);
Mock.mock(/\/account\/userInfo/, 'get', accountRes.getUserInfo);

Mock.mock(/\/dashboard\/grid/, 'get', dashboardRes.getGridData);
Mock.mock(/\/dashboard\/lineChart/, 'get', dashboardRes.getLineChartData);
Mock.mock(/\/dashboard\/todoList/, 'get', dashboardRes.getTodoListData);

Mock.mock(/\/article\/authorList/, 'get', articleRes.getAuthorList);
Mock.mock(/\/article\/articleList/, 'post', articleRes.getArticleList);
Mock.mock(/\/article\/articleDetail/, 'get', articleRes.getArticleDetail);


Mock.mock(/\/user\/userList/, 'post', userRes.getUserList);
Mock.mock(/\/user\/userDetail/, 'get', userRes.getUserDetail);


Mock.mock(/\/tab\/tabList/, 'get', tabRes.getTabData);





export default Mock;
