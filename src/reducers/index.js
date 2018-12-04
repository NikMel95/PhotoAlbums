import { combineReducers } from 'redux'
import appReducer from './app'
import userReducer from './user'
import galleryReducer from './gallery'

export default combineReducers({
  user: userReducer,
  app: appReducer,
  gallery: galleryReducer
})