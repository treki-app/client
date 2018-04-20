import {
  GET_ALL_TREKI_FULFILLED,
  GET_ALL_TREKI_REJECTED,
  GET_ALL_TREKI_REQUESTED,
  GET_TREKI_FIREBASE_FULFILLED,
  GET_TREKI_FIREBASE_REJECTED,
  GET_TREKI_FIREBASE_REQUESTED
} from './treki.actionTypes'
import axios from 'axios'
import { database } from '../firebase'

export function getAllTreki () {
  return (dispatch) => {
    console.log(`Masuk sini !!!`)
    dispatch(getAllTrekiRequested())
    axios({
      method: 'GET',
      url: 'http://treki.fadhilmch.com/treki',
    })
      .then((data) => {
        const allTreki = data.data.data
        let keyObj = []
        for (key in allTreki) {
          keyObj.push(allTreki[key])
        }

        let registeredDevicesId = []

        keyObj.forEach((data) => {
          registeredDevicesId.push(data.device_id)
        })

        dispatch(getAllTrekiFulfilled(registeredDevicesId))
      })
      .catch((err) => {
        console.log(err)
        dispatch(getAllTrekiRejected())
      })
  }
}

const getAllTrekiRequested = () => {
  return {type: GET_ALL_TREKI_REQUESTED}
}

const getAllTrekiRejected = () => {
  return {type: GET_ALL_TREKI_REJECTED}
}

const getAllTrekiFulfilled = (payload) => {
  return {
    type: GET_ALL_TREKI_FULFILLED,
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
        item.key = e.key;
        if (item.user_id == '-LARdlvlVYAZd_HlbxSS') value.push(item);
      });
      dispatch(success(value));
      callback();
    }, error => {
      dispatch(error());
    });
  }
}

const loading = () => {
  return {
    type: GET_TREKI_FIREBASE_REQUESTED
  }
}

const error = () => {
  return {
    type: GET_TREKI_FIREBASE_REJECTED
  }
}

const success = (value) => {
  return {
    type: GET_TREKI_FIREBASE_FULFILLED,
    value
  }
}