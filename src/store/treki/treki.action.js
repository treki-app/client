import { 
  LOADING, 
  ERROR, 
  LOAD_TREKI_SUCCESS,
  LOAD_REGISTERED_DEVICE_SUCCESS
} from './treki.actionType';
import { database } from '../firebase';

const loading = () => {
  return {
    type: LOADING
  }
}

const error = () => {
  return {
    type: ERROR
  }
}

const success = (value) => {
  return {
    type: LOAD_TREKI_SUCCESS,
    value
  }
}

const successLoadRegistered = (payload) => {
  return {
    type: LOAD_REGISTERED_DEVICE_SUCCESS,
    payload
  }
}

export const LoadTreki = (callback) => {
  return dispatch => {
    dispatch(loading());
    database.ref(`/treki`).on('value', snapshot => {
      let value = [];
      snapshot.forEach(e => {
        let item = e.val();
        item.id = e.key;
        // if (item.user_id == '-LARdlvlVYAZd_HlbxSS')
        value.push(item);
      });
      dispatch(success(value));
      callback();
    }, error => {
      dispatch(error());
    });
  }
}

export const loadRegisteredDevices = () => {
  return (dispatch,getState) => {
    dispatch(loading());
    let getDevices = getState().treki.devices

    let registeredDevices = getDevices.map((val) => {
      return val.device_id
    })

    dispatch(successLoadRegistered(registeredDevices))
  }
}