import React, { Component } from "react";

class FormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: ["somedata", "somedataa"]
    };
  }
  render() {
    return (
      <div className="container">
        {/* input form from here */}
        <div className="FormBody">
          <label>
            NIM
            <input type="text" name="NIM"></input>
          </label>
        </div>
      </div>
    );
  }
}

export default FormPage;
