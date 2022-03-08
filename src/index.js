import React from 'react';
import {
    compose
} from 'redux'
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

import {Web3ReactProvider} from '@web3-react/core'
import {
    getLibrary
} from './utils/web3React'

import Routes from 'routes'

const initialCompose = 
    process.env.NODE_ENV === 'production' ?
    compose(
        applyMiddleware(thunk)
    )
    : 
    (
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ?
        compose(
            applyMiddleware(thunk, logger),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
        :
        compose(
            applyMiddleware(thunk, logger)
        )
    )

const store = createStore(
    rootReducer,
    initialCompose
)

ReactDOM.render(
    <Web3ReactProvider getLibrary={getLibrary}>
        <Provider store={store}>
            <React.StrictMode>
                <Routes />
            </React.StrictMode>
        </Provider>
    </Web3ReactProvider>
    ,
    document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
