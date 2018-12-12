import request from '@/utils/request'
import qs from 'qs'
export function loginByUsername(username, password) {
    const data = {
      username,
      password,
    }
    return request({
      url: "/manager/emp/empLoginAjax.do",
      method: 'post',
      data: qs.stringify(data),
      loading: 'spin'
    })
}

export function loginByToken(username, password,companyId) {
  const data = {
    username,
    password,
    cid:companyId ? companyId : -1,
  }
  return request({
    url: "/manager/emp/empLoginToken.do",
    method: 'post',
    data: qs.stringify(data),
    loading: 'spin'
  })
}

export function getMenuList() {
  return request({
    url: "/manager/auth/menu/getMenuList",
    method: 'get',
    loading: "spin"
  })
}

export function getUserInfo() {
  return request({
    url: "/user/info",
    method: 'get',
    loading: "spin"
  })
}