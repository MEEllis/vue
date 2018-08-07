import { accountLogin,companyLogin } from '../services/user';

export default {
  namespace: 'login',
  state: {
    companyList:[]
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      if(response.result===1){
        yield put({
          type: 'addCompanyList',
          payload: response,
        });
      }
    },
    *company({ payload }, { call, put }) {
      const response = yield call(companyLogin, payload);
      if(response.result===1){
         localStorage.setItem('token', response.token)
      }
    },
  },
  reducers: {
    addCompanyList(state, { payload }) {
      return {
        ...state,
        companyList: payload.companyList,
      };
    },
  },
};