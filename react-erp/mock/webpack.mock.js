import { getCompanyList } from './user';

const proxy = {
  'POST /midway/api/forms': (req, res) => {
    res.send({message: 'Ok'});
  },
  'POST /login/account': (req, res) => {
    const {password, userName, type} = req.body;
    
    if((password === '1' && userName === '1') || (password === '123456' && userName === 'user'))  {
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
};

module.exports = proxy;