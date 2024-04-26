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
