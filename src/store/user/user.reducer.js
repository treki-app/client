import {SIGNIN_USER,SIGNUP_USER} from './user.types'

const initialState = {
  email: '',
  password: '',
  uid: ''
}

const reducers =(state=initialState , action)=> {
  switch(action.type){
    case SIGNIN_USER:
      return {
        ...state,
        email : action.payload.email,
        uid   : action.payload.id
      }
    case SIGNUP_USER: 
      return{
        ...state,
        email: action.payload.email,
        uid  : action.payload.id 
      }
    default:
      return state     
  }
}

export default reducers