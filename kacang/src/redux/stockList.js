import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { beginTask, endTask } from 'redux-nprogress';
import Api from '../config/api';

// beging not modify
const {
  createStock, createStockResult,
  getStockList, getStockListResult,
  deleteStock, deleteStockResult,
  getZoneStocklist, getZoneStocklistResult,
  updateStock, updateStockResult,
  createPasswordCard, createPasswordCardResult,
  getRelationStocklist, getRelationStocklistResult,
  getUnrelationStocklist, getUnrelationStocklistResult,
  deleteRelationstock, deleteRelationstockResult,
  getPreviewPwdCard, getPreviewPwdCardResult,
  importPwdCard, importPwdCardResult,
  updatePrepaidCard, updatePrepaidCardResult,
  getStocklistImportzone, getStocklistImportzoneResult,
  relationStockImportzone, relationStockImportzoneResult,
  deleteRelationStockImportZone, deleteRelationStockImportZoneResult,
  updateRelationStockPriority, updateRelationStockPriorityResult,
  relationStock, relationStockResult,
  getPwdcardList, getPwdcardListResult,
  getStockDetail, getStockDetailResult,
  getDockStockList, getDockStockListResult
} = createActions('CREATE_STOCK', 'CREATE_STOCK_RESULT',
    'GET_STOCK_LIST', 'GET_STOCK_LIST_RESULT',
    'DELETE_STOCK', 'DELETE_STOCK_RESULT',
    'GET_ZONE_STOCKLIST', 'GET_ZONE_STOCKLIST_RESULT',
    'UPDATE_STOCK', 'UPDATE_STOCK_RESULT',
    'CREATE_PASSWORD_CARD', 'CREATE_PASSWORD_CARD_RESULT',
    'GET_RELATION_STOCKLIST', 'GET_RELATION_STOCKLIST_RESULT',
    'GET_UNRELATION_STOCKLIST', 'GET_UNRELATION_STOCKLIST_RESULT',
    'DELETE_RELATIONSTOCK', 'DELETE_RELATIONSTOCK_RESULT',
    'GET_PREVIEW_PWD_CARD', 'GET_PREVIEW_PWD_CARD_RESULT',
    'IMPORT_PWD_CARD', 'IMPORT_PWD_CARD_RESULT',
    'UPDATE_PREPAID_CARD', 'UPDATE_PREPAID_CARD_RESULT',
    'GET_STOCKLIST_IMPORTZONE', 'GET_STOCKLIST_IMPORTZONE_RESULT',
    'RELATION_STOCK_IMPORTZONE', 'RELATION_STOCK_IMPORTZONE_RESULT',
    'DELETE_RELATION_STOCK_IMPORT_ZONE', 'DELETE_RELATION_STOCK_IMPORT_ZONE_RESULT',
    'UPDATE_RELATION_STOCK_PRIORITY', 'UPDATE_RELATION_STOCK_PRIORITY_RESULT',
    'RELATION_STOCK', 'RELATION_STOCK_RESULT',
    'GET_PWDCARD_LIST', 'GET_PWDCARD_LIST_RESULT',
    'GET_STOCK_DETAIL', 'GET_STOCK_DETAIL_RESULT',
    'GET_DOCK_STOCK_LIST', 'GET_DOCK_STOCK_LIST_RESULT');

export { createStock, getStockList, deleteStock, getZoneStocklist, updateStock, createPasswordCard, getRelationStocklist, getUnrelationStocklist, deleteRelationstock, getPreviewPwdCard, importPwdCard, updatePrepaidCard, getStocklistImportzone, relationStockImportzone, deleteRelationStockImportZone, updateRelationStockPriority, relationStock, getPwdcardList, getStockDetail, getDockStockList };

