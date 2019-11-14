import Axios from "axios"
import { GET_ERRORS, SET_RSVP_DETAILS, DELETE_PARTICIPANT, UPDATE_RSVP_DETAILS, NEW_RSVP, DELETE_RSVP } from "./types";

//get event details using eventID 
export const getRsvp = rsvpID => async dispatch => {
  try {
    const rsvp = await Axios.get(`api/rsvp/${rsvpID}`);
    if (!rsvp.data.details) dispatch({ type: GET_ERRORS, message: rsvp.message });
    const participants = await Axios.get(`api/rsvp/${rsvpID}/form`)
    dispatch({
      type: SET_RSVP_DETAILS,
      data: { details: rsvp.data.details, participants: participants.data.participant }
    })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err
    })
  }
}

//add new rsvp
export const newRsvp = eventID => async dispatch => {
  try {
    const newRsvp = await Axios.post(`api/event/${eventID}/rsvp`);
    dispatch({
      type: NEW_RSVP,
      data: { details: newRsvp.data.details }
    })
  } catch{
    dispatch({
      type: GET_ERRORS,
      payload: "Something went wrong, please try again"
    })
  }
}

//delete rsvp 
export const deleteRsvp = rsvpID => async dispatch => {
  try {
    const deleteRSvp = await Axios.delete(`api/rsvp/${rsvpID}`);
    dispatch({
      type: DELETE_RSVP, 
      rsvpID: rsvpID
    })
  } catch{
    dispatch({
      type: GET_ERRORS,
      payload: "Something went wrong, please try again"
    })
  }

}

//update RSVP Details using rsvp id
export const editRsvp = (rsvpID, data) => async dispatch => {
  try {
    const rsvp = await Axios.put(`api/rsvp/${rsvpID}`, data)
    console.log(rsvp)
    dispatch({
      type: UPDATE_RSVP_DETAILS,
      data: { details: rsvp.data.details }
    })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: "Something went wrong, please try again"
    })
  }
}


//remove participant
export const deleteParticipant = (rsvpID, dataID) => async dispatch => {
  try {
    const deleteParticipant = await Axios.delete(`api/rsvp/${rsvpID}/form/${dataID}`)
    if (deleteParticipant.status === 204) {
      dispatch({
        type: DELETE_PARTICIPANT,
        participantID: dataID,
        rsvpID: rsvpID
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