import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { beginTask, endTask } from 'redux-nprogress';
import Api from '../config/api';

// beging not modify
const {
  financedetail, financedetailResult,
  getStatistics, getStatisticsResult,
  getWithDrawDetail, getWithDrawDetailResult,
  getWithDrawPage, getWithDrawPageResult,
  applyWithDraw, applyWithDrawResult,
  getWithDrawAmount, getWithDrawAmountResult
} = createActions('FINANCEDETAIL', 'FINANCEDETAIL_RESULT',
    'GET_STATISTICS', 'GET_STATISTICS_RESULT',
    'GET_WITH_DRAW_DETAIL', 'GET_WITH_DRAW_DETAIL_RESULT',
    'GET_WITH_DRAW_PAGE', 'GET_WITH_DRAW_PAGE_RESULT',
    'APPLY_WITH_DRAW', 'APPLY_WITH_DRAW_RESULT',
    'GET_WITH_DRAW_AMOUNT', 'GET_WITH_DRAW_AMOUNT_RESULT');

export { financedetail, getStatistics, getWithDrawDetail, getWithDrawPage, applyWithDraw, getWithDrawAmount };

export default handleActions({
  FINANCEDETAIL: (state) => ({
    ...state,
    isfetching: true
  }),
  FINANCEDETAIL_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    financedetailResult: action.payload
  }),
  GET_STATISTICS: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_STATISTICS_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getStatisticsResult: action.payload
  }),
  GET_WITH_DRAW_DETAIL: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_WITH_DRAW_DETAIL_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getWithDrawDetailResult: action.payload
  }),
  GET_WITH_DRAW_PAGE: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_WITH_DRAW_PAGE_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getWithDrawPageResult: action.payload
  }),
  APPLY_WITH_DRAW: (state) => ({
    ...state,
    isfetching: true
  }),
  APPLY_WITH_DRAW_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    applyWithDrawResult: action.payload
  }),
  GET_WITH_DRAW_AMOUNT: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_WITH_DRAW_AMOUNT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getWithDrawAmountResult: action.payload
  })
}, {});
// ending not modify

// 财务明细
function* financedetailSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetFinancePage, data.payload);

    yield put(financedetailResult(res));
  } catch (error) {
    yield put(financedetailResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchFinancedetailSaga() {
  yield takeEvery(financedetail, financedetailSaga);
}

// 财务统计
function* getStatisticsSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetStatistics, data.payload);

    yield put(getStatisticsResult(res));
  } catch (error) {
    yield put(getStatisticsResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetStatisticsSaga() {
  yield takeEvery(getStatistics, getStatisticsSaga);
}

// 查看详情
function* getWithDrawDetailSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetWithDrawDetail, data.payload);

    yield put(getWithDrawDetailResult(res));
  } catch (error) {
    yield put(getWithDrawDetailResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetWithDrawDetailSaga() {
  yield takeEvery(getWithDrawDetail, getWithDrawDetailSaga);
}

// 查询提现记录
function* getWithDrawPageSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetWithDrawPage, data.payload);

    yield put(getWithDrawPageResult(res));
  } catch (error) {
    yield put(getWithDrawPageResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetWithDrawPageSaga() {
  yield takeEvery(getWithDrawPage, getWithDrawPageSaga);
}

// 申请提现
function* applyWithDrawSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.ApplyWithDraw, data.payload);

    yield put(applyWithDrawResult(res));
  } catch (error) {
    yield put(applyWithDrawResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchApplyWithDrawSaga() {
  yield takeEvery(applyWithDraw, applyWithDrawSaga);
}


function* getWithDrawAmountSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetWithDrawAmountUrl, data.payload);

    yield put(getWithDrawAmountResult(res));
  } catch (error) {
    yield put(getWithDrawAmountResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetWithDrawAmountSaga() {
  yield takeEvery(getWithDrawAmount, getWithDrawAmountSaga);
}
