import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { treki } from './treki/treki.reducer';
import userReducer from './user/user.reducer';
import devicesReducer from './devices/devices.reducer'
export default store = createStore(
  combineReducers({
    treki,
    userReducer,
    devicesReducer
  }),
  applyMiddleware(thunk)
);