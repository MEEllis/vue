import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { beginTask, endTask } from 'redux-nprogress';
import Api from '../config/api';

// beging not modify
const {
  getStockCard, getStockCardResult
} = createActions('GET_STOCK_CARD', 'GET_STOCK_CARD_RESULT');

export { getStockCard };

export default handleActions({
  GET_STOCK_CARD: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_STOCK_CARD_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getStockCardResult: action.payload
  })
}, {});
// ending not modify

function* getStockCardSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetStockCard, data.payload);

    yield put(getStockCardResult(res));
  } catch (error) {
    yield put(getStockCardResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetStockCardSaga() {
  yield takeEvery(getStockCard, getStockCardSaga);
}
