import request from '../utils/request.js'
import api from '../config/api.js'

//获取Boss小程序某一个菜单权限
function getBossAuthValidate(menuCode) {
  return new Promise(function(resolve, reject) {
    request(api.getBossAuthValidate, {
      menuCode: menuCode
    }).then(res => {
      resolve(res)
    }).catch((err) => {
      reject(err);
    })
  })
}




module.exports = {
  getBossAuthValidate,
}