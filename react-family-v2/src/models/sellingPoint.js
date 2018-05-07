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
    *add({ payload }, { put, call }) {
      const response = yield call(addSellingPoint, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *update({ payload }, { put, call }) {
      const response = yield call(updateSellingPoint, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *updateDisbale({ payload }, { put, call }) {
      const response = yield call(updateSellingPointState, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *delete({ payload }, { put, call }) {
      const response = yield call(deleteSellingPoint, payload);
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
