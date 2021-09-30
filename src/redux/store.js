/* eslint-disable import/no-anonymous-default-export */
// People use Redux middleware for logging, crash reporting, talking to an asynchronous API, routing, and more.
import {createStore, applyMiddleware } from 'redux';

// Saving the cache
import { persistStore } from 'redux-persist'


// Logger lets you replay problems as if they happened in your own browser
import logger from 'redux-logger'

import rootReducer from './root-reducer';

const middlewares = []

if (process.env.NODE_ENV === 'development'){
    middlewares.push(logger)
}

// Store can be considered as an database for all states
export const store = createStore(rootReducer, applyMiddleware(...middlewares))

export const persistor = persistStore(store);

export default {store, persistor};

