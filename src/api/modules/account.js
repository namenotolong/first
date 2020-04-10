import service from '@/utils/service';



// 登录
export const login = (data) => service.post('/user/login', data);

// 退出登录
export const logout = (data) => service.post('/user/logout', data);

// 获取用户信息
export const getUserInfo = (data) => service.get('/user/getUser');

// 注册
export const register = (data) => service.post('/user/register', data);

// 获取验证码
export const getCaptcha = (data) => service.get('/user/send', data);

//  修改密码
export const modifyPassword = (data) => service.post('/user/reset', data);



