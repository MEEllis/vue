import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { beginTask, endTask } from 'redux-nprogress';
import Api from '../config/api';

// beging not modify
const {
  getProductlist, getProductlistResult,
  shelvedProduct, shelvedProductResult,
  unshelvedProduct, unshelvedProductResult,
  deleteProduct, deleteProductResult,
  updateProductPrice, updateProductPriceResult,
  updateProductName, updateProductNameResult,
  batchDeleteProduct, batchDeleteProductResult
} = createActions('GET_PRODUCTLIST', 'GET_PRODUCTLIST_RESULT',
    'SHELVED_PRODUCT', 'SHELVED_PRODUCT_RESULT',
    'UNSHELVED_PRODUCT', 'UNSHELVED_PRODUCT_RESULT',
    'DELETE_PRODUCT', 'DELETE_PRODUCT_RESULT',
    'UPDATE_PRODUCT_PRICE', 'UPDATE_PRODUCT_PRICE_RESULT',
    'UPDATE_PRODUCT_NAME', 'UPDATE_PRODUCT_NAME_RESULT',
    'BATCH_DELETE_PRODUCT', 'BATCH_DELETE_PRODUCT_RESULT');

export { getProductlist, shelvedProduct, unshelvedProduct, deleteProduct, updateProductPrice, updateProductName, batchDeleteProduct };

export default handleActions({
  GET_PRODUCTLIST: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_PRODUCTLIST_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getProductlistResult: action.payload
  }),
  SHELVED_PRODUCT: (state) => ({
    ...state,
    isfetching: true
  }),
  SHELVED_PRODUCT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    shelvedProductResult: action.payload
  }),
  UNSHELVED_PRODUCT: (state) => ({
    ...state,
    isfetching: true
  }),
  UNSHELVED_PRODUCT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    unshelvedProductResult: action.payload
  }),
  DELETE_PRODUCT: (state) => ({
    ...state,
    isfetching: true
  }),
  DELETE_PRODUCT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    deleteProductResult: action.payload
  }),
  UPDATE_PRODUCT_PRICE: (state) => ({
    ...state,
    isfetching: true
  }),
  UPDATE_PRODUCT_PRICE_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    updateProductPriceResult: action.payload
  }),
  UPDATE_PRODUCT_NAME: (state) => ({
    ...state,
    isfetching: true
  }),
  UPDATE_PRODUCT_NAME_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    updateProductNameResult: action.payload
  }),
  BATCH_DELETE_PRODUCT: (state) => ({
    ...state,
    isfetching: true
  }),
  BATCH_DELETE_PRODUCT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    batchDeleteProductResult: action.payload
  })
}, {});
// ending not modify

function* getProductlistSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetProductListUrl, data.payload);

    yield put(getProductlistResult(res));
  } catch (error) {
    yield put(getProductlistResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetProductlistSaga() {
  yield takeEvery(getProductlist, getProductlistSaga);
}


function* shelvedProductSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.ShelvedProductUrl, data.payload);

    yield put(shelvedProductResult(res));
  } catch (error) {
    yield put(shelvedProductResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchShelvedProductSaga() {
  yield takeEvery(shelvedProduct, shelvedProductSaga);
}


function* unshelvedProductSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.UnshelvedProductUrl, data.payload);

    yield put(unshelvedProductResult(res));
  } catch (error) {
    yield put(unshelvedProductResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchUnshelvedProductSaga() {
  yield takeEvery(unshelvedProduct, unshelvedProductSaga);
}


function* deleteProductSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.DeleteProductUrl, data.payload);

    yield put(deleteProductResult(res));
  } catch (error) {
    yield put(deleteProductResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchDeleteProductSaga() {
  yield takeEvery(deleteProduct, deleteProductSaga);
}


function* updateProductPriceSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.UpdateProductPriceUrl, data.payload);

    yield put(updateProductPriceResult(res));
  } catch (error) {
    yield put(updateProductPriceResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchUpdateProductPriceSaga() {
  yield takeEvery(updateProductPrice, updateProductPriceSaga);
}


function* updateProductNameSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.UpdateProductNameUrl, data.payload);

    yield put(updateProductNameResult(res));
  } catch (error) {
    yield put(updateProductNameResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchUpdateProductNameSaga() {
  yield takeEvery(updateProductName, updateProductNameSaga);
}


function* batchDeleteProductSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.BatchDeleteProductUrl, data.payload);

    yield put(batchDeleteProductResult(res));
  } catch (error) {
    yield put(batchDeleteProductResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchBatchDeleteProductSaga() {
  yield takeEvery(batchDeleteProduct, batchDeleteProductSaga);
}
