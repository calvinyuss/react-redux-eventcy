import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import eventReducer from "./eventReducer";

import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  event: eventReducer
});