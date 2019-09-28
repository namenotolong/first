import service from '@/utils/service.js';

// 登录
export function login(data) {
  return service({
    url: '/account/login',
    method: 'post',
    data
  })
}
// 退出登录
export function logout(data) {
  return service({
    url: '/account/logout',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getUserInfo(data) {
  return service({
    url: '/account/userInfo',
    method: 'post',
    data
  })
}

// 注册
export function register(data) {
  return service({
    url: '/account/register',
    method: 'post',
    data
  })
}

// 获取验证码
export function getCaptcha(data) {
  return service({
    url: '/account/captcha',
    method: 'post',
    data
  })
}

//  修改密码
export function modifyPassword(data) {
  return service({
    url: '/account/modifyPassword',
    method: 'post',
    data
  })
}


