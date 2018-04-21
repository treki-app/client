import {
  LOADING_DEVICES,
  ERROR_DEVICES,
  LOAD_DEVICES_SUCCESS
} from './devices.actionType'

const initialState = {
  isLoading: false,
  isError: false,
  userDevices: []
}

const reducers = (state = {...initialState}, action) => {
  switch ( action.type ) {
    case LOADING_DEVICES:
      return {
        ...state,
        isLoading: true
      };

    case ERROR_DEVICES:
      return {
        ...state,
        isLoading: false,
        isError: true
      };

    case LOAD_DEVICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        userDevices: action.payload
      };

    default:
      return state;
  } 
}

export default reducers;