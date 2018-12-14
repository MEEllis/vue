import React from 'react';
import { Provider } from 'react-redux'
import store from './store';
import PageRouters from './routers/PageRouters';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';


//如果不需要生命周期函数，就不需要写成一个组件的扩展，可以写成一个函数 
const App =()=>{
  return (
    <LocaleProvider locale={zhCN}>
      <Provider store={store}>
            <PageRouters></PageRouters>
      </Provider>
    </LocaleProvider>
  )
}

export  default App
