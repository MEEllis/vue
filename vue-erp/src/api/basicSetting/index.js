import request from '@/utils/request'

// 查询用户分页
export function getConfigList() {
  return request({
    url: '/api/v1/manager/system/getConfigList',
    method: 'post'
  })
}

