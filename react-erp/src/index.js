import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './app';


const render = (Component) => {
    ReactDOM.render( 
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('app')
    );
};

render(App);
console.log("----------------------------------------------")
console.log(module.hot)

/*热更新*/
if (module.hot) {
  
    module.hot.accept('./router', () => {
        console.log("***************************************************")
        const NewApp = App;
        render(NewApp);
    });
}
