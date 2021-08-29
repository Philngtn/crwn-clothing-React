// People use Redux middleware for logging, crash reporting, talking to an asynchronous API, routing, and more.
import {createStore, applyMiddleware } from 'redux';

// Logger lets you replay problems as if they happened in your own browser
import logger from 'redux-logger'

import rootReducer from './root-reducer';

const middlewares = [logger]

// Store can be considered as an database for all states
const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store;

