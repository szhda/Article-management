import request from '@/utils/requset.js'

export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })

export const userData = () => {
  return request.get('/my/userinfo')
}
export const updateUserData = (data) => {
  return request.put('/my/userinfo', data)
}
export const submitImg = (avatar) => {
  return request.patch('/my/update/avatar', {
    avatar
  })
}
export const userUpdatePassService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
