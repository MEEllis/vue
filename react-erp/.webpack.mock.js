const mockjs = require('mockjs');

import { getCompanyList } from './mock/user';

const proxy = {
  'POST /midway/api/forms': (req, res) => {
    res.send({message: 'Ok'});
  },
  'POST /login/account': (req, res) => {
    const {password, userName, type} = req.body;
    
    if((password === '888888' && userName === 'admin') || (password === '123456' && userName === 'user'))  {
      res.send({
        code: '10000',
        type,
        companyList:getCompanyList
      });
    }else{
      res.send({
        status: '-999',
        type,
      });
    }
  




  },

  'GET /midway/api/console/getnotice': (req, res) => {
    res.send({
      success: true,
      data: {
        notice: [
          {
            id: 1,
            title: '测试通知公告测试通知公告测试通知公告测试通知公告测试通知公告',
          },
          {
            id: 2,
            title: '测试通知公告测试通知公告测试通知公告测试通知公告测试通知公告',
          },
          {
            id: 3,
            title: '测试通知公告测试通知公告测试通知公告测试通知公告测试通知公告',
          }
        ],
        productMsg: [
          {
            id: 1,
            title: '测试产品公告测试通知公告测试通知公告测试通知公告测试通知公告',
          },
          {
            id: 2,
            title: '测试产品公告测试通知公告测试通知公告测试通知公告测试通知公告',
          },
          {
            id: 3,
            title: '测试产品公告测试通知公告测试通知公告测试通知公告测试通知公告',
          }
        ],
      },
    });
  },
};

module.exports = proxy;