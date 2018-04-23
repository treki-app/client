import { 
  LOADING, 
  ERROR, 
  LOAD_TREKI_SUCCESS,
  LOAD_REGISTERED_DEVICE_SUCCESS
} from './treki.actionType';
import { database } from '../firebase';
import axios from 'axios';
import { ToastAndroid, PermissionsAndroid } from 'react-native';

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
  return (dispatch, getState) => {
    dispatch(loading());
    let getDevices = getState().treki.devices
    let registeredDevices = getDevices.map((val) => {
      return val.device_id
    })

    dispatch(successLoadRegistered(registeredDevices))
  }
}

export const GetLocation = (callback) => {
  return async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Treki Location Permission',
          'message': `Just wanna know your location`
        }
      )

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigator.geolocation.getCurrentPosition(location => callback({ ...location.coords }, null), error => callback(null, error))
      } else ToastAndroid.show("Location permission denied", ToastAndroid.SHORT);
    } catch (err) {
      
    }
  }
}

export const saveNewDevice = (payload) => {
  return (dispatch) => {
    console.warn(payload)
    return axios({
      method: `POST`,
      url: `http://treki.fadhilmch.com/treki/createv2`,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: payload
    })
      .then(() => {

      })
      .catch((err) => {
      })
  }
}

export const updateState = (payload) => {
  return (dispatch) => {
    console.warn('updatestate')
    return axios({
      method: `PUT`,
      url: `http://treki.fadhilmch.com/treki/${payload.id}/state`,
      data: {
        state: payload.state
      }
    })
  }
}

export const updateDeviceLocation = (payload) => {
  return (dispatch) => {
    axios({
      method: `PUT`,
      url: `http://treki.fadhilmch.com/treki/device_id/${payload.id}`,
      data: {
        location: payload.location
      }
    })
  }
}