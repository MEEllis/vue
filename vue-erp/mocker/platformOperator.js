var Mock = require('mockjs')
const getUserVoPageList = Mock.mock({
  'success': true,
  'code': '0000',
  'desc': 'mock',
  'data': {
    'dataList|20': [{
      'id|+1': 1,
      'login': '@word(3, 8)',
      'name': '@cname()',
      'status': 51,
      'roleIds|1': ['1', '2', '3', '1,2'],
      'roleNames|1': ['管理员', '客户经理', '供应商渠道'],
      'createByName': '@cname()',
      'createTime': +Mock.Random.date('T'),
      'updateByName': '@cname()',
      'updateTime': +Mock.Random.date('T'),
      'lastLoginTime': +Mock.Random.date('T')
    }],
    'totalRecordCount|200-1000': 200,
    'totalPageCount': 27
  }
})

const getRoleList = Mock.mock({
  'success': true,
  'code': '0000',
  'desc': 'mock',
  'data': {
    'dataList': [{
      'id': 1,
      'name': '管理员'
    }, {
      'id': 2,
      'name': '客户经理'
    }, {
      'id': 3,
      'name': '供应商渠道'
    }]
  }
})

module.exports = {
  getUserVoPageList,
  getRoleList
}
