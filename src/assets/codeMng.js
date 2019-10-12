// 码表



// 性别
const gender = [{
  id: '1',
  name: '男'
}, {
  id: '2',
  name: '女'
}]

// 角色
const role = [{
  id: 'admin',
  name: '管理员'
}, {
  id: 'guest',
  name: '游客'
}, {
  id: 'editor',
  name: '编辑'
}, {
  id: 'vip',
  name: '会员'
}]


// 文章类型
const articleType = [{
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


const codeTable = { gender, role, articleType };


/**
 * 获取某个代码表
 * @param {String} tableName 表名
*/
const getTable = (tableName) => codeTable[tableName];


/**
 * 获取某个代码表的所有id
 * @param {String} tableName 表名
*/
const getIds = (tableName) => codeTable[tableName].map(item => item.id);


/**
 * 获取某个代码表中某一项的名称
 * @param {String} tableName 表名
 * @param {String} id  ID
 *
*/
const getNameById = (tableName, id) => {
  const result = codeTable[tableName].find(item => item.id === id);
  let name = '';
  if (result) {
    name = result.name
  }
  return name;
}

const codeMng = {
  getTable,
  getIds,
  getNameById,
}


export default codeMng;

export const createOptions = (map) => {
  const options = [];
  for (const [key, value] of Object.entries(map)) {
    options.push({
      label: value,
      value: key
    })
  }
  return options;
}
