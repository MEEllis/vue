import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';


const render = () => {
    ReactDOM.render( 
        <h1>Hello, world!</h1>,
        document.getElementById('app')
    );
};

render();