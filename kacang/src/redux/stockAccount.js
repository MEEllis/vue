import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { beginTask, endTask } from 'redux-nprogress';
import Api from '../config/api';

// beging not modify
const {
  getStockAccount, getStockAccountResult,
  deleteStockAccount, deleteStockAccountResult,
  batchDeleteStockAccount, batchDeleteStockAccountResult,
  batchUpdateStockAccount, batchUpdateStockAccountResult,
  addStockAccount, addStockAccountResult,
  updateStockAccount, updateStockAccountResult
} = createActions('GET_STOCK_ACCOUNT', 'GET_STOCK_ACCOUNT_RESULT',
    'DELETE_STOCK_ACCOUNT', 'DELETE_STOCK_ACCOUNT_RESULT',
    'BATCH_DELETE_STOCK_ACCOUNT', 'BATCH_DELETE_STOCK_ACCOUNT_RESULT',
    'BATCH_UPDATE_STOCK_ACCOUNT', 'BATCH_UPDATE_STOCK_ACCOUNT_RESULT',
    'ADD_STOCK_ACCOUNT', 'ADD_STOCK_ACCOUNT_RESULT',
    'UPDATE_STOCK_ACCOUNT', 'UPDATE_STOCK_ACCOUNT_RESULT');

export { getStockAccount, deleteStockAccount, batchDeleteStockAccount, batchUpdateStockAccount, addStockAccount, updateStockAccount };

export default handleActions({
  GET_STOCK_ACCOUNT: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_STOCK_ACCOUNT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getStockAccountResult: action.payload
  }),
  DELETE_STOCK_ACCOUNT: (state) => ({
    ...state,
    isfetching: true
  }),
  DELETE_STOCK_ACCOUNT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    deleteStockAccountResult: action.payload
  }),
  BATCH_DELETE_STOCK_ACCOUNT: (state) => ({
    ...state,
    isfetching: true
  }),
  BATCH_DELETE_STOCK_ACCOUNT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    batchDeleteStockAccountResult: action.payload
  }),
  BATCH_UPDATE_STOCK_ACCOUNT: (state) => ({
    ...state,
    isfetching: true
  }),
  BATCH_UPDATE_STOCK_ACCOUNT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    batchUpdateStockAccountResult: action.payload
  }),
  ADD_STOCK_ACCOUNT: (state) => ({
    ...state,
    isfetching: true
  }),
  ADD_STOCK_ACCOUNT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    addStockAccountResult: action.payload
  }),
  UPDATE_STOCK_ACCOUNT: (state) => ({
    ...state,
    isfetching: true
  }),
  UPDATE_STOCK_ACCOUNT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    updateStockAccountResult: action.payload
  })
}, {});
// ending not modify

function* getStockAccountSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetStockAccount, data.payload);

    yield put(getStockAccountResult(res));
  } catch (error) {
    yield put(getStockAccountResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetStockAccountSaga() {
  yield takeEvery(getStockAccount, getStockAccountSaga);
}


function* deleteStockAccountSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.DeleteStockAccount, data.payload);

    yield put(deleteStockAccountResult(res));
  } catch (error) {
    yield put(deleteStockAccountResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchDeleteStockAccountSaga() {
  yield takeEvery(deleteStockAccount, deleteStockAccountSaga);
}


function* batchDeleteStockAccountSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.BatchDeleteStockAccount, data.payload);

    yield put(batchDeleteStockAccountResult(res));
  } catch (error) {
    yield put(batchDeleteStockAccountResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchBatchDeleteStockAccountSaga() {
  yield takeEvery(batchDeleteStockAccount, batchDeleteStockAccountSaga);
}


function* batchUpdateStockAccountSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.BatchUpdateStockAccount, data.payload);

    yield put(batchUpdateStockAccountResult(res));
  } catch (error) {
    yield put(batchUpdateStockAccountResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchBatchUpdateStockAccountSaga() {
  yield takeEvery(batchUpdateStockAccount, batchUpdateStockAccountSaga);
}


function* addStockAccountSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.AddStockAccount, data.payload);

    yield put(addStockAccountResult(res));
  } catch (error) {
    yield put(addStockAccountResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchAddStockAccountSaga() {
  yield takeEvery(addStockAccount, addStockAccountSaga);
}


function* updateStockAccountSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.UpdateStockAccount, data.payload);

    yield put(updateStockAccountResult(res));
  } catch (error) {
    yield put(updateStockAccountResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchUpdateStockAccountSaga() {
  yield takeEvery(updateStockAccount, updateStockAccountSaga);
}
