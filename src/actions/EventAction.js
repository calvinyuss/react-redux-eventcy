import Axios from "axios"
import { GET_ERRORS, SET_EVENT_DETAILS } from "./types";

//get event details using eventID 
export const getEvent = eventID => async dispatch => {
    try {
        const event = await Axios.get(`api/event/${eventID}`);
        if (!event.data.details) dispatch({ type: GET_ERRORS, message: event.message });
        dispatch({
            type: SET_EVENT_DETAILS,
            payload : event.data.details
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    }
}

//update Event 
export const updateEvent = (eventID,reqBody) => async dispatch => {
    try {
        const event = await Axios.put(`api/event/${eventID}`,reqBody);
        if (!event.data.details) dispatch({ type: GET_ERRORS, message: event.message });
        dispatch({
            type: SET_EVENT_DETAILS,
            payload : event.data.details
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: "Something went wrong, please try again"
        })
    }
}


