import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { beginTask, endTask } from 'redux-nprogress';
import Api from '../config/api';

// beging not modify
const {
  getProductdetail, getProductdetailResult,
  getSubcategoryListThree, getSubcategoryListThreeResult,
  getSubcategoryListTwo, getSubcategoryListTwoResult,
  getSubcategoryList, getSubcategoryListResult,
  getSubcategoryListFour, getSubcategoryListFourResult,
  getParentCategories, getParentCategoriesResult,
  createProduct, createProductResult,
  updateProduct, updateProductResult,
  getTemplateList, getTemplateListResult,
  getSingTemplate, getSingTemplateResult,
} = createActions('GET_PRODUCTDETAIL', 'GET_PRODUCTDETAIL_RESULT',
    'GET_SUBCATEGORY_LIST_THREE', 'GET_SUBCATEGORY_LIST_THREE_RESULT',
    'GET_SUBCATEGORY_LIST_TWO', 'GET_SUBCATEGORY_LIST_TWO_RESULT',
    'GET_SUBCATEGORY_LIST', 'GET_SUBCATEGORY_LIST_RESULT',
    'GET_SUBCATEGORY_LIST_FOUR', 'GET_SUBCATEGORY_LIST_FOUR_RESULT',
    'GET_PARENT_CATEGORIES', 'GET_PARENT_CATEGORIES_RESULT',
    'CREATE_PRODUCT', 'CREATE_PRODUCT_RESULT',
    'UPDATE_PRODUCT', 'UPDATE_PRODUCT_RESULT',
    'GET_TEMPLATE_LIST', 'GET_TEMPLATE_LIST_RESULT',
    'GET_SING_TEMPLATE', 'GET_SING_TEMPLATE_RESULT');

export { getProductdetail, getSubcategoryListThree, getSubcategoryListTwo, getSubcategoryList, getSubcategoryListFour, getParentCategories, createProduct, updateProduct, getTemplateList, getSingTemplate };

export default handleActions({
  GET_PRODUCTDETAIL: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_PRODUCTDETAIL_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getProductdetailResult: action.payload
  }),
  GET_SUBCATEGORY_LIST_THREE: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_SUBCATEGORY_LIST_THREE_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getSubcategoryListThreeResult: action.payload
  }),
  GET_SUBCATEGORY_LIST_TWO: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_SUBCATEGORY_LIST_TWO_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getSubcategoryListTwoResult: action.payload
  }),
  GET_SUBCATEGORY_LIST: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_SUBCATEGORY_LIST_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getSubcategoryListResult: action.payload
  }),
  GET_SUBCATEGORY_LIST_FOUR: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_SUBCATEGORY_LIST_FOUR_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getSubcategoryListFourResult: action.payload
  }),
  GET_PARENT_CATEGORIES: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_PARENT_CATEGORIES_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getParentCategoriesResult: action.payload
  }),
  CREATE_PRODUCT: (state) => ({
    ...state,
    isfetching: true
  }),
  CREATE_PRODUCT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    createProductResult: action.payload
  }),
  UPDATE_PRODUCT: (state) => ({
    ...state,
    isfetching: true
  }),
  UPDATE_PRODUCT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    updateProductResult: action.payload
  }),
  GET_TEMPLATE_LIST: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_TEMPLATE_LIST_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getTemplateListResult: action.payload
  }),
  GET_SING_TEMPLATE: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_SING_TEMPLATE_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getSingTemplateResult: action.payload
  }),
  GET_PRODUCT_TPL: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_PRODUCT_TPL_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getProductTplResult: action.payload
  })
}, {});
// ending not modify

function* getProductdetailSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetProductdetailUrl, data.payload);

    yield put(getProductdetailResult(res));
  } catch (error) {
    yield put(getProductdetailResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetProductdetailSaga() {
  yield takeEvery(getProductdetail, getProductdetailSaga);
}


function* getSubcategoryListThreeSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetSubCategoryListUrl, data.payload);

    yield put(getSubcategoryListThreeResult(res));
  } catch (error) {
    yield put(getSubcategoryListThreeResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetSubcategoryListThreeSaga() {
  yield takeEvery(getSubcategoryListThree, getSubcategoryListThreeSaga);
}


function* getSubcategoryListTwoSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetSubCategoryListUrl, data.payload);

    yield put(getSubcategoryListTwoResult(res));
  } catch (error) {
    yield put(getSubcategoryListTwoResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetSubcategoryListTwoSaga() {
  yield takeEvery(getSubcategoryListTwo, getSubcategoryListTwoSaga);
}


function* getSubcategoryListSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetSubCategoryListUrl, data.payload);

    yield put(getSubcategoryListResult(res));
  } catch (error) {
    yield put(getSubcategoryListResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetSubcategoryListSaga() {
  yield takeEvery(getSubcategoryList, getSubcategoryListSaga);
}


function* getSubcategoryListFourSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetSubCategoryListUrl, data.payload);

    yield put(getSubcategoryListFourResult(res));
  } catch (error) {
    yield put(getSubcategoryListFourResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetSubcategoryListFourSaga() {
  yield takeEvery(getSubcategoryListFour, getSubcategoryListFourSaga);
}


function* getParentCategoriesSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetParentCategoriesUrl, data.payload);

    yield put(getParentCategoriesResult(res));
  } catch (error) {
    yield put(getParentCategoriesResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetParentCategoriesSaga() {
  yield takeEvery(getParentCategories, getParentCategoriesSaga);
}


function* createProductSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.CreateProductUrl, data.payload);

    yield put(createProductResult(res));
  } catch (error) {
    yield put(createProductResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchCreateProductSaga() {
  yield takeEvery(createProduct, createProductSaga);
}




function* updateProductSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.UpdateProductUrl, data.payload);

    yield put(updateProductResult(res));
  } catch (error) {
    yield put(updateProductResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchUpdateProductSaga() {
  yield takeEvery(updateProduct, updateProductSaga);
}


function* getTemplateListSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetTemplateListUrl, data.payload);

    yield put(getTemplateListResult(res));
  } catch (error) {
    yield put(getTemplateListResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetTemplateListSaga() {
  yield takeEvery(getTemplateList, getTemplateListSaga);
}


function* getSingTemplateSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetSingleTemplateUrl, data.payload);

    yield put(getSingTemplateResult(res));
  } catch (error) {
    yield put(getSingTemplateResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetSingTemplateSaga() {
  yield takeEvery(getSingTemplate, getSingTemplateSaga);
}
