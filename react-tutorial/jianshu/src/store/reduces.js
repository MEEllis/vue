import { combineReducers} from 'redux-immutable'
import {reduces as headerReduces} from '../common/Header/store'

export default combineReducers({
  header:headerReduces
})




