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

const success = (value, collectable) => {
  return {
    type: LOAD_TREKI_SUCCESS,
    value,
    collectable
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
          
      let arr = []

      value.forEach(val => {
        let tempObj = {}
        let location = arr.filter(arrVal => {
          return (val.location.latitude === arrVal.location.latitude)&&(val.location.longitude === arrVal.location.longitude)
        })
        // console.log("location "+location + " " + location.length)
        if(location.length === 0){
          tempObj.location = (val.location)
          tempObj.devices = []
          tempObj.devices.push(val)
          arr.push(tempObj)
        } else {
          let index = arr.indexOf(location[0])
          arr[index].devices.push(val)
        }
      })
      arr.forEach((val, i) => {
        // console.warn('Locat '+i+' '+JSON.stringify(val))
      })
      // console.warn("LOCATIONSSS", arr.map(val=> val.devices.length))

      dispatch(success(value, arr));
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
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigator.geolocation.getCurrentPosition(location => callback({ ...location.coords }, null), error => callback(null, error))
      } else ToastAndroid.show("Location permission denied", ToastAndroid.SHORT);
    } catch (err) {
      
    }
  }
}

export const saveNewDevice = (payload) => {
  return (dispatch) => {
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
    // console.warn('updatestate', payload)
    return axios({
      method: `PUT`,
      url: `http://treki.fadhilmch.com/treki/${payload.id}/status`,
      data: {
        status: payload.status
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

export const deleteDevice = (id) => {
  return dispatch => {
    axios({
      method: `DELETE`,
      url: `http://treki.fadhilmch.com/treki/${id}`
    })
  }
}