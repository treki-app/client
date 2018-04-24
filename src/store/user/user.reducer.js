import {
  SIGNIN_USER,
  LOADING_SIGNIN,
  ERROR_SIGNIN,
  SIGNUP_USER,
  LOADING_SIGNUP,
  ERROR_SIGNUP,
  SIGNOUT_USER
  } from './user.types'

const initialState = {
  email: '',
  password: '',
  uid: '',
  isLoadingSignIn: false,
  isErrorSignIn: false,
  isLoadingSignUp: false,
  isErrorSignUp: false,
}

const reducers =(state=initialState , action)=> {
  switch(action.type){
    case SIGNIN_USER:
      return {
        ...state,
        isLoadingSignIn: false,
        isErrorSignIn: false,
        email : action.payload.email,
        uid   : action.payload.id,
      }
    case LOADING_SIGNIN:{
      return{
        ...state,
        isLoadingSignIn: true
      }
    }  
    case ERROR_SIGNIN:{
      return{
        ...state,
        isLoadingSignIn: false
        // isErrorSignIn: true
      }
    }
    case SIGNUP_USER: 
      return{
        ...state,
        isLoadingSignUp: false,
        isErrorSignUp: false,
        email: action.payload.email,
        uid  : action.payload.id 
      }
    case LOADING_SIGNUP:{
      return{
        ...state,
        isLoadingSignUp: true
      }
    }  
    case ERROR_SIGNUP:{
      return{
        ...state,
        isLoadingSignIn: false        
        // isErrorSignUp: true
      }
    }  
    case SIGNOUT_USER:
      return initialState
    default:
      return state     
  }
}

export default reducers