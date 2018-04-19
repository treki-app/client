import { LOADING, ERROR, LOAD_TREKI_SUCCESS } from './treki.actionType';
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