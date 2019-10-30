import React, { useState } from "react";
import { MDBContainer, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBAlert } from 'mdbreact';
import Axios from "axios";

export default function FormBody(props) {
  const [field] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  const onHandleChange = (e) => {
    field[e.target.name] = e.target.value
  }

  const onRedirect = (component) => {
    props.showComponent(component)
  }

  const validate = () => {
    if (!field["Name"]) return setErrorMessage("Name is missing")
    if (!field["Email"]) return setErrorMessage("Email is missing")
    if(!validateEmail(field["Email"])) return setErrorMessage("Invaild Email")
    if (!field["Class"]) return setErrorMessage("Class is missing")
    if (!field["NIM"]) return setErrorMessage("NIM is missing")
    if (!field["Line ID"]) return setErrorMessage("Line ID is missing")
    if (!field["Phone Number"]) return setErrorMessage("Phone Number is missing")
    return 1
  }

  function validateEmail(email) {
    //eslint-disable-next-line
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


  const onSubmit = async (e) => {
    e.preventDefault()
    e.target.className += "was-validated";
    window.scrollTo(0, 0)
    try {
      if (validate() !== 1) return
      const data = await Axios.post("http://localhost:8000/api/rsvp/5db1c1a9f6e3d41a38531f25/form", field)
      if (data.data.message) {
        setErrorMessage("Email already exist")
        window.scrollTo(0, 0)
        return
      }
      if (data.data.details.status === "Waiting") {
        onRedirect("WaitingCard")
        return
      }
      return onRedirect("PaymentCard")
    } catch (err) {
      console.log(err)
      setErrorMessage('Something went wrong, please try again')
      return
    }
  }

  return (
    <MDBContainer className="d-flex justify-content-center">
      <MDBCard style={{ width: "381px", heigth: "526px", marginTop: "3em" }}>
        <MDBCardBody>
          <p id="top" className="h4 text-center" style={{ padding: "0" }}>Register</p>
          {!errorMessage ? (
            <div></div>
          ) : (
              <MDBAlert color="danger" >
                <center>{errorMessage}</center>
              </MDBAlert>
            )
          }
          <form
            className="needs-validation"
            onSubmit={onSubmit}
            noValidate
          >
            <div className="grey-text">
              <MDBInput
                label="Name"
                type="text"
                name="Name"
                placeholder="Name"
                className=""
                onChange={e => onHandleChange(e)}
                required
              />

              <MDBInput
                label="Email"
                type="email"
                name="Email"
                placeholder="Email"
                className=" mt-4"
                onChange={e => onHandleChange(e)}
                required
              />

              <MDBInput
                label="NIM"
                type="number"
                name="NIM"
                placeholder="NIM"
                className=" mt-4"
                onChange={e => onHandleChange(e)}
                required
              />

              <MDBInput
                label="Class"
                type="text"
                name="Class"
                placeholder="Class"
                className=" mt-4"
                onChange={e => onHandleChange(e)}
                required
              />

              <MDBInput
                label="Line ID"
                type="text"
                name="Line ID"
                placeholder="Line ID"
                className=" mt-4"
                onChange={e => onHandleChange(e)}
                required
              />

              <MDBInput
                label="Phone Number"
                type="number"
                name="Phone Number"
                placeholder="Phone Number"
                className=" mt-4"
                onChange={e => onHandleChange(e)}
                required
              />

            </div>
            <div className="text-center py-4" style={{ padding: 0 }}>
              <MDBBtn style={{ borderRadius: "50px" }} color="cyan" type="submit">
                Submit
              </MDBBtn>
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};
