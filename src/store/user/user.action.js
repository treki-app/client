import {SIGNIN_USER,SIGNUP_USER} from './user.types'


const signIn = (payload) => {
  return{
    type: SIGNIN_USER,
    payload: payload
  }
}

const signUp = (payload) => {
  return{
    type: SIGNUP_USER,
    payload:payload
  }
}