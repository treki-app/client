import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { treki } from './treki/treki.reducer';

export default store = createStore(
  combineReducers({
    treki,
  }),
  applyMiddleware(thunk)
);