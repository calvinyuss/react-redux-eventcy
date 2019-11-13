import { SET_RSVP_DETAILS, DELETE_PARTICIPANT, UPDATE_RSVP_DETAILS } from "../actions/types";
import _ from 'lodash'

const initialState = {
  rsvp: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_RSVP_DETAILS:
      return {
        ...state,
        rsvp: [...state.rsvp, action.data]
      };
    //udpate participant
    case UPDATE_RSVP_DETAILS:
      state.rsvp.forEach((rsvp, index) => {
        if (rsvp.details._id === action.data.details._id) {
          state.rsvp[index] = action.data.details;
          return {
            ...state,
            rsvp: state.rsvp
          }
        }
      });
    // case DELETE_PARTICIPANT:
    //   _.remove(state.participants, e => e._id === action.participantID)
    //   return {
    //     details: [...state.details],
    //     participants: state.participants
    //   }
    default:
      return state;
  }
}