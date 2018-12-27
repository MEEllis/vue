const delay = require('webpack-api-mocker/utils/delay')
const companyList = {
  'code': '0000',
  'desc': 'aaaaaaaa',
  'data': {
    'companyList': [{
      'attrs': {},
      'id': 762,
      'groupId': 826,
      'code': 'GS02',
      'name': '严琼洁测试公司02',
      'parentLayerCode': null,
      'areaId': -1,
      'status': 0,
      'remark': null,
      'createUid': 2579,
      'createTime': 1492397860000,
      'updateUid': 2579,
      'updateTime': 1532310022000,
      'layerCode': '00002',
      'adminLogin': '20170417ggs02cadmin',
      'adminPwd': '123456',
      'finishLayer': null,
      'flag': 2,
      'fqs': null,
      'fqsCode': null,
      'createName': null,
      'updateName': null,
      'updateTimeStr': '2018-07-23 09:40:22',
      'addTimeStr': '2017-04-17 10:57:40',
      'partnerId': -1,
      'moduleTypeIds': null,
      'companyDataTypeCode': null,
      'companyDataValueCode': null
    }, {
      'attrs': {},
      'id': 943,
      'groupId': 826,
      'code': 'GS05',
      'name': '严琼洁测试公司05',
      'parentLayerCode': null,
      'areaId': -1,
      'status': 0,
      'remark': null,
      'createUid': 2579,
      'createTime': 1496720991000,
      'updateUid': 2579,
      'updateTime': 1496721069000,
      'layerCode': '00005',
      'adminLogin': '20170417ggs05cadmin',
      'adminPwd': '123456',
      'finishLayer': null,
      'flag': null,
      'fqs': null,
      'fqsCode': null,
      'createName': null,
      'updateName': null,
      'updateTimeStr': '2017-06-06 11:51:09',
      'addTimeStr': '2017-06-06 11:49:51',
      'partnerId': -1,
      'moduleTypeIds': null,
      'companyDataTypeCode': null,
      'companyDataValueCode': null
    }, {
      'attrs': {},
      'id': 944,
      'groupId': 826,
      'code': 'GS06',
      'name': '严琼洁测试公司06',
      'parentLayerCode': null,
      'areaId': -1,
      'status': 0,
      'remark': null,
      'createUid': 2579,
      'createTime': 1496727367000,
      'updateUid': 2579,
      'updateTime': 1496727367000,
      'layerCode': '00006',
      'adminLogin': '20170417ggs06cadmin',
      'adminPwd': '123456',
      'finishLayer': null,
      'flag': null,
      'fqs': null,
      'fqsCode': null,
      'createName': null,
      'updateName': null,
      'updateTimeStr': '2017-06-06 13:36:07',
      'addTimeStr': '2017-06-06 13:36:07',
      'partnerId': -1,
      'moduleTypeIds': null,
      'companyDataTypeCode': null,
      'companyDataValueCode': null
    }, {
      'attrs': {},
      'id': 961,
      'groupId': 826,
      'code': 'GS07',
      'name': '严琼洁的测试公司07',
      'parentLayerCode': null,
      'areaId': -1,
      'status': 0,
      'remark': null,
      'createUid': 2579,
      'createTime': 1497240089000,
      'updateUid': 2579,
      'updateTime': 1532310044000,
      'layerCode': '00007',
      'adminLogin': '20170417ggs07cadmin',
      'adminPwd': '123456',
      'finishLayer': null,
      'flag': null,
      'fqs': null,
      'fqsCode': null,
      'createName': null,
      'updateName': null,
      'updateTimeStr': '2018-07-23 09:40:44',
      'addTimeStr': '2017-06-12 12:01:29',
      'partnerId': -1,
      'moduleTypeIds': null,
      'companyDataTypeCode': null,
      'companyDataValueCode': null
    }],
    'isOpr': 1,
    'url': 'http://branch.phoneerp.com/manager'
  }
}

const menuList = {
  "code": '0000',
  "desc": "",
  "data": [{
    "id": 4,
    "parentId": 0,
    "path": "",
    "icon": "appstore",
    "title": "系统",
    "name": "system",
    "leftMemu": true,
    "functionCode": "",
    "sort": 1,
    "children": [{
      "id": 5,
      "parentId": 4,
      "path": "/baseSetting",
      "icon": "setting",
      "title": "基础设置",
      "name": "baseSetting",
      "leftMemu": true,
      "functionCode": "",
      "children": [{
        "id": 6,
        "parentId": 5,
        "path": "storageInfo",
        "icon": "chrome",
        "title": "仓库信息",
        "name": "storageInfo",
        "leftMemu": true,
        "functionCode": "menu_view",
        "children": []
      }]
    },
    // {
    //   "id": 7,
    //   "parentId": 4,
    //   "path": "/purchaseManagement",
    //   "icon": "setting",
    //   "title": "采购管理",
    //   "name": "purchaseManagement",
    //   "leftMemu": true,
    //   "functionCode": "",
    //   "children": [{
    //     "id": 6,
    //     "parentId": 7,
    //     "path": "purchase",
    //     "icon": "chrome",
    //     "title": "采购订单",
    //     "name": "purchaseOrder",
    //     "leftMemu": true,
    //     "functionCode": "menu_view",
    //     "children": []
    //   }]
    // }
  ]
  }]
}

const aaa = {
  "code": '0000',
  "desc": "",
  "data": {
    "userName": "严琼洁202",
    "userRole": ["role_test", "role_website_admin"],
    "userPermission": ["post_edit", "post_view", "post_del", "menu_view", "function_view", "role_view", "role_permission_view", "role_user_view", "user_role_view", "user_view", "department_view", "position_view"],
    "isAdmin": 1,
    "avatarUrl": "https://api.adorable.io/avatars/85/abott@adorable.png"
  }
}

const proxy = {
  'POST /manager/emp/empLoginAjax.do': (req, res) => {
    const {
      password,
      username
    } = req.body
    if (username === 'admin' && password === '123') {
      return res.send(companyList)
    } else {
      return res.send({
        status: 'error',
        'code': '0000'
      })
    }
  },

  'POST /manager/emp/empLoginToken.do': (req, res) => {
    const {
      password,
      username
    } = req.body
    if (username === 'admin' && password === '123') {
      return res.send({
        'code': '0000',
        'desc': null,
        'data': {
          'token': 'SwyHTEx_RQppr97g4J5lKXtabJecpejuef8AqKYMAJc'
        }
      })
    } else {
      return res.send({
        status: 'error',
        'code': '0000'
      })
    }
  },

  'GET /manager/auth/menu/getMenuList': (req, res) => {
    return res.send(menuList)
  },

  'GET /user/info': (req, res) => {
    return res.send(menuList)
  },
}
module.exports = delay(proxy, 1500)