import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { beginTask, endTask } from 'redux-nprogress';
import Api from '../config/api';
import Auth from '../constants/auth';

// beging not modify
const {
  checkLogin, checkLoginResult,
  sendCode, sendCodeResult,
  createPersonalIdentification, createPersonalIdentificationResult,
  imgUpload, imgUploadResult,
  sendCodeCompany, sendCodeCompanyResult,
  createCompanyIdentification, createCompanyIdentificationResult,
  getCurrent, getCurrentResult,
  getAccount, getAccountResult,
  getSubAccountPermissionListExtend, getSubAccountPermissionListExtendResult,
  logOut, logOutResult,
  updateIdentification, updateIdentificationResult,
  updateIdentificationCompany, updateIdentificationCompanyResult
} = createActions('CHECK_LOGIN', 'CHECK_LOGIN_RESULT',
    'SEND_CODE', 'SEND_CODE_RESULT',
    'CREATE_PERSONAL_IDENTIFICATION', 'CREATE_PERSONAL_IDENTIFICATION_RESULT',
    'IMG_UPLOAD', 'IMG_UPLOAD_RESULT',
    'SEND_CODE_COMPANY', 'SEND_CODE_COMPANY_RESULT',
    'CREATE_COMPANY_IDENTIFICATION', 'CREATE_COMPANY_IDENTIFICATION_RESULT',
    'GET_CURRENT', 'GET_CURRENT_RESULT',
    'GET_ACCOUNT', 'GET_ACCOUNT_RESULT',
    'GET_SUB_ACCOUNT_PERMISSION_LIST_EXTEND', 'GET_SUB_ACCOUNT_PERMISSION_LIST_EXTEND_RESULT',
    'LOG_OUT', 'LOG_OUT_RESULT',
    'UPDATE_IDENTIFICATION', 'UPDATE_IDENTIFICATION_RESULT',
    'UPDATE_IDENTIFICATION_COMPANY', 'UPDATE_IDENTIFICATION_COMPANY_RESULT');

export { checkLogin, sendCode, createPersonalIdentification, imgUpload, sendCodeCompany, createCompanyIdentification, getCurrent, getAccount, getSubAccountPermissionListExtend, logOut, updateIdentification, updateIdentificationCompany };

export default handleActions({
  CHECK_LOGIN: (state) => ({
    ...state,
    isfetching: true
  }),
  CHECK_LOGIN_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    checkLoginResult: action.payload
  }),
  SEND_CODE: (state) => ({
    ...state,
    isfetching: true
  }),
  SEND_CODE_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    sendCodeResult: action.payload
  }),
  CREATE_PERSONAL_IDENTIFICATION: (state) => ({
    ...state,
    isfetching: true
  }),
  CREATE_PERSONAL_IDENTIFICATION_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    createPersonalIdentificationResult: action.payload
  }),
  IMG_UPLOAD: (state) => ({
    ...state,
    isfetching: true
  }),
  IMG_UPLOAD_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    imgUploadResult: action.payload
  }),
  SEND_CODE_COMPANY: (state) => ({
    ...state,
    isfetching: true
  }),
  SEND_CODE_COMPANY_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    sendCodeCompanyResult: action.payload
  }),
  CREATE_COMPANY_IDENTIFICATION: (state) => ({
    ...state,
    isfetching: true
  }),
  CREATE_COMPANY_IDENTIFICATION_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    createCompanyIdentificationResult: action.payload
  }),
  GET_CURRENT: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_CURRENT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getCurrentResult: action.payload
  }),
  GET_ACCOUNT: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_ACCOUNT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getAccountResult: action.payload
  }),
  GET_SUB_ACCOUNT_PERMISSION_LIST_EXTEND: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_SUB_ACCOUNT_PERMISSION_LIST_EXTEND_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getSubAccountPermissionListExtendResult: action.payload
  }),
  LOG_OUT: (state) => ({
    ...state,
    isfetching: true
  }),
  LOG_OUT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    logOutResult: action.payload
  }),
  UPDATE_IDENTIFICATION: (state) => ({
    ...state,
    isfetching: true
  }),
  UPDATE_IDENTIFICATION_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    updateIdentificationResult: action.payload
  }),
  UPDATE_IDENTIFICATION_COMPANY: (state) => ({
    ...state,
    isfetching: true
  }),
  UPDATE_IDENTIFICATION_COMPANY_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    updateIdentificationCompanyResult: action.payload
  })
}, {});
// ending not modify

function* checkLoginSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.CheckLoginUrl, data.payload);

    yield put(checkLoginResult(res));
  } catch (error) {
    yield put(checkLoginResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchCheckLoginSaga() {
  yield takeEvery(checkLogin, checkLoginSaga);
}


function* sendCodeSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.SendCodeUrl, data.payload);

    yield put(sendCodeResult(res));
  } catch (error) {
    yield put(sendCodeResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchSendCodeSaga() {
  yield takeEvery(sendCode, sendCodeSaga);
}


function* createPersonalIdentificationSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.CreatePersonalIdentificationUrl, data.payload);

    yield put(createPersonalIdentificationResult(res));
  } catch (error) {
    yield put(createPersonalIdentificationResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchCreatePersonalIdentificationSaga() {
  yield takeEvery(createPersonalIdentification, createPersonalIdentificationSaga);
}


function* imgUploadSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.ImgUpLoadUrl, data.payload);

    yield put(imgUploadResult(res));
  } catch (error) {
    yield put(imgUploadResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchImgUploadSaga() {
  yield takeEvery(imgUpload, imgUploadSaga);
}

function* sendCodeCompanySaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.SendCodeUrl, data.payload);

    yield put(sendCodeCompanyResult(res));
  } catch (error) {
    yield put(sendCodeCompanyResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchSendCodeCompanySaga() {
  yield takeEvery(sendCodeCompany, sendCodeCompanySaga);
}


function* createCompanyIdentificationSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.CreateCompanyIdentificationUrl, data.payload);

    yield put(createCompanyIdentificationResult(res));
  } catch (error) {
    yield put(createCompanyIdentificationResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchCreateCompanyIdentificationSaga() {
  yield takeEvery(createCompanyIdentification, createCompanyIdentificationSaga);
}


function* getCurrentSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetCurrentUrl, data.payload);
    yield put(getCurrentResult(res));
  } catch (error) {
    yield put(getCurrentResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetCurrentSaga() {
  yield takeEvery(getCurrent, getCurrentSaga);
}


function* getAccountSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetAccountUrl, data.payload);

    yield put(getAccountResult(res));
  } catch (error) {
    yield put(getAccountResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetAccountSaga() {
  yield takeEvery(getAccount, getAccountSaga);
}


function* getSubAccountPermissionListExtendSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetSubAccountPermissionListExtendUrl, data.payload);
    res.Data.forEach(item => {
      if (item.IsAvailable) {
        item.link = Auth[item.Category];// eslint-disable-line no-param-reassign
      }
    });
    yield put(getSubAccountPermissionListExtendResult(res));
  } catch (error) {
    yield put(getSubAccountPermissionListExtendResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetSubAccountPermissionListExtendSaga() {
  yield takeEvery(getSubAccountPermissionListExtend, getSubAccountPermissionListExtendSaga);
}


function* logOutSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.LogOutUrl, data.payload);

    yield put(logOutResult(res));
  } catch (error) {
    yield put(logOutResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchLogOutSaga() {
  yield takeEvery(logOut, logOutSaga);
}


function* updateIdentificationSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.UpdateIdentificationUrl, data.payload);

    yield put(updateIdentificationResult(res));
  } catch (error) {
    yield put(updateIdentificationResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchUpdateIdentificationSaga() {
  yield takeEvery(updateIdentification, updateIdentificationSaga);
}


function* updateIdentificationCompanySaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.UpdateIdentificationUrl, data.payload);

    yield put(updateIdentificationCompanyResult(res));
  } catch (error) {
    yield put(updateIdentificationCompanyResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchUpdateIdentificationCompanySaga() {
  yield takeEvery(updateIdentificationCompany, updateIdentificationCompanySaga);
}
