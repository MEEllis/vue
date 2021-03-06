const delay = require('webpack-api-mocker/utils/delay')
const {
  companyList,
  info,
  getMenuList
} = require('./user')
const {
  getConfigList
} = require('./basicSetting')
const {
  getUserVoPageList,
  getRoleList
} = require('./platformOperator')

const proxy = {
  'POST /manager/user/companyList': (req, res) => {
    const {
      password,
      username
    } = req.body
    if (password === 'admin' && username === 'admin') {
      return res.send(companyList)
    } else {
      return res.send({
        status: 'error',
        'code': '0000'
      })
    }
  },
  'POST /manager/user/login': (req, res) => {
    const {
      password,
      username
    } = req.body
    if (password === 'admin' && username === 'admin') {
      return res.send({
        'code': '0000',
        token: 'abdfssdfsdfdsafadsfadsfawedfxcvxxc'
      })
    } else {
      return res.send({
        status: 'error',
        'code': '-9999'
      })
    }
  },
  'GET /manager/user/info': (req, res) => {
    return res.send(info)
  },
  'GET /manager/user/getMenuList': (req, res) => {
    return res.send(getMenuList)
  },
  'POST /api/v1/manager/user/getUserVoPageList': (req, res) => {
    return res.send(getUserVoPageList)
  },
  'POST /api/v1/manager/role/getRoleList': (req, res) => {
    return res.send(getRoleList)
  },
  'POST /api/v1/manager/user/deleteUser': (req, res) => {
    return res.send({
      code: '0000'
    })
  },
  'POST /api/v1/manager/user/enableUser': (req, res) => {
    return res.send({
      code: '0000'
    })
  },
  'POST /api/v1/manager/user/resetPassword': (req, res) => {
    return res.send({
      code: '0000'
    })
  },
  'POST /api/v1/manager/user/saveUser/auth_update': (req, res) => {
    return res.send({
      code: '0000'
    })
  },
  'POST /api/v1/manager/user/saveUser/auth_add': (req, res) => {
    return res.send({
      code: '0000'
    })
  },
  'POST /api/v1/manager/role/deleteRole': (req, res) => {
    return res.send({
      code: '0000'
    })
  },
  'POST /api/v1/manager/role/saveRole/auth_add': (req, res) => {
    return res.send({
      code: '0000'
    })
  },
  'POST /api/v1/manager/role/saveRole/auth_update': (req, res) => {
    return res.send({
      code: '0000'
    })
  },
  'POST /api/v1/manager/system/getConfigList': (req, res) => {
    return res.send(getConfigList)
  }
}
module.exports = delay(proxy, 1500)
