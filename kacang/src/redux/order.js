import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { beginTask, endTask } from 'redux-nprogress';
import Api from '../config/api';

// beging not modify
const {
  getOrderList, getOrderListResult,
  getOrderDetail, getOrderDetailResult,
  handleOrder, handleOrderResult
} = createActions('GET_ORDER_LIST', 'GET_ORDER_LIST_RESULT',
    'GET_ORDER_DETAIL', 'GET_ORDER_DETAIL_RESULT',
    'HANDLE_ORDER', 'HANDLE_ORDER_RESULT');

export { getOrderList, getOrderDetail, handleOrder };

export default handleActions({
  GET_ORDER_LIST: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_ORDER_LIST_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getOrderListResult: action.payload
  }),
  GET_ORDER_DETAIL: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_ORDER_DETAIL_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getOrderDetailResult: action.payload
  }),
  HANDLE_ORDER: (state) => ({
    ...state,
    isfetching: true
  }),
  HANDLE_ORDER_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    handleOrderResult: action.payload
  })
}, {});
// ending not modify

function* getOrderListSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetOrderList, data.payload);

    yield put(getOrderListResult(res));
  } catch (error) {
    yield put(getOrderListResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetOrderListSaga() {
  yield takeEvery(getOrderList, getOrderListSaga);
}


function* getOrderDetailSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetOrderDetail, data.payload);

    yield put(getOrderDetailResult(res));
  } catch (error) {
    yield put(getOrderDetailResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetOrderDetailSaga() {
  yield takeEvery(getOrderDetail, getOrderDetailSaga);
}


function* handleOrderSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.HandleOrderUrl, data.payload);

    yield put(handleOrderResult(res));
  } catch (error) {
    yield put(handleOrderResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchHandleOrderSaga() {
  yield takeEvery(handleOrder, handleOrderSaga);
}
