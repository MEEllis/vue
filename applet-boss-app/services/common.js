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

//获取公司
function getCompanySectionList(data) {
  return new Promise(function (resolve, reject) {
    request(api.getCompanySectionList, data).then(res => {
      let categoryData = [{
        id: '',
        code: '',
        nodeType: '',
        name: '全部',
        companyId:'',
      }]
      var dataList = categoryData.concat(res.data.dataList)
      resolve(dataList)
    }).catch((err) => {
      reject(err);
    })
  })
}


//获取
function getContactUnitList(data) {
  return new Promise(function (resolve, reject) {
    request(api.getContactUnitList, data).then(res => {

      let ContactUnitsData = [{
        id: '',
        code: '',
        name: '全部'
      }]

      var dataList = ContactUnitsData.concat(res.data.dataList)
      resolve(dataList)
    }).catch((err) => {
      reject(err);
    })
  })
}


//获取运营商名称
function getOperatorsList(data) {
  return new Promise(function (resolve, reject) {
    request(api.getOperatorsList, data).then(res => {
      let Item = [{
        id: '',
        code: '',
        name: '全部'
      }]
      var dataList = Item.concat(res.data.dataList)
      resolve(dataList)
    }).catch((err) => {
      reject(err);
    })
  })
}

//获取运营商单位
function getOperatorUnitsList(data) {
  return new Promise(function (resolve, reject) {
    request(api.getOperatorUnitsList, data).then(res => {
      let Item = [{
        id: '',
        code: '',
        name: '全部'
      }]
      var dataList = Item.concat(res.data.dataList)
      resolve(dataList)
    }).catch((err) => {
      reject(err);
    })
  })
}

//获取运营商业务名称
function getOperatorNameList(data) {
  return new Promise(function (resolve, reject) {
    request(api.getOperatorNameList, data).then(res => {
      let Item = [{
        id: '',
        code: '',
        name: '全部'
      }]
      var dataList = Item.concat(res.data.dataList)
      resolve(dataList)
    }).catch((err) => {
      reject(err);
    })
  })
}


//获取分期商名称
function getInstallmentfeesList(data) {
  return new Promise(function (resolve, reject) {
    request(api.getInstallmentfeesList, data).then(res => {
      let Item = [{
        id: '',
        code: '',
        name: '全部'
      }]
      var dataList = Item.concat(res.data.dataList)
      resolve(dataList)
    }).catch((err) => {
      reject(err);
    })
  })
}

//获取分期业务名称
function getInstallmentBusinessList(data) {
  return new Promise(function (resolve, reject) {
    request(api.getInstallmentBusinessList, data).then(res => {
      let Item = [{
        id: '',
        code: '',
        name: '全部',
        installmentBusinessList:[]
      }]
      var dataList = Item.concat(res.data.dataList)
      resolve(dataList)
    }).catch((err) => {
      reject(err);
    })
  })
}

//获取抵扣单位集合
function getDeductionUnitsList(data) {
  return new Promise(function (resolve, reject) {
    request(api.getDeductionUnitsList, data).then(res => {
      let Item = [{
        id: '',
        code: '',
        name: '全部'
      }]
      var dataList = Item.concat(res.data.dataList)
      resolve(dataList)
    }).catch((err) => {
      reject(err);
    })
  })
}

//获取分期业务名称
function getAccountTypeList(data) {
  return new Promise(function (resolve, reject) {
    request(api.getAccountTypeList, data).then(res => {
      let Item = [{
        id: '',
        code: '',
        name: '全部'
      }]
      var dataList = Item.concat(res.data.dataList)
      resolve(dataList)
    }).catch((err) => {
      reject(err);
    })
  })
}


//获取抵扣活动集合
function getActivityNamesList(data) {
  return new Promise(function (resolve, reject) {
    request(api.getActivityNamesList, data).then(res => {
      let Item = [{
        id: '',
        code: '',
        name: '全部'
      }]
      var dataList = Item.concat(res.data.dataList)
      resolve(dataList)
    }).catch((err) => {
      reject(err);
    })
  })
}



//获取抵扣活动集合
function getCompanyList(data) {
  return new Promise(function (resolve, reject) {
    request(api.getCompanyList, data).then(res => {
      let Item = [{
        id: '',
        code: '',
        name: '全部'
      }]
      var dataList = Item.concat(res.data.dataList)
      resolve(dataList)
    }).catch((err) => {
      reject(err);
    })
  })
}

//获取抵扣活动集合
function getAddValueServiceNameList(data) {
  return new Promise(function (resolve, reject) {
    request(api.getAddValueServiceNameList, data).then(res => {
      let Item = [{
        id: '',
        code: '',
        name: '全部'
      }]
      var dataList = Item.concat(res.data.dataList)
      resolve(dataList)
    }).catch((err) => {
      reject(err);
    })
  })
}


//设置公司参数
function setCompanySectionParam(companySectionParamNodeType, companySectionParamId){
  let companySectionParam = '';
  if (companySectionParamNodeType != '') {
    companySectionParam = companySectionParamNodeType + ',' + companySectionParamId
  }
  return companySectionParam;
}

module.exports = {
  getBossAuthValidate,
  getGoodsClassList,
  getGoodsBrandList,
  getCompanySectionList,
  setCompanySectionParam,
  getContactUnitList,
  getOperatorsList,
  getOperatorUnitsList,
  getOperatorNameList,
  getInstallmentfeesList,
  getInstallmentBusinessList,
  getAccountTypeList,
  getDeductionUnitsList,
  getActivityNamesList,
  getCompanyList,
  getAddValueServiceNameList,
}