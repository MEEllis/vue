import { accountLogin } from '../services/user';

export default {
  namespace: 'login',
  state: {
    companyList:[]
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      if(response.code==='10000'){
        yield put({
          type: 'addCompanyList',
          payload: response,
        });
      }
    },
  },
  reducers: {
    addCompanyList(state, { payload }) {
      debugger
      return {
        ...state,
        companyList: payload.companyList,
      };
    },
  },
};