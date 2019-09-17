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
  roles: ['editor', 'guest']
})


export default {
  login() {
    return {
      code: 200,
      data: {
        loginInfo: loginInfo
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
