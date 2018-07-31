import {
  querySellingPoint,
  addSellingPoint,
  updateSellingPoint,
  updateSellingPointState,
  deleteSellingPoint,
} from '../services/api';

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
    *add({ payload, callback }, { call }) {
      const response = yield call(addSellingPoint, payload);
      if (callback) {
        callback(response);
      }
    },
    *update({ payload, callback }, { call }) {
      const response = yield call(updateSellingPoint, payload);
      if (callback) {
        callback(response);
      }
    },
    *updateDisbale({ payload, callback }, { call }) {
      const response = yield call(updateSellingPointState, payload);
      if (callback) {
        callback(response);
      }
    },
    *delete({ payload, callback }, { call }) {
      const response = yield call(deleteSellingPoint, payload);
      if (callback) {
        callback(response);
      }
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
