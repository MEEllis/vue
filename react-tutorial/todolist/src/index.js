import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Todolist from './Todolist';
import store from './store'
import 'antd/dist/antd.css';

const App=()=>(
    <Provider store={store}>
        <Todolist />
    </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'));

