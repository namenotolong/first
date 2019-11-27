


/**
 * 过滤对象的属性，list数据中有些字段前端不需要，可以使用此方法过滤掉
 * @param {Array} data    源数据
 * @param {String} fields 可变参数，需要的字段
 */
const filterField = (data, ...fields) => {
  return data.map(dataItem => {
    const keys = Object.keys(dataItem);
    const newDataItem = {};
    keys.forEach(key => {
      if (fields.includes(key)) {
        newDataItem[key] = dataItem[key]
      }
    })
    return newDataItem;
  })
}

/**
 * 根据id查找list中的某一项
 */
const findById = (data, id) => {
  return data.find(item => item.id === id);
}

export {
  filterField,
  findById
}
