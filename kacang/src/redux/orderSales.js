import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { beginTask, endTask } from 'redux-nprogress';
import Api from '../config/api';

// beging not modify
const {
  sale, saleResult
} = createActions('SALE', 'SALE_RESULT');

export { sale };

export default handleActions({
  SALE: (state) => ({
    ...state,
    isfetching: true
  }),
  SALE_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    saleResult: action.payload
  })
}, {});
// ending not modify

function* saleSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.SaleUrl, data.payload);

    yield put(saleResult(res));
  } catch (error) {
    yield put(saleResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchSaleSaga() {
  yield takeEvery(sale, saleSaga);
}
