import {
  GET_ALL_TREKI_FULFILLED,
  GET_ALL_TREKI_REJECTED,
  GET_ALL_TREKI_REQUESTED
} from './treki.actionTypes'
import axios from 'axios'

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