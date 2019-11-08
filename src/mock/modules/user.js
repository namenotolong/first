import Mock from 'mockjs';


const userDetail = Mock.mock({
  account: /^[a-zA-Z0-9_]{4,9}$/,
  name: '@cname',
  gender: '@pick(["1", "2"])',
  avatar: "@image('100x100', '#02adea', 'avatar')",
  email: '@email',
  mobilePhone: /^1[345789]\d{9}$/,
  role: '@pick(["admin", "guest","editor"])'
})

const userList = Mock.mock({
  "list|127": [{
    id: '@lower(@guid)',
    name: '@cname',
    age: '@natural(20,60)',
    gender: '@pick(["1", "2"])',
    role: '@pick(["admin", "guest","editor"])',
    registerDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
    consume: '@natural(0,10000)',
  }]
})


export default {
  getList(config) {
    const { name, pageNumber, pageSize } = window.JSON.parse(config.body);
    const filterList = userList.list.filter(item => {
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
  getDetail() {
    return {
      code: 200,
      data: {
        userDetail
      }
    }
  }

}

