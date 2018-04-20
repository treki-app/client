import { LOADING, ERROR, LOAD_TREKI_SUCCESS } from './treki.actionType';

const initialState = {
  isLoading: false,
  isError: false,
  devices: []
}

export const treki = (state = {...initialState}, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case ERROR:
      return { ...state, isLoading: false, isError: true };
    case LOAD_TREKI_SUCCESS:
      return { ...state, isLoading: false, devices: action.value };
    default:
      return state;
  };
};