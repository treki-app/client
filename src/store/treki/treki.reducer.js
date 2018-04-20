import { LOADING, ERROR, LOAD_TREKI_SUCCESS, LOAD_REGISTERED_DEVICE_SUCCESS } from './treki.actionType';

const initialState = {
  isLoading: false,
  isError: false,
  devices: [],
  registeredDevices: []
}

export const treki = (state = {...initialState}, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case ERROR:
      return { ...state, isLoading: false, isError: true };
    case LOAD_TREKI_SUCCESS:
      return { ...state, isLoading: false, devices: action.value };
    case LOAD_REGISTERED_DEVICE_SUCCESS:
      return { ...state, isLoading: false, registeredDevices: action.payload }
    default:
      return state;
  };
};