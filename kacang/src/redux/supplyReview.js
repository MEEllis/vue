import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { beginTask, endTask } from 'redux-nprogress';
import Api from '../config/api';

// beging not modify
const {
  getList, getListResult,
  denySupply, denySupplyResult,
  allowSupply, allowSupplyResult,
  stasticPurchaseApplyAudit, stasticPurchaseApplyAuditResult
} = createActions('GET_LIST', 'GET_LIST_RESULT',
    'DENY_SUPPLY', 'DENY_SUPPLY_RESULT',
    'ALLOW_SUPPLY', 'ALLOW_SUPPLY_RESULT',
    'STASTIC_PURCHASE_APPLY_AUDIT', 'STASTIC_PURCHASE_APPLY_AUDIT_RESULT');

export { getList, denySupply, allowSupply, stasticPurchaseApplyAudit };

export default handleActions({
  GET_LIST: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_LIST_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getListResult: action.payload
  }),
  DENY_SUPPLY: (state) => ({
    ...state,
    isfetching: true
  }),
  DENY_SUPPLY_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    denySupplyResult: action.payload
  }),
  ALLOW_SUPPLY: (state) => ({
    ...state,
    isfetching: true
  }),
  ALLOW_SUPPLY_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    allowSupplyResult: action.payload
  }),
  STASTIC_PURCHASE_APPLY_AUDIT: (state) => ({
    ...state,
    isfetching: true
  }),
  STASTIC_PURCHASE_APPLY_AUDIT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    stasticPurchaseApplyAuditResult: action.payload
  })
}, {});
// ending not modify

function* getListSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetSupplyReviewList, data.payload);

    yield put(getListResult(res));
  } catch (error) {
    yield put(getListResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetListSaga() {
  yield takeEvery(getList, getListSaga);
}


function* denySupplySaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.DenySupply, data.payload);

    yield put(denySupplyResult(res));
  } catch (error) {
    yield put(denySupplyResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchDenySupplySaga() {
  yield takeEvery(denySupply, denySupplySaga);
}


function* allowSupplySaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.AllowSupply, data.payload);

    yield put(allowSupplyResult(res));
  } catch (error) {
    yield put(allowSupplyResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchAllowSupplySaga() {
  yield takeEvery(allowSupply, allowSupplySaga);
}


function* stasticPurchaseApplyAuditSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.StasticPurchaseApplyAuditUrl, data.payload);

    yield put(stasticPurchaseApplyAuditResult(res));
  } catch (error) {
    yield put(stasticPurchaseApplyAuditResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchStasticPurchaseApplyAuditSaga() {
  yield takeEvery(stasticPurchaseApplyAudit, stasticPurchaseApplyAuditSaga);
}
