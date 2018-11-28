import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunks from 'redux-thunk'
import logger from 'redux-logger'
import auth from './authStore.js'

const reducer = combineReducers({
  auth
});

const store = createStore(
  reducer,
  applyMiddleware(thunks, logger)
);

export default store