export default handleActions({
  CREATE_STOCK: (state) => ({
    ...state,
    isfetching: true
  }),
  CREATE_STOCK_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    createStockResult: action.payload
  }),
  GET_STOCK_LIST: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_STOCK_LIST_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getStockListResult: action.payload
  }),
  DELETE_STOCK: (state) => ({
    ...state,
    isfetching: true
  }),
  DELETE_STOCK_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    deleteStockResult: action.payload
  }),
  GET_ZONE_STOCKLIST: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_ZONE_STOCKLIST_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getZoneStocklistResult: action.payload
  }),
  UPDATE_STOCK: (state) => ({
    ...state,
    isfetching: true
  }),
  UPDATE_STOCK_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    updateStockResult: action.payload
  }),
  CREATE_PASSWORD_CARD: (state) => ({
    ...state,
    isfetching: true
  }),
  CREATE_PASSWORD_CARD_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    createPasswordCardResult: action.payload
  }),
  GET_RELATION_STOCKLIST: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_RELATION_STOCKLIST_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getRelationStocklistResult: action.payload
  }),
  GET_UNRELATION_STOCKLIST: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_UNRELATION_STOCKLIST_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getUnrelationStocklistResult: action.payload
  }),
  DELETE_RELATIONSTOCK: (state) => ({
    ...state,
    isfetching: true
  }),
  DELETE_RELATIONSTOCK_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    deleteRelationstockResult: action.payload
  }),
  GET_PREVIEW_PWD_CARD: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_PREVIEW_PWD_CARD_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getPreviewPwdCardResult: action.payload
  }),
  IMPORT_PWD_CARD: (state) => ({
    ...state,
    isfetching: true
  }),
  IMPORT_PWD_CARD_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    importPwdCardResult: action.payload
  }),
  UPDATE_PREPAID_CARD: (state) => ({
    ...state,
    isfetching: true
  }),
  UPDATE_PREPAID_CARD_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    updatePrepaidCardResult: action.payload
  }),
  GET_STOCKLIST_IMPORTZONE: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_STOCKLIST_IMPORTZONE_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getStocklistImportzoneResult: action.payload
  }),
  RELATION_STOCK_IMPORTZONE: (state) => ({
    ...state,
    isfetching: true
  }),
  RELATION_STOCK_IMPORTZONE_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    relationStockImportzoneResult: action.payload
  }),
  DELETE_RELATION_STOCK_IMPORT_ZONE: (state) => ({
    ...state,
    isfetching: true
  }),
  DELETE_RELATION_STOCK_IMPORT_ZONE_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    deleteRelationStockImportZoneResult: action.payload
  }),
  UPDATE_RELATION_STOCK_PRIORITY: (state) => ({
    ...state,
    isfetching: true
  }),
  UPDATE_RELATION_STOCK_PRIORITY_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    updateRelationStockPriorityResult: action.payload
  }),
  RELATION_STOCK: (state) => ({
    ...state,
    isfetching: true
  }),
  RELATION_STOCK_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    relationStockResult: action.payload
  }),
  GET_PWDCARD_LIST: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_PWDCARD_LIST_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getPwdcardListResult: action.payload
  }),
  GET_STOCK_DETAIL: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_STOCK_DETAIL_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getStockDetailResult: action.payload
  }),
  GET_DOCK_STOCK_LIST: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_DOCK_STOCK_LIST_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getDockStockListResult: action.payload
  })
}, {});
// ending not modify


