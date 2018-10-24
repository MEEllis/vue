import {CHANGE_INPUT_VALUE,ADD_TODO_ITEM,DEL_TODO_ITEM} from './actionTypes'

export const getInputChange =(value)=>{
    return {
        type:CHANGE_INPUT_VALUE,
        value,
    }
}

export const getAddItem =()=>{
    return {
        type:ADD_TODO_ITEM
    }
}

export const getDelItem =(value)=>{
    return {
        type:DEL_TODO_ITEM,
        value,
    }
}