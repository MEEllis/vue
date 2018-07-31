import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { beginTask, endTask } from 'redux-nprogress';
import Api from '../config/api';

// beging not modify
const {
  getProductTpl, getProductTplResult
} = createActions('GET_PRODUCT_TPL', 'GET_PRODUCT_TPL_RESULT');

export { getProductTpl };

export default handleActions({
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

function* getProductTplSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.GetProductctTplUrl, data.payload);
    let datas = res.Data, labelName = '';
    for (let k in datas.m_Item1.Items) {
        labelName = datas.m_Item1.Items[k].Title;
        switch (labelName) {
            case '数量':
                datas.m_Item1.Items[k].TagName = 'TopupCount';
                break;
            case '充值账号':
                datas.m_Item1.Items[k].TagName = 'TopupAccount';
                break;
            case '密码框':
                datas.m_Item1.Items[k].TagName = 'CahrgeRemark';
                break;
        }
    }
    yield put(getProductTplResult(datas));
  } catch (error) {
    yield put(getProductTplResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetProductTplSaga() {
  yield takeEvery(getProductTpl, getProductTplSaga);
}
