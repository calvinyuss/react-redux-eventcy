import React, { Component } from "react";

import FormBody from "./formBody";
import FormDetail from "./formDetail";
import PaymentCard from "./paymentCard";
import WaitingCard from "./WaitingCard";
import "./style.css";
import Axios from "axios";

class FormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: {},
      displayedTable: "formDetail",
      formID: "",
      rsvp: [],
      event: {},
      loading: true
    };
  }

  showComponent(componentName) {
    this.setState({ displayedTable: componentName });
  }

  showFormComponent(componentName,rsvpID){
    this.setState({ 
      displayedTable: componentName, 
      formID: rsvpID, 
    });
  }

  async componentDidMount() {
    try {
      const getEvent = await Axios.get(`api/event/5dac68e70c8337502c13dbc5`);
      let rsvp = [];
      for (const id of getEvent.data.details.rsvpID) {
        const getRsvp = await Axios.get(`api/rsvp/${id}`);
        rsvp.push(getRsvp.data.details);
      }
      this.setState({
        event: getEvent.data.details,
        rsvp: rsvp,
        loading: false
      });
    } catch (err) {
      console.log(err);
    }
  }

  renderComponent() {
    switch (this.state.displayedTable) {
      case "formDetail":
        return (
          <FormDetail
            event={this.state.event}
            rsvp={this.state.rsvp}
            showComponent={this.showFormComponent.bind(this)}
          />
        );
      case "formBody":
        return <FormBody formID={this.state.formID} showComponent={this.showComponent.bind(this)} />;
      case "PaymentCard":
        return <PaymentCard details={this.state.event.payementTo} showComponent={this.showComponent.bind(this)} />;
      case "WaitingCard":
        return <WaitingCard showComponent={this.showComponent.bind(this)} />;
    }
  }

  render() {
    return <div className="backgroundImg">{this.renderComponent()}</div>;
  }
}

export default FormPage;
