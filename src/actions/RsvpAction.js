import Axios from "axios"
import { GET_ERRORS, SET_RSVP_DETAILS, DELETE_PARTICIPANT } from "./types";

//get event details using eventID 
export const getRsvp = rsvpID => async dispatch => {
  try {
    const rsvp = await Axios.get(`api/rsvp/${rsvpID}`);
    if (!rsvp.data.details) dispatch({ type: GET_ERRORS, message: rsvp.message });
    const participants = await Axios.get(`api/rsvp/${rsvpID}/form`)
    dispatch({
      type: SET_RSVP_DETAILS,
      data: {details: rsvp.data.details,participants:participants.data.participant}
    })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err
    })
  }
}

//remove participant
export const deleteParticipant = (rsvpID, dataID) => async dispatch => {
  try {
    const deleteParticipant = await Axios.delete(`api/rsvp/${rsvpID}/form/${dataID}`)
    if (deleteParticipant.status === 204){
      dispatch({
        type: DELETE_PARTICIPANT,
        participantID: dataID
      })
      return 1
    }
    return 0
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: "Something went wrong, please try again"
    })
  }
}