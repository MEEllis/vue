import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { beginTask, endTask } from 'redux-nprogress';
import Api from '../config/api';

// beging not modify
const {
  subAccountList, subAccountListResult,
  subAccountDetail, subAccountDetailResult,
  updateSubAccount, updateSubAccountResult,
  lockSubAccount, lockSubAccountResult,
  unLockSubAccount, unLockSubAccountResult,
  addSubAccount, addSubAccountResult
} = createActions('SUB_ACCOUNT_LIST', 'SUB_ACCOUNT_LIST_RESULT',
    'SUB_ACCOUNT_DETAIL', 'SUB_ACCOUNT_DETAIL_RESULT',
    'UPDATE_SUB_ACCOUNT', 'UPDATE_SUB_ACCOUNT_RESULT',
    'LOCK_SUB_ACCOUNT', 'LOCK_SUB_ACCOUNT_RESULT',
    'UN_LOCK_SUB_ACCOUNT', 'UN_LOCK_SUB_ACCOUNT_RESULT',
    'ADD_SUB_ACCOUNT', 'ADD_SUB_ACCOUNT_RESULT');

export { subAccountList, subAccountDetail, updateSubAccount, lockSubAccount, unLockSubAccount, addSubAccount };

export default handleActions({
  SUB_ACCOUNT_LIST: (state) => ({
    ...state,
    isfetching: true
  }),
  SUB_ACCOUNT_LIST_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    subAccountListResult: action.payload
  }),
  SUB_ACCOUNT_DETAIL: (state) => ({
    ...state,
    isfetching: true
  }),
  SUB_ACCOUNT_DETAIL_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    subAccountDetailResult: action.payload
  }),
  UPDATE_SUB_ACCOUNT: (state) => ({
    ...state,
    isfetching: true
  }),
  UPDATE_SUB_ACCOUNT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    updateSubAccountResult: action.payload
  }),
  LOCK_SUB_ACCOUNT: (state) => ({
    ...state,
    isfetching: true
  }),
  LOCK_SUB_ACCOUNT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    lockSubAccountResult: action.payload
  }),
  UN_LOCK_SUB_ACCOUNT: (state) => ({
    ...state,
    isfetching: true
  }),
  UN_LOCK_SUB_ACCOUNT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    unLockSubAccountResult: action.payload
  }),
  ADD_SUB_ACCOUNT: (state) => ({
    ...state,
    isfetching: true
  }),
  ADD_SUB_ACCOUNT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    addSubAccountResult: action.payload
  })
}, {});
// ending not modify

function* subAccountListSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.SubAccountListUrl, data.payload);

    yield put(subAccountListResult(res));
  } catch (error) {
    yield put(subAccountListResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchSubAccountListSaga() {
  yield takeEvery(subAccountList, subAccountListSaga);
}


function* subAccountDetailSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.SubAccountDetailUrl, data.payload);

    yield put(subAccountDetailResult(res));
  } catch (error) {
    yield put(subAccountDetailResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchSubAccountDetailSaga() {
  yield takeEvery(subAccountDetail, subAccountDetailSaga);
}


function* updateSubAccountSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.UpdateSubAccountUrl, data.payload);

    yield put(updateSubAccountResult(res));
  } catch (error) {
    yield put(updateSubAccountResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchUpdateSubAccountSaga() {
  yield takeEvery(updateSubAccount, updateSubAccountSaga);
}


function* lockSubAccountSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.LockSubAccountUrl, data.payload);

    yield put(lockSubAccountResult(res));
  } catch (error) {
    yield put(lockSubAccountResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchLockSubAccountSaga() {
  yield takeEvery(lockSubAccount, lockSubAccountSaga);
}


function* unLockSubAccountSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.UnLockSubAccountUrl, data.payload);

    yield put(unLockSubAccountResult(res));
  } catch (error) {
    yield put(unLockSubAccountResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchUnLockSubAccountSaga() {
  yield takeEvery(unLockSubAccount, unLockSubAccountSaga);
}


function* addSubAccountSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.AddSubAccountUrl, data.payload);

    yield put(addSubAccountResult(res));
  } catch (error) {
    yield put(addSubAccountResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchAddSubAccountSaga() {
  yield takeEvery(addSubAccount, addSubAccountSaga);
}
