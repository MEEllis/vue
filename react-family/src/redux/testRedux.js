// 这个js 是调用者 


//现在所有的代码写在一个js中

// Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。
// Redux 提供createStore这个函数，用来生成 Store。
import {createStore} from 'redux'


var store = createStore(
    function (state = 0, action) {
        switch (action.type) {
            case "counter/INCREMENT":
                return state + 1
            default:
                return state
        
        }
    }
)

//action  
let increment={
    type:"counter/INCREMENT",
    desc:'新增操作'  
}

console.log(store.getState())
store.dispatch(increment);
console.log(store.getState())