
import * as constants   from './constants'
import {fromJS} from 'immutable'

const defaultState=fromJS({
  inputIsFocused:false,
  searchList:[]
})

export default (state=defaultState,action)=>{
  switch(action.type){
    case constants.SEARCH_FOCUS:
        return state.set('inputIsFocused',true)
    case constants.SEARCH_bLUR:
        return state.set('inputIsFocused',false)
    case constants.LOAD_SEARCH_LIST:
        return state.set('searchList',action.data.get("data"))
    default:
      return state;
  }
}