const {
  companyList,
  info,
  getMenuList
} = require('./user')
const {
  companyInfo
} = require('./basicSetting')

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
        result: -999
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
        result: 1,
        token: 'abdfssdfsdfdsafadsfadsfawedfxcvxxc'
      })
    } else {
      return res.send({
        status: 'error',
        result: -999
      })
    }
  },
  'GET /manager/user/info': (req, res) => {
    return res.send(info)
  },
  'GET /manager/authority/companyInfo/companyList': (req, res) => {
    const one = Object.assign({}, companyInfo.data.company[0])
    for (let i = 0; i < 50; i++) {
      one.id += i
      one.name += i
      companyInfo.data.company.push(one)
    }
    return res.send(companyInfo)
  },
  'GET /manager/user/getMenuList': (req, res) => {
    return res.send(getMenuList)
  }
}
module.exports = proxy
