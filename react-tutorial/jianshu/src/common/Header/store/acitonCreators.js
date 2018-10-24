// action 
import {SEARCH_FOCUS,SEARCH_bLUR,REQUEST_SEARCH_LIST,LOAD_SEARCH_LIST} from './constants'
import {fromJS} from 'immutable'

export const searchFocus=()=>{
   return {
     type:SEARCH_FOCUS
   }
}

export const searchBlur=()=>{
  return {
    type:SEARCH_bLUR
  }
}

export const requestSearchList=()=>{
  return  {
    type:REQUEST_SEARCH_LIST,
  }
}

export const loadSearchList=(data)=>{
  return  {
    type:LOAD_SEARCH_LIST,
    data:fromJS(data),
  }
}