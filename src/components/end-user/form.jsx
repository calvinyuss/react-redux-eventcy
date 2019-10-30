import React, { Component } from "react";

import FormBody from "./formBody";
import FormDetail from "./formDetail";
import PaymentCard from "./paymentCard";
import WaitingCard from "./WaitingCard";
import "./style.css";

class FormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: {},
      displayedTable: "formDetail"
    };
  }

  showComponent(componentName) {
    this.setState({ displayedTable: componentName });
  }

  renderComponent() {
    switch (this.state.displayedTable) {
      case "formDetail":
        return <FormDetail showComponent={this.showComponent.bind(this)} />;
      case "formBody":
        return <FormBody showComponent={this.showComponent.bind(this)} />;
      case "PaymentCard":
        return <PaymentCard showComponent={this.showComponent.bind(this)} />;
      case "WaitingCard":
        return <WaitingCard showComponent={this.showComponent.bind(this)} />
    }
  }

  render() {
    return (
      <div className="backgroundImg">
        {this.renderComponent()}
        {/* <FormDetail />
        <FormBody /> */}
        {/* <PaymentCard />
        <WaitingCard /> */}
      </div>
    );
  }
}

export default FormPage;
