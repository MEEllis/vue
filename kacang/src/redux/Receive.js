import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { beginTask, endTask } from 'redux-nprogress';
import Api, { ComplaintList, ComplaintDetail, OperatorComplaint, OperatorWaitComplaint } from '../config/api';

// beging not modify
const {
  receiveComplaint, receiveComplaintResult,
  complaintDetail, complaintDetailResult,
  operatorComplaint, operatorComplaintResult,
  operatorWaitcomplaint, operatorWaitcomplaintResult
} = createActions('RECEIVE_COMPLAINT', 'RECEIVE_COMPLAINT_RESULT',
    'COMPLAINT_DETAIL', 'COMPLAINT_DETAIL_RESULT',
    'OPERATOR_COMPLAINT', 'OPERATOR_COMPLAINT_RESULT',
    'OPERATOR_WAITCOMPLAINT', 'OPERATOR_WAITCOMPLAINT_RESULT');

export { receiveComplaint, complaintDetail, operatorComplaint, operatorWaitcomplaint };

export default handleActions({
  RECEIVE_COMPLAINT: (state) => ({
    ...state,
    isfetching: true
  }),
  RECEIVE_COMPLAINT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    receiveComplaintResult: action.payload
  }),
  COMPLAINT_DETAIL: (state) => ({
    ...state,
    isfetching: true
  }),
  COMPLAINT_DETAIL_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    complaintDetailResult: action.payload
  }),
  OPERATOR_COMPLAINT: (state) => ({
    ...state,
    isfetching: true
  }),
  OPERATOR_COMPLAINT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    operatorComplaintResult: action.payload
  }),
  OPERATOR_WAITCOMPLAINT: (state) => ({
    ...state,
    isfetching: true
  }),
  OPERATOR_WAITCOMPLAINT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    operatorWaitcomplaintResult: action.payload
  })
}, {});
// ending not modify

function* receiveComplaintSaga(data) {
  try {
    yield put(beginTask());
    //Api.ComplaintList
    const res = yield call(axios.post, Api.ComplaintList, data.payload);

    yield put(receiveComplaintResult(res));
  } catch (error) {
    yield put(receiveComplaintResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchReceiveComplaintSaga() {
  yield takeEvery(receiveComplaint, receiveComplaintSaga);
}


function* complaintDetailSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.ComplaintDetail, data.payload);

    yield put(complaintDetailResult(res));
  } catch (error) {
    yield put(complaintDetailResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchComplaintDetailSaga() {
  yield takeEvery(complaintDetail, complaintDetailSaga);
}


function* operatorComplaintSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.OperatorComplaint, data.payload);

    yield put(operatorComplaintResult(res));
  } catch (error) {
    yield put(operatorComplaintResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchOperatorComplaintSaga() {
  yield takeEvery(operatorComplaint, operatorComplaintSaga);
}


function* operatorWaitcomplaintSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.OperatorWaitComplaint, data.payload);

    yield put(operatorWaitcomplaintResult(res));
  } catch (error) {
    yield put(operatorWaitcomplaintResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchOperatorWaitcomplaintSaga() {
  yield takeEvery(operatorWaitcomplaint, operatorWaitcomplaintSaga);
}
