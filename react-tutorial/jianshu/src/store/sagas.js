import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {constants,acitonCreators}  from '../common/Header/store'
import axios from 'axios'


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
   try {
      const action = acitonCreators.loadSearchList({data:['投稿','手帐','书法','PPT','穿搭','打碗碗花','打碗碗','打碗',]})
      yield put(action);
   } catch (e) {
   }
    console.log('abc')
}

function* getSearchList() {
  yield takeEvery(constants.REQUEST_SEARCH_LIST, fetchUser);
}



export default getSearchList;