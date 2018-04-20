import { combineReducers } from 'redux'

import trekiReducers from './device/treki.reducers'
import userReducers from './user/user.reducer'

export default combineReducers({
  trekiReducers: trekiReducers,
  userReducers: userReducers
})