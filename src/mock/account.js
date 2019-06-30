import Mock from 'mockjs';

const loginInfo = Mock.mock({
  token: "@lower(@guid)",
})

const userInfo = Mock.mock({
  name: "@cname",
  gender: '@pick(["男", "女"])',
  avatar: "@image('100x100', '#aaa', 'avatar')",
  email: "@email",
  mobilePhone: /^1[345789]\d{9}$/,
  role: '@pick(["编辑","普通会员","高级会员","普通用户"])'
})


export default {
  login() {
    return {
      code: 200,
      data: {
        loginInfo: loginInfo.token
      }
    }
  },
  logout() {
    return {
      code: 200,
      data: {}
    }
  },
  getUserInfo() {
    return {
      code: 200,
      data: {
        userInfo
      }
    }
  }
}
