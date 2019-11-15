import React from "react";
import { MDBContainer,MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

export default function PaymentCard(props) {
  const onRedirect = () => {
    props.showComponent("formDetail")
  }
  return (
    <MDBContainer className="d-flex justify-content-center">
      <MDBCard style={{ width: "381px", heigth: "526px", marginTop: "3em" }}>
        <MDBCardBody>
          <p className="h4 text-center mt-4 text-warning" style={{ padding: "0" }}>STATUS : WAITING LIST</p>
          <div style={{ marginTop: "2em" }}>
            <p className="h6 text-justify">
              You're currently in our. Please wait for further information from us whether you acquired a spot or not. Thank you for your registration.
            </p>
            <p className="h6 text-justify">
              for further information please do contact us through our official line account: .________________
            </p>
          </div>
          <div className="text-center py-4 mt-3" style={{ padding: 0 }}>
            <MDBBtn onClick={onRedirect} style={{ borderRadius: "50px" }} color="cyan">
              OK
            </MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};
