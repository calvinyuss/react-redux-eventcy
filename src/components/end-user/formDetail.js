import React from "react";
import { MDBContainer, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

export default function FormDetail(props) {
  const onRedirect = () =>{
    props.showComponent("formBody")
  }

  return (
    <MDBContainer className="d-flex justify-content-center">
      <MDBCard style={{ width: "381px", heigth: "526px", marginTop: "3em" }}>
        <MDBCardBody>
          <p className="h4 text-center" style={{ padding: "0" }}> </p>
          <div className="grey-text">
            <img style={{ margin: "5px" }} width="100%" height="" src={require('./HMPSSI EVENT(2)_V2.jpg')} alt=""></img>
          </div>
          <div className="text-center py-4 mt-3" style={{ padding: 0 }}>
            <MDBBtn style={{ borderRadius: "50px" }} color="cyan" type="submit" onClick={onRedirect}>
              Register
            </MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};
