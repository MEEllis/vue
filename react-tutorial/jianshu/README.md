虚拟DOM：
1. 数据（state,props）
2. JSX （模板）
3. 根据 数据和 JSX 生成 虚拟DOM （js对象）
3. 根据虚拟DOM生成 真实DOM
4. 数据发生改变
5. 根据 数据和 JSX 生成 虚拟DOM （js对象）
6. 对比两次的虚拟DOM（同级比较，如果不一样，替换这个节点下的所有节点）,分析不同的地方，更新不同的地方， 生成真实的dom 
优点：
1. 性能提升，
2. 他是的跨端应用得以实现。 虚拟DOM 解释成相对应的 原生组件 。 React Native

 React 生命周期函数(P18)
1. Initialization(初始化，setup props and state)   
2. Mounting (挂载) [componentWillMount,render,componentDidMount]
3. Updation (修改状态 props , state):
  props: componentWillReceiveProps-->shouldComponentUpdate-->componentWillUpdate-->render-->componentDidUpdate
  state: shouldComponentUpdate-->componentWillUpdate-->render-->componentDidUpdate
4. Unmounting (卸载)[componentWillUnmount]


Redux： 数据管理模块          【redux 本身只能解析对象】
原则：
1. 唯一性
2. 只有store能够改变自己的内容
3. reduces必须是纯函数 （解释：给固定的输入，就有一定固定的输出，而且不会有任何副作用）
核心API：
createStore
store.dispatch     执行active   
store.getState     获取数据
store.subscribe    订阅 数据发放改变
combineReducers    合并多个reduces

redux-thunk :  redux 的中间件， 对 redux扩展，增加了接受函数的能力(异步执行的能力)，  redux 本身只能解析对象，无法解析函数，详情请看 actionCreator.js
redux-saga :  redux 的中间件， 对 redux扩展，异步执行的能力

react-redux ：
核心API：
Provider:   Provider 下的组件 共享 store的数据
connect：   组件和 store 做连接 

immutable.js：（数据的不可变性的库）


redux-devtools-extension：（redux 的调试库）

