import request from '@/utils/request'

/**
 * 注册接口
 */
export const userRegisterService = ({ username, password, repassword }) => {
  request.post('/api/reg', { username, password, repassword })
}

/**
 * 登录接口
 */
export const userLoginService = ({ username, password }) => {
  return request.post('/api/login', { username, password })
}
// 不加return,不加大括号
// export const userLoginService = ({ username, password }) => request.post('/api/login', { username, password })

/**
 * 用户信息
 */
export const userGetInfoService = () => {
  return request.get('/my/userinfo')
}
/**
 * 更新用户信息
 */
export const userUpdateInfoService = ({ id, nickname, email }) => {
  return request.put('/my/userinfo', { id, nickname, email })
}
/**
 * 更新用户头像
 */
export const userUploadAvatarService = (avatar) => {
  return request.patch('/my/update/avatar', { avatar })
}
// 更新密码
export const userUpdatePassService = ({ old_pwd, new_pwd, re_pwd }) => {
  request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
}
