import { accountLogin } from '../services/user';

export default {
  namespace: 'login',
  state: {

  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
    },


  },
  reducers: {

  },
};