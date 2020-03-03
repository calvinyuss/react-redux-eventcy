import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/AuthAction";
import { getEvent } from "../../actions/EventAction";
import { getRsvp } from "../../actions/RsvpAction";

import TopNavigation from "./TopNavigation";
import Footer from "./Footer";
import NotFoundPage from "./NotFoundPage";

import Event from "./Event";
import Rsvp from "./Rsvp";
import Particpant from "./Participant";

import "./index.css";

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventDetails: {},
      error: {}
    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/admin-login");
  };

  async componentDidMount() {
    await this.props.getEvent(this.props.auth.user._id);
    this.props.event.rsvpID.forEach(async id => {
      await this.props.getRsvp(id);
    });
  }

  render() {
    return (
      <div className="flexible-content">
        <TopNavigation logout={this.onLogoutClick} />
        <main id="content" className="p-4 mainAdminContent">
          <Switch>
            <Route exact path="/admin">
              {/* <div>Hello world</div> */}
            </Route>
            <Route path="/admin/event">
              <Event />
            </Route>
            <Route path="/admin/rsvp">
              <Rsvp />
            </Route>
            <Route path="/admin/participant">
              <Particpant />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}
AdminPage.propTypes = {
  auth: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  error: PropTypes.object
};
const mapStateToProps = state => ({
  auth: state.auth,
  event: state.event.details
});

export default connect(
  mapStateToProps,
  { logoutUser, getEvent, getRsvp }
)(AdminPage);
