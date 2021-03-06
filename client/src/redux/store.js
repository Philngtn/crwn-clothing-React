/* eslint-disable import/no-anonymous-default-export */
// People use Redux middleware for logging, crash reporting, talking to an asynchronous API, routing, and more.
import {createStore, applyMiddleware } from 'redux';

// Saving the cache
import { persistStore } from 'redux-persist';

// Logger lets you replay problems as if they happened in your own browser
import logger from 'redux-logger';

// // Thunk is for async calling
// // import thunk from 'redux-thunk';

import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';

import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware]

// if the env is dev push the logger, if the env is test and deployment not add logger
if (process.env.NODE_ENV === 'development'){
    middlewares.push(logger)
}

// Store can be considered as an database for all states
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store);

export default {store, persistor};

