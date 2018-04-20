import {
  GET_ALL_TREKI_FULFILLED,
  GET_ALL_TREKI_REJECTED,
  GET_ALL_TREKI_REQUESTED,
  GET_TREKI_FIREBASE_FULFILLED,
  GET_TREKI_FIREBASE_REJECTED,
  GET_TREKI_FIREBASE_REQUESTED
} from './treki.actionTypes'

const initialState = {
  trekiList: [],
  isLoading: false,
  isError: {
    status: false,
    message: ''
  },
  devices: []
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
        isLoading: true
      }
    case GET_ALL_TREKI_REJECTED:
      return {
        ...state,
        isError: {
          status: true,
          message: "Error getting all treki devices"
        }
      }
    default:
      return state
  }
}
export default reducers