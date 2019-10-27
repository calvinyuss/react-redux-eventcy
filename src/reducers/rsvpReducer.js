import { SET_RSVP_DETAILS } from "../actions/types";

const initialState = {
  details: [],
  participants: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_RSVP_DETAILS:
      return {
        ...state,
        details: [...state.details, action.rsvp],
        participants: [...state.participants,action.participants]
      };
    default:
      return state;
  }
}