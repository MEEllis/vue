import 'babel-polyfill';
import moment from 'moment';
import React from 'react';
import { browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Perf from 'react-addons-perf'; // ES6
import { AppContainer } from 'react-hot-loader';
import axios from 'axios';
import isObject from 'lodash/isObject';
import { message } from 'antd';
import configs from 'configs';// eslint-disable-line
import App from './App';
import messageAlert from './config/messageAlert';

moment.locale('zh_cn');

// console.log(__DEV__);

axios.defaults.baseURL = configs.baseURL;

// if (process.env.NODE_ENV === 'development') {
//   // axios.defaults.baseURL = 'http://10.0.10.51:14003/';10.0.10.132:14003
//   axios.defaults.baseURL = configs.baseURL;
//   // axios.defaults.baseURL = 'http://10.0.10.132:14003/';
// } else {
//   axios.defaults.baseURL = 'http://115.29.168.166:14003/';
//   // axios.defaults.baseURL = 'http://10.0.10.140:14003/';
//   // axios.defaults.baseURL = 'http://10.0.10.132:14003/';
// }
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
// 获取登录的token


// axios.defaults.headers.token = token;

// axios.defaults.transformRequest = [(data) => {
//   console.log(data);
//   if (data && typeof data === 'object') {
//     return JSON.stringify(data);
//   }
//   return data;
// }];

axios.interceptors.request.use((config) => {
  const cfg = config;
  const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
  if (token) {
    cfg.headers.token = token;
  }
  // qs.stringify(data)
  return cfg;
}, (error) => (Promise.reject(error)));

axios.interceptors.response.use(
  (response) => {
    if (isObject(response.data)) {
      if (response.data.Status === 502 || response.data.Status === 401 || response.data.Status === 402) return browserHistory.push('/login');
      if (response.data.Status === 500) message.error(response.data.Message);
      if (response.data.Status === 200 && messageAlert[response.data.MessageCode]) message.success(response.data.Message);
      return { ...response.data, _time: new Date().getTime() };
    }

    return response.data;
  },
  (error) => {
    // if (error.response.status === 401) return browserHistory.push('/login');
    return Promise.reject(error.response);
  }
);
window.Perf = Perf;
const render = (Component) => {
  // Perf.start();
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>
    ,
    document.getElementById('app')
  );
  // Perf.stop();
  // const measurements = Perf.getLastMeasurements();
  // Perf.printInclusive(measurements);
  // Perf.printExclusive(measurements);
  // Perf.printWasted(measurements);
  // Perf.printOperations(measurements);
};

render(App);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const NewApp = App;
    render(NewApp);
  });
}

// https://github.com/gaearon/react-hot-boilerplate/tree/next
