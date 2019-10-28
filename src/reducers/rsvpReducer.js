import { SET_RSVP_DETAILS, DELETE_PARTICIPANT } from "../actions/types";
import _ from 'lodash'

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
        participants: action.participants
      };
    case DELETE_PARTICIPANT:
        _.remove(state.participants, e => e._id === action.participantID)
      return {
        details : [...state.details],
        participants : state.participants
      }
    default:
      return state;
  }
}