import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from 'redux'
import Reducers from './redux/reducers/index.js'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";


const getMiddlewares = () => {
  let middlewares = [thunk];
  // if (process.env.NODE_ENV === "development") {
  //   middlewares = [...middlewares, logger]
  // }
  return middlewares;
};

const store = createStore(Reducers, {}, applyMiddleware(...getMiddlewares()));
ReactDOM.render(
<Provider store={store}>

<BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
