import { querySellingPoint, addSellingPoint } from '../services/api';

export default {
  namespace: 'sellingPoint',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { put, call }) {
      const response = yield call(querySellingPoint, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload }, { put, call }) {
      const response = yield call(addSellingPoint, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
