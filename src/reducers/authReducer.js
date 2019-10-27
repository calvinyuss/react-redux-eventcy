import { SET_CURRENT_USER, USER_LOADING, LOGOUT_USER } from "../actions/types";
import _ from "lodash";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !_.isEmpty(action.payload),
        user: action.payload
      };
    case LOGOUT_USER:
      return state=null
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}