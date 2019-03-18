import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
// import rootReducer from './reducers'
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/Main/index.js';
import * as serviceWorker from './serviceWorker';

import store from './store.js';

import axios from 'axios';
axios.defaults.baseURL = 'http://homestead.test';

ReactDOM.render(
  <Provider store={store}> 
    <Main />
  </Provider>,
  document.getElementById('root')
);

if (module.hot) module.hot.accept();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
