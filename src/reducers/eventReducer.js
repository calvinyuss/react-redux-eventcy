import { SET_EVENT_DETAILS } from "../actions/types";

const initialState = {
  details: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_EVENT_DETAILS:
      return {
        details: action.payload
      };
    default:
      return state;
  }
}