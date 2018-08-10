const {
  companyList,
  info,
  getMenuList
} = require('./user')
console.log(companyList)
console.log(info)
console.log(getMenuList)
const proxy = {
  'POST /user/companyList': (req, res) => {
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
  'POST /user/login': (req, res) => {
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
  'GET /user/info': (req, res) => {
    return res.send(info)
  },
  'GET /user/getMenuList': (req, res) => {
    return res.send(getMenuList)
  }
}
module.exports = proxy
