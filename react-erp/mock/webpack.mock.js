import { getCompanyList } from './user';

const proxy = {
  'POST /midway/api/forms': (req, res) => {
    res.send({message: 'Ok'});
  },
  'POST /login/account': (req, res) => {
    const {password, userName} = req.body;
    
    if((password === '1' && userName === '1') || (password === '123456' && userName === 'user'))  {
      res.send({
        result: 1,
        companyList:getCompanyList
      });
    }else{
      res.send({
        result: -999,
      });
    }
  },
  'POST /login/company': (req, res) => {
    const {password, userName,companyId} = req.body;
    res.send({
      result: 1,
      token:'abcddsdfsdfsljlksjfdlkjskdlfjksdfsdfsdfsdfsdfsdf',
    });
  },
};

module.exports = proxy;