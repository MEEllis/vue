// 这个js 需要返回一个函数


const defaultState={
    inputValue:'',
    list:[]
}

export default (state=defaultState,action)=>{
    if(action.type==='change_input_value'){
        const newState= JSON.parse(JSON.stringify(state))
        newState.inputValue=action.value
        return newState
    }
    else if(action.type==='add_todo_item'){
        const newState= JSON.parse(JSON.stringify(state))
        newState.list.push(newState.inputValue)
        newState.inputValue= ''
        return newState
    } else if(action.type==='del_todo_item'){
        const newState= JSON.parse(JSON.stringify(state))
        newState.list.splice(action.value,1)
        return newState
    }
    return state
}