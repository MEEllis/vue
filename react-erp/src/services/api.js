import request from '@/utils/request'
import qs from 'qs'
export function loginByUsername(q, password) {
    const params = {
      q:"javascript",
    }
    return request({
      url: '/v2/book/search',
      method: 'get',
      params,
      loading: 'spin'
    })
  }