// 添加库存
function* createStockSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.CreateStockUrl, data.payload);

    yield put(createStockResult(res));
  } catch (error) {
    yield put(createStockResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchCreateStockSaga() {
  yield takeEvery(createStock, createStockSaga);
}

// 库存列表
function* getStockListSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetstockListUrl, data.payload);

    yield put(getStockListResult(res));
  } catch (error) {
    yield put(getStockListResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetStockListSaga() {
  yield takeEvery(getStockList, getStockListSaga);
}

// 删除库存
function* deleteStockSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.DeleteStockUrl, data.payload);

    yield put(deleteStockResult(res));
  } catch (error) {
    yield put(deleteStockResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchDeleteStockSaga() {
  yield takeEvery(deleteStock, deleteStockSaga);
}

// 区域库存列表
function* getZoneStocklistSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetZoneStockListUrl, data.payload);

    yield put(getZoneStocklistResult(res));
  } catch (error) {
    yield put(getZoneStocklistResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetZoneStocklistSaga() {
  yield takeEvery(getZoneStocklist, getZoneStocklistSaga);
}

// 修改
function* updateStockSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.UpdateStockUrl, data.payload);

    yield put(updateStockResult(res));
  } catch (error) {
    yield put(updateStockResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchUpdateStockSaga() {
  yield takeEvery(updateStock, updateStockSaga);
}

// 新建预览卡密
function* createPasswordCardSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.CreatePwdCardUrl, data.payload);

    yield put(createPasswordCardResult(res));
  } catch (error) {
    yield put(createPasswordCardResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchCreatePasswordCardSaga() {
  yield takeEvery(createPasswordCard, createPasswordCardSaga);
}

// 查询已关联库存
function* getRelationStocklistSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetRelationStockListUrl, data.payload);

    yield put(getRelationStocklistResult(res));
  } catch (error) {
    yield put(getRelationStocklistResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetRelationStocklistSaga() {
  yield takeEvery(getRelationStocklist, getRelationStocklistSaga);
}

// 查询未关联库存
function* getUnrelationStocklistSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetUnRelationStockListUrl, data.payload);

    yield put(getUnrelationStocklistResult(res));
  } catch (error) {
    yield put(getUnrelationStocklistResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetUnrelationStocklistSaga() {
  yield takeEvery(getUnrelationStocklist, getUnrelationStocklistSaga);
}

// 删除关联库存
function* deleteRelationstockSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.DeleteRelationStockUrl, data.payload);

    yield put(deleteRelationstockResult(res));
  } catch (error) {
    yield put(deleteRelationstockResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchDeleteRelationstockSaga() {
  yield takeEvery(deleteRelationstock, deleteRelationstockSaga);
}

// 预览卡密
function* getPreviewPwdCardSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetPreviewPasswordCardUrl, data.payload);

    yield put(getPreviewPwdCardResult(res));
  } catch (error) {
    yield put(getPreviewPwdCardResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetPreviewPwdCardSaga() {
  yield takeEvery(getPreviewPwdCard, getPreviewPwdCardSaga);
}

// 导入卡密
function* importPwdCardSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.ImportPwdCardUrl, data.payload);

    yield put(importPwdCardResult(res));
  } catch (error) {
    yield put(importPwdCardResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchImportPwdCardSaga() {
  yield takeEvery(importPwdCard, importPwdCardSaga);
}

// 修改直储账号
function* updatePrepaidCardSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.UpdatePrepaidCardUrl, data.payload);

    yield put(updatePrepaidCardResult(res));
  } catch (error) {
    yield put(updatePrepaidCardResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchUpdatePrepaidCardSaga() {
  yield takeEvery(updatePrepaidCard, updatePrepaidCardSaga);
}

// 修改关联库存优先级
function* updateRelationStockPrioritySaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.UpdateRelationStockPriority, data.payload);

    yield put(updateRelationStockPriorityResult(res));
  } catch (error) {
    yield put(updateRelationStockPriorityResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchUpdateRelationStockPrioritySaga() {
  yield takeEvery(updateRelationStockPriority, updateRelationStockPrioritySaga);
}


// 关联库存
function* relationStockSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.RelationStockUrl, data.payload);

    yield put(relationStockResult(res));
  } catch (error) {
    yield put(relationStockResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchRelationStockSaga() {
  yield takeEvery(relationStock, relationStockSaga);
}

// 分页查询卡密列表
function* getPwdcardListSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetPwdCardUrl, data.payload);

    yield put(getPwdcardListResult(res));
  } catch (error) {
    yield put(getPwdcardListResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetPwdcardListSaga() {
  yield takeEvery(getPwdcardList, getPwdcardListSaga);
}


// 区域库存，获取分页查询库存
function* getStocklistImportzoneSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetstockListUrl, data.payload);

    yield put(getStocklistImportzoneResult(res));
  } catch (error) {
    yield put(getStocklistImportzoneResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetStocklistImportzoneSaga() {
  yield takeEvery(getStocklistImportzone, getStocklistImportzoneSaga);
}

// 区域库存，导入关联库存
function* relationStockImportzoneSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.RelationStockUrl, data.payload);

    yield put(relationStockImportzoneResult(res));
  } catch (error) {
    yield put(relationStockImportzoneResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchRelationStockImportzoneSaga() {
  yield takeEvery(relationStockImportzone, relationStockImportzoneSaga);
}

// 区域库存，删除关联库存
function* deleteRelationStockImportZoneSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.zoneStockDeleteRelationStock, data.payload);

    yield put(deleteRelationStockImportZoneResult(res));
  } catch (error) {
    yield put(deleteRelationStockImportZoneResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchDeleteRelationStockImportZoneSaga() {
  yield takeEvery(deleteRelationStockImportZone, deleteRelationStockImportZoneSaga);
}

// 区域库存 查看详情（直储账号列表）
function* getStockDetailSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetStockDetail, data.payload);

    yield put(getStockDetailResult(res));
  } catch (error) {
    yield put(getStockDetailResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetStockDetailSaga() {
  yield takeEvery(getStockDetail, getStockDetailSaga);
}


function* getDockStockListSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetDockStockListUrl, data.payload);

    yield put(getDockStockListResult(res));
  } catch (error) {
    yield put(getDockStockListResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetDockStockListSaga() {
  yield takeEvery(getDockStockList, getDockStockListSaga);
}
