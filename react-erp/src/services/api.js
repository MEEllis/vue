import request from '@/utils/request'
import qs from 'qs'
export function loginByUsername(username, password) {
    const data = {
      username,
      password
    }
    return request({
      url: "/manager/emp/empLoginAjax.do",
      method: 'post',
      data: qs.stringify(data),
      loading: 'spin'
    })
  }