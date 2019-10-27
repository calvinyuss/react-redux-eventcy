import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import eventReducer from "./eventReducer";

import { reducer as formReducer } from 'redux-form'
import rsvpReducer from "./rsvpReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  event: eventReducer,
  rsvp: rsvpReducer,
  form: formReducer
});