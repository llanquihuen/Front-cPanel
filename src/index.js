import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from "redux-thunk"
import reducers from './components/redux/combineReducers'

// import App from './App';
// import Login from './Login'
import Tienda from './Tienda.js'

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
<Provider store={store}>   
 <Tienda />
 </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
