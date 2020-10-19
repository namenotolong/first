// 性别
const gender = [{
  id: '0',
  name: '男'
}, {
  id: '1',
  name: '女'
}]
// 已读、未读
const status = [{
  id: '0',
  name: '未读'
}, {
  id: '1',
  name: '已读'
}]
// 消息类型
const message = [{
  id: '0',
  name: '评论'
}, {
  id: '1',
  name: '私信'
},{
  id : '2',
  name : '关注'
},{
  id : '3',
  name : '赞'
}, {
  id : '4',
  name : '系统消息'
}]
const online = [{
  id: '0',
  name: '在线'
}, {
  id: '1',
  name: '离线'
}]
// 角色
const role = [{
  id: '3',
  name: '管理员',
}, {
  id: '0',
  name: '用户',
}, {
  id: '2',
  name: '编辑',
},{
  id: '1',
  name: '游客',
}]

// 地区
const region = [{
  id: '1',
  name: '华南',
}, {
  id: '2',
  name: '华北',
}, {
  id: '3',
  name: '华东',
}, {
  id: '4',
  name: '西南',
}, {
  id: '5',
  name: '东北',
}, {
  id: '6',
  name: '西北',
}]


// 文章类型
const article = [{
  id: '1',
  name: '新闻'
}, {
  id: '2',
  name: '财经'
}, {
  id: '3',
  name: '体育'
}, {
  id: '4',
  name: '娱乐'
}, {
  id: '5',
  name: '游戏'
}]
/* 基础数据表管理 */

// 表名。方便使用的时候查看
const TABLE_NAME_MAP = {
  gender: 'gender',
  role: 'role',
  region: 'region',
  article: 'article',
  message: 'message'
}

class TableMng {

  baseTable = {}

  constructor(data) {
    this.baseTable = data;
    this.tableNameMap = TABLE_NAME_MAP;
  }

  // 初始化数据表
  initTable() {
    let data =  { gender, role, article, region, online, message, status };
    const baseTable = {
      ...this.baseTable,
      ...data
    };
    this.baseTable = baseTable;
    sessionStorage.setItem('baseTable', window.JSON.stringify(baseTable));
  }


  /**
   * 获取某个表
   * @param {String} tableName 表名
  */
  getTable(tableName) {
    const table = this.baseTable[tableName];
    if (table) {
      return table;
    } else {
      throw new Error(`表“${tableName}”不存在`)
    }
  }

  /**
   * 获取某个表的所有项的id
   * @param {String} tableName 表名
  */
  getIds(tableName) {
    const table = this.getTable(tableName);
    return table.map(item => item.id);
  }

  /**
 * 获取某个表的所有项的name
 * @param {String} tableName 表名
*/
  getNames(tableName) {
    const table = this.getTable(tableName);
    return table.map(item => item.name);
  }

  /**
   * 获取某个表中某一项的名称
   * @param {String} tableName 表名
   * @param {String} id  ID
   *
  */
  getNameById(tableName, id) {
    const table = this.getTable(tableName);
    const result = table.find(item => item.id == id);
    return result ? result.name : '';
  }

  getIdByName(tableName, name) {
    const table = this.getTable(tableName);
    const result = table.find(item => item.name == name);
    return result ? result.id : 0;
  }

  // 格式化为前端需要的数据结构
  formatTable(tableName, idFiled, nameFiled) {
    const table = this.getTable(tableName);
    return table.map(item => ({
      [idFiled]: item.id,
      [nameFiled]: item.name
    }))
  }
}

//如果后端未提供，前端也可以自行定义
const fixTable = {};

// 为什么需要存一份到本地？
// 用户在使用的时候可能会刷新页面，这个时候会去重新请求baseTable的数据，而数据有可能会在页面渲染完成之后才返回，这个时候页面中使用到了baseTable，就会出现表不存在的情况。
const storageTable = JSON.parse(sessionStorage.getItem('baseTable') || window.JSON.stringify({})) ;

const tableMng = new TableMng({ ...fixTable, ...storageTable });

export default tableMng;
