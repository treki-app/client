import {
  LOADING_DEVICES,
  ERROR_DEVICES,
  LOAD_DEVICES_SUCCESS
} from './devices.actionType'

import axios from 'axios'

const loadingDevices = () => {
  return {
    type: LOADING_DEVICES
  }
}

const errorDevices = () => {
  return {
    type: ERROR_DEVICES
  }
}

const loadingDevicesSuccess = (payload) => {
  return {
    type: LOAD_DEVICES_SUCCESS,
    payload
  }
}

export const getUserDevices = (id) => {
  return (dispatch) => {
    dispatch(loadingDevices())
    axios({
      method: `GET`,
      url: `http://treki.fadhilmch.com/treki/user_id/${id}`,
    })
      .then((resp) => {
        console.warn(`=======> USER DEVICE DATA ${JSON.stringify(resp.data.data)}`)
        dispatch(loadingDevicesSuccess(resp.data.data))
      })
      .catch((err) => {
        dispatch(errorDevices(err))
      })
  }
}

export const getUserDetailDevice = (id) => {
  return (dispatch) => {
     axios({
      method: `GET`,
      url: `http://treki.fadhilmch.com/treki/${id}`,       
     })
      .then((resp) => {
        console.warn(`=====> DATA DETAIL ${JSON.stringify(resp.data.data)}`)
        // dispatch()
      })
  }
}