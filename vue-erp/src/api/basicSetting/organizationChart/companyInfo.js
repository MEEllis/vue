import request from '@/utils/request'

export function getCompanyInfo() {
  return request({
    url: '/manager/authority/companyInfo/companyList',
    method: 'get'
  })
}
