import Axios from "axios"
import { GET_ERRORS, SET_RSVP_DETAILS } from "./types";

//get event details using eventID 
export const getRsvp = rsvpID => async dispatch => {
    try {
        const rsvp = await Axios.get(`api/rsvp/${rsvpID}`);
        if (!rsvp.data.details) dispatch({ type: GET_ERRORS, message: rsvp.message });
        const participants = await Axios.get(`api/rsvp/${rsvpID}/form`)
        dispatch({
            type: SET_RSVP_DETAILS,
            rsvp : rsvp.data.details,
            participants: participants.data.participant
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    }
}