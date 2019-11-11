import Mock from 'mockjs';
import { getURLParams, guid } from '@/utils/core';


const userList = Mock.mock({
  'data|127': [{
    id: '@lower(@guid)',
    name: '@cname',
    mobilePhone: /^1[345789]\d{9}$/,
    gender: '@pick(["1", "2"])',
    role: '@pick(["admin", "guest","editor"])',
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
    const filterList = userList.data.filter(item => {
      let validName = false;
      validName = item.name.includes(name);
      return validName;
    })
    const startIndex = (Number(pageNumber) - 1) * Number(pageSize);
    const endIndex = startIndex + Number(pageSize);
    return {
      code: 200,
      data: {
        list: filterList.slice(startIndex, endIndex),
        total: filterList.length
      }
    }
  },
  getDetail(config) {
    const { id } = getURLParams(config.url);
    let detail = null;
    if (id) {
      detail = userList.data.find(item => item.id === id);
    }
    return {
      code: 200,
      data: {
        detail
      }
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
      data: {

      }
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
      data: {

      }
    }
  }
}

