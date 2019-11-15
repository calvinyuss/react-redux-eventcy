import React, { useEffect } from "react";
import { MDBContainer, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBRow, MDBCol } from 'mdbreact';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from "moment";

function RsvpCard(props) {
  const { rsvp } = props

  return (
    <MDBContainer>
      <MDBRow>
        {rsvp.map(value => {
          return (
            <MDBCol key={value._id} className="mt-1">
              <MDBCard>
                <MDBCardBody>
                  <MDBCardTitle className="text-center" style={{ fontSize: "1.3rem" }}>{value.name}</MDBCardTitle>
                  <p style={{ marginBottom: 0 }}>Description</p>
                  <p style={{height: 100,color:"grey"}} >{value.description}</p>
                  {value.price !== 0 ? (
                    <div><p style={{ marginBottom: 0 }}>Price</p>
                      <p style={{color:"grey"}}>Free</p></div>
                  ) : (
                      <div>
                        <p style={{ marginBottom: 0 }}>price</p>
                        <p style={{color:"grey"}} >{value.price}</p>
                      </div>
                    )}
                  <div className="text-center py-4 mt-3" style={{ padding: 0 }}>
                    <MDBBtn style={{ borderRadius: "50px" }} color="cyan" type="submit" onClick={() => props.onRedirect(value._id)}>
                      Register
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          )
        })}

      </MDBRow>
    </MDBContainer>
  )
}


export default function FormDetail(props) {
  const [event, setEvent] = React.useState([])

  const onRedirect = (rsvpID) => {
    props.showComponent("formBody", rsvpID)
  }

  useEffect(() => {
    if (event !== props.event) {
      setEvent(props.event)
    }
  })
  return (
    <MDBContainer className="d-flex justify-content-center">
      
      {!event.length && props.rsvp.length === 0 ? (
        <CircularProgress />
      ) : (
          <MDBCard style={{ width: "762px", heigth: "526px", marginTop: "3em" }}>
            <MDBCardBody>
              <MDBCardTitle style={{ textAlign: "center" }}>{event.name}</MDBCardTitle>
              {/* Image DIV  */}
              <div>
                {/* <img style={{ margin: "5px" }} width="100%" height="" src={require('./HMPSSI EVENT(2)_V2.jpg')} alt=""></img> */}
              </div>
              <div>
                <p style={{ marginBottom: 0 }}>Description</p>
                <p>{event.description}</p>
                <p style={{ marginBottom: 0 }}>Date</p>
                <p>{moment(event.date).format("ddd, DD-MM-YYYY HH:mm")}</p>
                <p style={{ marginBottom: 0 }}>Venue</p>
                <p>{event.venue}</p>
              </div>
              {
                moment(event.closeRegisDate).isAfter(moment()) && moment(event.openRegisDate).isBefore(moment()) ?
                  (
                    <RsvpCard rsvp={props.rsvp} onRedirect={onRedirect} />
                  ) : (
                    <MDBCardTitle style={{ textAlign: "center" }} className="text-danger">Registration closed</MDBCardTitle>
                  )
              }


            </MDBCardBody>
          </MDBCard>
        )
      }

    </MDBContainer>
  );
};
