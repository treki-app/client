import { 
  LOADING, 
  ERROR, 
  LOAD_TREKI_SUCCESS,
  LOAD_REGISTERED_DEVICE_SUCCESS
} from './treki.actionType';
import { database } from '../firebase';
import axios from 'axios';

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
  console.warn('Load Register Triggered !')
  return (dispatch,getState) => {
    dispatch(loading());
    let getDevices = getState().treki.devices

    let registeredDevices = getDevices.map((val) => {
      return val.device_id
    })

    dispatch(successLoadRegistered(registeredDevices))
  }
}

export const saveNewDevice = (payload) => {
  return (dispatch) => {
    console.warn('Masuk save new device')
    return axios({
      method: `POST`,
      url: `http://treki.fadhilmch.com/treki`,
      data: {
        ...payload
      }
    })
      .then(() => {

      })
      .catch((err) => {
        console.warn(err)
      })
  }
}

export const updateDeviceLocation = (payload) => {
  return (dispatch) => {
    console.warn('Masuk updateDeviceLocation')
    axios({
      method: `PUT`,
      url: `http://treki.fadhilmch.com/treki/device_id/${payload.id}`,
      data: {
        location: payload.location
      }
    })
  }
}