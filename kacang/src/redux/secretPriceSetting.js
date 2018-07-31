import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { beginTask, endTask } from 'redux-nprogress';
import Api from '../config/api';

// beging not modify
const {
  getSecretPriceGroups, getSecretPriceGroupsResult,
  cleanGroups, cleanGroupsResult,
  setGroups, setGroupsResult,
  getAllSecretPriceGroups, getAllSecretPriceGroupsResult,
  getGroups, getGroupsResult,
  createSecretPriceGroup, createSecretPriceGroupResult,
  getSingleSecretPriceGroups, getSingleSecretPriceGroupsResult,
  getProductListPriceGroups, getProductListPriceGroupsResult,
  getSecretPriceFromProductidPriceGroups, getSecretPriceFromProductidPriceGroupsResult,
  getSecretPriceFromProductidPriceProduct, getSecretPriceFromProductidPriceProductResult,
  cleanSecretPrice, cleanSecretPriceResult,
  setSecretPrice, setSecretPriceResult,
  getProductListPriceProducts, getProductListPriceProductsResult,
  getSingleSecretPriceGroupsProduct, getSingleSecretPriceGroupsProductResult,
  getAllSecretPriceGroupsProduct, getAllSecretPriceGroupsProductResult,
  getDetailsFromGroupId, getDetailsFromGroupIdResult,
  setSecretPriceGroup, setSecretPriceGroupResult,
  cleanSecretPriceGroup, cleanSecretPriceGroupResult,
  getSecretPriceGroupsDealers, getSecretPriceGroupsDealersResult,
  stasticSecretPriceGroup, stasticSecretPriceGroupResult,
  deleteSecretGroup, deleteSecretGroupResult,
  setSecretGroup, setSecretGroupResult,
  setSecretpriceAndPrice, setSecretpriceAndPriceResult,
  setSecretPriceAndPriceGroup, setSecretPriceAndPriceGroupResult
} = createActions('GET_SECRET_PRICE_GROUPS', 'GET_SECRET_PRICE_GROUPS_RESULT',
    'CLEAN_GROUPS', 'CLEAN_GROUPS_RESULT',
    'SET_GROUPS', 'SET_GROUPS_RESULT',
    'GET_ALL_SECRET_PRICE_GROUPS', 'GET_ALL_SECRET_PRICE_GROUPS_RESULT',
    'GET_GROUPS', 'GET_GROUPS_RESULT',
    'CREATE_SECRET_PRICE_GROUP', 'CREATE_SECRET_PRICE_GROUP_RESULT',
    'GET_SINGLE_SECRET_PRICE_GROUPS', 'GET_SINGLE_SECRET_PRICE_GROUPS_RESULT',
    'GET_PRODUCT_LIST_PRICE_GROUPS', 'GET_PRODUCT_LIST_PRICE_GROUPS_RESULT',
    'GET_SECRET_PRICE_FROM_PRODUCTID_PRICE_GROUPS', 'GET_SECRET_PRICE_FROM_PRODUCTID_PRICE_GROUPS_RESULT',
    'GET_SECRET_PRICE_FROM_PRODUCTID_PRICE_PRODUCT', 'GET_SECRET_PRICE_FROM_PRODUCTID_PRICE_PRODUCT_RESULT',
    'CLEAN_SECRET_PRICE', 'CLEAN_SECRET_PRICE_RESULT',
    'SET_SECRET_PRICE', 'SET_SECRET_PRICE_RESULT',
    'GET_PRODUCT_LIST_PRICE_PRODUCTS', 'GET_PRODUCT_LIST_PRICE_PRODUCTS_RESULT',
    'GET_SINGLE_SECRET_PRICE_GROUPS_PRODUCT', 'GET_SINGLE_SECRET_PRICE_GROUPS_PRODUCT_RESULT',
    'GET_ALL_SECRET_PRICE_GROUPS_PRODUCT', 'GET_ALL_SECRET_PRICE_GROUPS_PRODUCT_RESULT',
    'GET_DETAILS_FROM_GROUP_ID', 'GET_DETAILS_FROM_GROUP_ID_RESULT',
    'SET_SECRET_PRICE_GROUP', 'SET_SECRET_PRICE_GROUP_RESULT',
    'CLEAN_SECRET_PRICE_GROUP', 'CLEAN_SECRET_PRICE_GROUP_RESULT',
    'GET_SECRET_PRICE_GROUPS_DEALERS', 'GET_SECRET_PRICE_GROUPS_DEALERS_RESULT',
    'STASTIC_SECRET_PRICE_GROUP', 'STASTIC_SECRET_PRICE_GROUP_RESULT',
    'DELETE_SECRET_GROUP', 'DELETE_SECRET_GROUP_RESULT',
    'SET_SECRET_GROUP', 'SET_SECRET_GROUP_RESULT',
    'SET_SECRETPRICE_AND_PRICE', 'SET_SECRETPRICE_AND_PRICE_RESULT',
    'SET_SECRET_PRICE_AND_PRICE_GROUP', 'SET_SECRET_PRICE_AND_PRICE_GROUP_RESULT');

