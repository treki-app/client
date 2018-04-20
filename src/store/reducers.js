import { combineReducers } from 'redux'

import trekiReducers from './device/treki.reducers'

export default combineReducers({
  trekiReducers: trekiReducers
})