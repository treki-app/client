import {SIGNIN_USER,SIGNUP_USER} from './user.types'
import {auth, database} from '../firebase'


export const login = (email,password) => {
  return dispatch => {
    return auth.signInWithEmailAndPassword(email,password)
      .then(res =>{
        let successObject = {
          id: res.uid,
          email: res.email
        }
        dispatch(loginData(successObject))
      }).catch(err => {
        alert(`${err.message}`)
      })
  }
} 

export const signUp = (email,password) => {
  return dispatch => {
    if(password.length < 6 ){
      alert('please enter at least 6 charachter')
      return
    }
    auth.createUserWithEmailAndPassword(email,password).then(res => {
      let successObject = {
        id: res.uid,
        email: res.email
      }
      dispatch(signUpData(successObject))
      alert('Sign Up Success !')
      // alert(JSON.stringify(res))
    }).catch( err => {
      alert(`${err.message}`)
      return
    })
  }
}

export const updateTokenDevice = (uid, tokenDevice) => {
  return dispatch => {
    database.ref(`token/${uid}`).set({ tokenDevice })
  }
}

const loginData = (payload) => {
  return{
    type: SIGNIN_USER,
    payload:{
      id: payload.id,
      email: payload.email
    }
  }
}

const signUpData = (payload) => {
  return{
    type: SIGNUP_USER,
    payload:{
      id: payload.id,
      email: payload.email
    }
  }
}