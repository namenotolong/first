/* 基础数据表管理 */

class TableMng {
  constructor(data) {
    this.baseTbale = data;
  }

  // 初始化数据表
  initTable(data) {
    this.baseTbale = {
      ...this.baseTbale,
      ...data
    };
  }


  /**
   * 获取某个表
   * @param {String} tableName 表名
  */
  getTable(tableName) {
    const table = this.baseTbale[tableName];
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
    const result = table.find(item => item.id === id);
    if (result) {
      return result.name
    } else {
      throw new Error(`表“${tableName}”中，不存在id为“${id}”的项`)
    }
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

//后端未提供，前端定义的表数据
const fixTable = {};

const tableMng = new TableMng(fixTable);

export default tableMng;
