import { SET_RSVP_DETAILS, DELETE_PARTICIPANT, UPDATE_RSVP_DETAILS, NEW_RSVP, DELETE_RSVP } from "../actions/types";
import _ from 'lodash'

const initialState = {
  rsvp: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_RSVP_DETAILS:
      return {
        rsvp: [...state.rsvp, action.data]
      };
    case NEW_RSVP:
      return {
        ...state,
        rsvp: [...state.rsvp,action.data]
      }
    case DELETE_RSVP:
      _.remove(state.rsvp, e => e.details._id === action.rsvpID)
      return {
        ...state,
        rsvp: state.rsvp
      }
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
    case DELETE_PARTICIPANT:
      state.rsvp.forEach((rsvp,index)=>{
        if(rsvp.details._id === action.rsvpID){
          _.remove(rsvp.participants, e => e._id === action.participantID)
          return state.rsvp[index].participants = rsvp.participants
        }
      })
    default:
      return state;
  }
}