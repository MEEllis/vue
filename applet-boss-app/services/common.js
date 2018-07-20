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


//获取分类
function getGoodsClassList(onlyQueryOneLevelGoodsclass = 1) {
  return new Promise(function(resolve, reject) {
    request(api.getGoodsClassList, {
      onlyQueryOneLevelGoodsclass,
    }).then(res => {
      let categoryData = [{
        id: '',
        code: '',
        name: '全部'
      }]
      var dataList = categoryData.concat(res.data.dataList)
      resolve(dataList)
    }).catch((err) => {
      reject(err);
    })
  })
}



//获取品牌
function getGoodsBrandList() {
  return new Promise(function (resolve, reject) {
    request(api.getGoodsBrandList).then(res => {
      let categoryData = [{
        id: '',
        code: '',
        name: '全部'
      }]
      var dataList = categoryData.concat(res.data.dataList)
      resolve(dataList)
    }).catch((err) => {
      reject(err);
    })
  })
}



module.exports = {
  getBossAuthValidate,
  getGoodsClassList,
  getGoodsBrandList,
}