export { getSecretPriceGroups, cleanGroups, setGroups, getAllSecretPriceGroups, getGroups, createSecretPriceGroup, getSingleSecretPriceGroups, getProductListPriceGroups, getSecretPriceFromProductidPriceGroups, getSecretPriceFromProductidPriceProduct, cleanSecretPrice, setSecretPrice, getProductListPriceProducts, getSingleSecretPriceGroupsProduct, getAllSecretPriceGroupsProduct, getDetailsFromGroupId, setSecretPriceGroup, cleanSecretPriceGroup, getSecretPriceGroupsDealers, stasticSecretPriceGroup, deleteSecretGroup, setSecretGroup, setSecretpriceAndPrice, setSecretPriceAndPriceGroup };

export default handleActions({
  GET_SECRET_PRICE_GROUPS: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_SECRET_PRICE_GROUPS_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getSecretPriceGroupsResult: action.payload
  }),
  CLEAN_GROUPS: (state) => ({
    ...state,
    isfetching: true
  }),
  CLEAN_GROUPS_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    cleanGroupsResult: action.payload
  }),
  SET_GROUPS: (state) => ({
    ...state,
    isfetching: true
  }),
  SET_GROUPS_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    setGroupsResult: action.payload
  }),
  GET_ALL_SECRET_PRICE_GROUPS: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_ALL_SECRET_PRICE_GROUPS_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getAllSecretPriceGroupsResult: action.payload
  }),
  GET_GROUPS: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_GROUPS_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getGroupsResult: action.payload
  }),
  CREATE_SECRET_PRICE_GROUP: (state) => ({
    ...state,
    isfetching: true
  }),
  CREATE_SECRET_PRICE_GROUP_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    createSecretPriceGroupResult: action.payload
  }),
  GET_SINGLE_SECRET_PRICE_GROUPS: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_SINGLE_SECRET_PRICE_GROUPS_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getSingleSecretPriceGroupsResult: action.payload
  }),
  GET_PRODUCT_LIST_PRICE_GROUPS: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_PRODUCT_LIST_PRICE_GROUPS_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getProductListPriceGroupsResult: action.payload
  }),
  GET_SECRET_PRICE_FROM_PRODUCTID_PRICE_GROUPS: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_SECRET_PRICE_FROM_PRODUCTID_PRICE_GROUPS_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getSecretPriceFromProductidPriceGroupsResult: action.payload
  }),
  GET_SECRET_PRICE_FROM_PRODUCTID_PRICE_PRODUCT: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_SECRET_PRICE_FROM_PRODUCTID_PRICE_PRODUCT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getSecretPriceFromProductidPriceProductResult: action.payload
  }),
  CLEAN_SECRET_PRICE: (state) => ({
    ...state,
    isfetching: true
  }),
  CLEAN_SECRET_PRICE_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    cleanSecretPriceResult: action.payload
  }),
  SET_SECRET_PRICE: (state) => ({
    ...state,
    isfetching: true
  }),
  SET_SECRET_PRICE_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    setSecretPriceResult: action.payload
  }),
  GET_PRODUCT_LIST_PRICE_PRODUCTS: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_PRODUCT_LIST_PRICE_PRODUCTS_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getProductListPriceProductsResult: action.payload
  }),
  GET_SINGLE_SECRET_PRICE_GROUPS_PRODUCT: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_SINGLE_SECRET_PRICE_GROUPS_PRODUCT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getSingleSecretPriceGroupsProductResult: action.payload
  }),
  GET_ALL_SECRET_PRICE_GROUPS_PRODUCT: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_ALL_SECRET_PRICE_GROUPS_PRODUCT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getAllSecretPriceGroupsProductResult: action.payload
  }),
  GET_DETAILS_FROM_GROUP_ID: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_DETAILS_FROM_GROUP_ID_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getDetailsFromGroupIdResult: action.payload
  }),
  SET_SECRET_PRICE_GROUP: (state) => ({
    ...state,
    isfetching: true
  }),
  SET_SECRET_PRICE_GROUP_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    setSecretPriceGroupResult: action.payload
  }),
  CLEAN_SECRET_PRICE_GROUP: (state) => ({
    ...state,
    isfetching: true
  }),
  CLEAN_SECRET_PRICE_GROUP_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    cleanSecretPriceGroupResult: action.payload
  }),
  GET_SECRET_PRICE_GROUPS_DEALERS: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_SECRET_PRICE_GROUPS_DEALERS_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getSecretPriceGroupsDealersResult: action.payload
  }),
  STASTIC_SECRET_PRICE_GROUP: (state) => ({
    ...state,
    isfetching: true
  }),
  STASTIC_SECRET_PRICE_GROUP_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    stasticSecretPriceGroupResult: action.payload
  }),
  DELETE_SECRET_GROUP: (state) => ({
    ...state,
    isfetching: true
  }),
  DELETE_SECRET_GROUP_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    deleteSecretGroupResult: action.payload
  }),
  SET_SECRET_GROUP: (state) => ({
    ...state,
    isfetching: true
  }),
  SET_SECRET_GROUP_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    setSecretGroupResult: action.payload
  }),
  SET_SECRETPRICE_AND_PRICE: (state) => ({
    ...state,
    isfetching: true
  }),
  SET_SECRETPRICE_AND_PRICE_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    setSecretpriceAndPriceResult: action.payload
  }),
  SET_SECRET_PRICE_AND_PRICE_GROUP: (state) => ({
    ...state,
    isfetching: true
  }),
  SET_SECRET_PRICE_AND_PRICE_GROUP_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    setSecretPriceAndPriceGroupResult: action.payload
  })
}, {});
// ending not modify

function* getSecretPriceGroupsSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetSecretPriceGroupsURL, data.payload);

    yield put(getSecretPriceGroupsResult(res));
  } catch (error) {
    yield put(getSecretPriceGroupsResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetSecretPriceGroupsSaga() {
  yield takeEvery(getSecretPriceGroups, getSecretPriceGroupsSaga);
}


function* cleanGroupsSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.CleanGroupsURL, data.payload);

    yield put(cleanGroupsResult(res));
  } catch (error) {
    yield put(cleanGroupsResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchCleanGroupsSaga() {
  yield takeEvery(cleanGroups, cleanGroupsSaga);
}


function* setGroupsSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.SetGroupsURL, data.payload);

    yield put(setGroupsResult(res));
  } catch (error) {
    yield put(setGroupsResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchSetGroupsSaga() {
  yield takeEvery(setGroups, setGroupsSaga);
}


function* getAllSecretPriceGroupsSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetAllSecretPriceGroupsURL, data.payload);

    yield put(getAllSecretPriceGroupsResult(res));
  } catch (error) {
    yield put(getAllSecretPriceGroupsResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetAllSecretPriceGroupsSaga() {
  yield takeEvery(getAllSecretPriceGroups, getAllSecretPriceGroupsSaga);
}


function* getGroupsSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetGroupsURL, data.payload);

    yield put(getGroupsResult(res));
  } catch (error) {
    yield put(getGroupsResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetGroupsSaga() {
  yield takeEvery(getGroups, getGroupsSaga);
}


function* createSecretPriceGroupSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.CreateSecretPriceGroupURL, data.payload);

    yield put(createSecretPriceGroupResult(res));
  } catch (error) {
    yield put(createSecretPriceGroupResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchCreateSecretPriceGroupSaga() {
  yield takeEvery(createSecretPriceGroup, createSecretPriceGroupSaga);
}


function* getSingleSecretPriceGroupsSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetSingleSecretPriceGroupsURL, data.payload);

    yield put(getSingleSecretPriceGroupsResult(res));
  } catch (error) {
    yield put(getSingleSecretPriceGroupsResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetSingleSecretPriceGroupsSaga() {
  yield takeEvery(getSingleSecretPriceGroups, getSingleSecretPriceGroupsSaga);
}


function* getProductListPriceGroupsSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetProductListUrl, data.payload);

    yield put(getProductListPriceGroupsResult(res));
  } catch (error) {
    yield put(getProductListPriceGroupsResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetProductListPriceGroupsSaga() {
  yield takeEvery(getProductListPriceGroups, getProductListPriceGroupsSaga);
}

// 按组给密价 (根据商品得到密价)
function* getSecretPriceFromProductidPriceGroupsSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetSecretPriceFromProductIdUrl, data.payload);

    yield put(getSecretPriceFromProductidPriceGroupsResult(res));
  } catch (error) {
    yield put(getSecretPriceFromProductidPriceGroupsResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetSecretPriceFromProductidPriceGroupsSaga() {
  yield takeEvery(getSecretPriceFromProductidPriceGroups, getSecretPriceFromProductidPriceGroupsSaga);
}

// 按商品给密价 (根据商品得到密价)
function* getSecretPriceFromProductidPriceProductSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetSecretPriceFromProductIdUrl, data.payload);

    yield put(getSecretPriceFromProductidPriceProductResult(res));
  } catch (error) {
    yield put(getSecretPriceFromProductidPriceProductResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetSecretPriceFromProductidPriceProductSaga() {
  yield takeEvery(getSecretPriceFromProductidPriceProduct, getSecretPriceFromProductidPriceProductSaga);
}

function* setSecretPriceSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.SetSecretPriceUrl, data.payload);

    yield put(setSecretPriceResult(res));
  } catch (error) {
    yield put(setSecretPriceResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchSetSecretPriceSaga() {
  yield takeEvery(setSecretPrice, setSecretPriceSaga);
}

function* cleanSecretPriceSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.CleanSecretPriceUrl, data.payload);

    yield put(cleanSecretPriceResult(res));
  } catch (error) {
    yield put(cleanSecretPriceResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchCleanSecretPriceSaga() {
  yield takeEvery(cleanSecretPrice, cleanSecretPriceSaga);
}

function* getProductListPriceProductsSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetProductListUrl, data.payload);

    yield put(getProductListPriceProductsResult(res));
  } catch (error) {
    yield put(getProductListPriceProductsResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetProductListPriceProductsSaga() {
  yield takeEvery(getProductListPriceProducts, getProductListPriceProductsSaga);
}


function* getSingleSecretPriceGroupsProductSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetSingleSecretPriceGroupsURL, data.payload);

    yield put(getSingleSecretPriceGroupsProductResult(res));
  } catch (error) {
    yield put(getSingleSecretPriceGroupsProductResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetSingleSecretPriceGroupsProductSaga() {
  yield takeEvery(getSingleSecretPriceGroupsProduct, getSingleSecretPriceGroupsProductSaga);
}


function* getAllSecretPriceGroupsProductSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetAllSecretPriceGroupsURL, data.payload);

    yield put(getAllSecretPriceGroupsProductResult(res));
  } catch (error) {
    yield put(getAllSecretPriceGroupsProductResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetAllSecretPriceGroupsProductSaga() {
  yield takeEvery(getAllSecretPriceGroupsProduct, getAllSecretPriceGroupsProductSaga);
}


function* getDetailsFromGroupIdSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetDetailsFromGroupIdUrl, data.payload);

    yield put(getDetailsFromGroupIdResult(res));
  } catch (error) {
    yield put(getDetailsFromGroupIdResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetDetailsFromGroupIdSaga() {
  yield takeEvery(getDetailsFromGroupId, getDetailsFromGroupIdSaga);
}


function* setSecretPriceGroupSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.SetSecretPriceUrl, data.payload);

    yield put(setSecretPriceGroupResult(res));
  } catch (error) {
    yield put(setSecretPriceGroupResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchSetSecretPriceGroupSaga() {
  yield takeEvery(setSecretPriceGroup, setSecretPriceGroupSaga);
}


function* cleanSecretPriceGroupSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.CleanSecretPriceUrl, data.payload);

    yield put(cleanSecretPriceGroupResult(res));
  } catch (error) {
    yield put(cleanSecretPriceGroupResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchCleanSecretPriceGroupSaga() {
  yield takeEvery(cleanSecretPriceGroup, cleanSecretPriceGroupSaga);
}


function* getSecretPriceGroupsDealersSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetSecretPriceGroupsDealersUrl, data.payload);

    yield put(getSecretPriceGroupsDealersResult(res));
  } catch (error) {
    yield put(getSecretPriceGroupsDealersResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetSecretPriceGroupsDealersSaga() {
  yield takeEvery(getSecretPriceGroupsDealers, getSecretPriceGroupsDealersSaga);
}


function* stasticSecretPriceGroupSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.StasticSecretPriceGroupUrl, data.payload);

    yield put(stasticSecretPriceGroupResult(res));
  } catch (error) {
    yield put(stasticSecretPriceGroupResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchStasticSecretPriceGroupSaga() {
  yield takeEvery(stasticSecretPriceGroup, stasticSecretPriceGroupSaga);
}


function* deleteSecretGroupSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.DeleteSecretGroupUrl, data.payload);

    yield put(deleteSecretGroupResult(res));
  } catch (error) {
    yield put(deleteSecretGroupResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchDeleteSecretGroupSaga() {
  yield takeEvery(deleteSecretGroup, deleteSecretGroupSaga);
}


function* setSecretGroupSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.SetSecretGroupUrl, data.payload);

    yield put(setSecretGroupResult(res));
  } catch (error) {
    yield put(setSecretGroupResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchSetSecretGroupSaga() {
  yield takeEvery(setSecretGroup, setSecretGroupSaga);
}


function* setSecretpriceAndPriceSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.SetSecretPriceAndPriceUrl, data.payload);

    yield put(setSecretpriceAndPriceResult(res));
  } catch (error) {
    yield put(setSecretpriceAndPriceResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchSetSecretpriceAndPriceSaga() {
  yield takeEvery(setSecretpriceAndPrice, setSecretpriceAndPriceSaga);
}


function* setSecretPriceAndPriceGroupSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.SetSecretPriceAndPriceUrl, data.payload);

    yield put(setSecretPriceAndPriceGroupResult(res));
  } catch (error) {
    yield put(setSecretPriceAndPriceGroupResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchSetSecretPriceAndPriceGroupSaga() {
  yield takeEvery(setSecretPriceAndPriceGroup, setSecretPriceAndPriceGroupSaga);
}
