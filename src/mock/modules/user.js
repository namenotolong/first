import Mock from 'mockjs';
import { getURLParams, guid } from '@/utils/core';
import { filterField, findById } from '../util';

const userList = Mock.mock({
  'data|127': [{
    id: '@lower(@guid)',
    name: '@cname',
    mobilePhone: /^1[345789]\d{9}$/,
    gender: '@pick(["1", "2"])',
    age: '@natural(20,60)',
    roles: '@pick(["admin", "guest","editor"])'.split(),
    registerDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
    consume: '@natural(0,10000)',
    account: /^[a-zA-Z0-9_]{5,10}$/,
    avatar: 'https://source.unsplash.com/random/200x200',
    email: '@email'
  }]
})


export default {
  getList(config) {
    const { name, pageNumber, pageSize } = getURLParams(config.url);
    const result = userList.data.filter(item => {
      let validName = false;
      validName = item.name.includes(name);
      return validName;
    })
    const startIndex = (Number(pageNumber) - 1) * Number(pageSize);
    const endIndex = startIndex + Number(pageSize);
    return {
      code: 200,
      data: {
        list: filterField(result.slice(startIndex, endIndex), 'id', 'name', 'mobilePhone', 'gender', 'roles', 'registerDate', 'consume'),
        total: result.length
      }
    }
  },
  getDetail(config) {
    const { id } = getURLParams(config.url);
    return {
      code: 200,
      data: findById(userList.data, id)
    }
  },
  save(config) {
    const { detail } = window.JSON.parse(config.body);
    const userId = detail.id;
    if (userId) {
      const userIndex = userList.data.findIndex(item => item.id === userId);
      userList.data[userIndex] = detail;
    } else {
      userList.data.unshift({
        ...detail,
        ...{
          id: guid(),
          registerDate: Date.now(),
          consume: 0
        }
      })
    }
    return {
      code: 200,
      data: {}
    }
  },
  remove(config) {
    const { id } = window.JSON.parse(config.body);
    id.forEach(item => {
      const index = userList.data.findIndex(user => user.id === item);
      userList.data.splice(index, 1);
    })
    return {
      code: 200,
      data: {}
    }
  }
}

