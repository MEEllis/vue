P18: React 生命周期函数
1. Initialization(初始化，setup props and state)   
2. Mounting (挂载) [componentWillMount,render,componentDidMount]
3. Updation (修改状态 props , state):
  props: componentWillReceiveProps-->shouldComponentUpdate-->componentWillUpdate-->render-->componentDidUpdate
  state: shouldComponentUpdate-->componentWillUpdate-->render-->componentDidUpdate

4. Unmounting (卸载)[componentWillUnmount]
