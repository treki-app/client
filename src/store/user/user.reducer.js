import {SIGNIN_USER,SIGNUP_USER} from './user.types'

const initialState = {
  email: '',
  password: '',
  status: ''
}

const reducers =(state=initialState , action)=> {
  switch(action.type){
    case SIGNIN_USER:
      return {
        ...state,
        email : action.payload.email,
        password: action.payload.password
      }
    case SIGNUP_USER: 
      return{
        ...state,
        email: action.payload.email,
        password: action.payload.password
      }
    default:
      return state     
  }
}

export default reducers