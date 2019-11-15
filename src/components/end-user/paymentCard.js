import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

export default function PaymentCard(props) {
  const { details } = props
  const onRedirect = () => {
    props.showComponent("formDetail")
  }
  return (
    <MDBContainer className="d-flex justify-content-center">
      <MDBCard style={{ width: "381px", heigth: "526px", marginTop: "3em" }}>
        <MDBCardBody>
          <p className="h4 text-center mt-4 text-success" style={{ padding: "0" }}>Registration Success</p>
          <p className="h6 text-center mt-4">Please proceed your payment</p>
          <div style={{ marginTop: "2em" }}>
            <p>
              {details}
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

{/* <MDBCardBody>
          <p className="h4 text-center mt-4 text-success" style={{ padding: "0" }}>Registration Success</p>
          <p className="h6 text-center mt-4">Please proceed your payment</p>
          <div style={{ marginTop: "2em" }}>
            <MDBRow style={{ margin: "2em 3em" }}>
              <MDBCol size="3" style={{ padding: 0 }}>
                <img alt="" style={{ margin: "5px" }} width="35" height="33" src={require('./price.svg')}></img>
              </MDBCol>
              <MDBCol style={{ fontSize: "14px", paddingRight: 0, paddingTop: "9px" }}>
                IDR 40.000 (Cash Only)
                  </MDBCol>
            </MDBRow>
            <MDBRow style={{ margin: "2em 3em" }}>
              <MDBCol size="3" style={{ padding: 0 }}>
                <img alt="" style={{ margin: "5px" }} width="35" height="33" src={require('./location.svg')}></img>
              </MDBCol>
              <MDBCol style={{ fontSize: "14px", paddingRight: 0 }}>
                BEM Meeting Room Lippo Lt 6
                  </MDBCol>
            </MDBRow>
          </div>
          <div className="text-center py-4 mt-3" style={{ padding: 0 }}>
            <MDBBtn onClick={onRedirect} style={{ borderRadius: "50px" }} color="cyan">
              OK
            </MDBBtn>
          </div>
        </MDBCardBody> */}
