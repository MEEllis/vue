import request from '@/utils/request'
// 通过用户名密码获取公司列表
export function getCompanyList(username, password) {
  return request({
    url: '/user/companyList',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

// 通过用户名密码公司，  登录
export function login(username, password, companyId) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password,
      companyId
    }
  })
}

export function getMenuList(token) {
  return request({
    url: '/user/getMenuList',
    method: 'get',
    params: {
      token
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
