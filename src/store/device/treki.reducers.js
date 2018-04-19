import {
  GET_ALL_TREKI_FULFILLED,
  GET_ALL_TREKI_REJECTED,
  GET_ALL_TREKI_REQUESTED
} from './treki.actionTypes'

const initialState = {
  trekiList: [],
  loading: false,
  error: {
    status: false,
    message: ''
  }
}

const reducers = (state = {...initialState}, action) => {
  switch(action.type) {
    case GET_ALL_TREKI_FULFILLED:
      return {
        ...state,
        trekiList: action.payload
      }
    case GET_ALL_TREKI_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_ALL_TREKI_REJECTED:
      return {
        ...state,
        error: {
          status: true,
          message: "Error getting all treki devices"
        }
      }
    default:
      return state
  }
}
export default reducers