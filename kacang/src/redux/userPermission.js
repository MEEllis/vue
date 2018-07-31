import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { beginTask, endTask } from 'redux-nprogress';
import Api from '../config/api';

// beging not modify
const {
  getSubAccountPermissionList, getSubAccountPermissionListResult,
  setSubAccountPermission, setSubAccountPermissionResult
} = createActions('GET_SUB_ACCOUNT_PERMISSION_LIST', 'GET_SUB_ACCOUNT_PERMISSION_LIST_RESULT',
    'SET_SUB_ACCOUNT_PERMISSION', 'SET_SUB_ACCOUNT_PERMISSION_RESULT');

export { getSubAccountPermissionList, setSubAccountPermission };

export default handleActions({
  GET_SUB_ACCOUNT_PERMISSION_LIST: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_SUB_ACCOUNT_PERMISSION_LIST_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getSubAccountPermissionListResult: action.payload
  }),
  SET_SUB_ACCOUNT_PERMISSION: (state) => ({
    ...state,
    isfetching: true
  }),
  SET_SUB_ACCOUNT_PERMISSION_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    setSubAccountPermissionResult: action.payload
  })
}, {});
// ending not modify

function* getSubAccountPermissionListSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetSubAccountPermissionListUrl, data.payload);

    yield put(getSubAccountPermissionListResult(res));
  } catch (error) {
    yield put(getSubAccountPermissionListResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetSubAccountPermissionListSaga() {
  yield takeEvery(getSubAccountPermissionList, getSubAccountPermissionListSaga);
}


function* setSubAccountPermissionSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.SetSubAccountPermissionUrl, data.payload);

    yield put(setSubAccountPermissionResult(res));
  } catch (error) {
    yield put(setSubAccountPermissionResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchSetSubAccountPermissionSaga() {
  yield takeEvery(setSubAccountPermission, setSubAccountPermissionSaga);
}
