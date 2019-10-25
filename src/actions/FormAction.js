
export const registrationForm = (form, history) => dispatch => {
    axios
      .post("/api/user/register", form)
      .then(res => history.push("/login")) // re-direct to login on successful register
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };