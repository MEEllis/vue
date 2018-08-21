var Mock = require('mockjs')
const getUserVoPageList = Mock.mock({
  'success': true,
  'code': '0000',
  'desc': 'mock',
  'data': {
    'dataList|20': [{
      'id|+1': 17,
      'login': '@word(3, 8)',
      'name': '@cname()',
      'status': 51,
      'roleNames|1': ['管理员', '客户经理', '供应商渠道'],
      'createByName': '@cname()',
      'createTime': +Mock.Random.date('T'),
      'updateByName': '@cname()',
      'updateTime': +Mock.Random.date('T'),
      'lastLoginTime': +Mock.Random.date('T')
    }],
    'totalRecordCount': 34,
    'totalPageCount': 27
  }
})

module.exports = {
  getUserVoPageList
}
