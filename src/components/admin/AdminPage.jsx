import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/AuthAction";
import { getEvent } from "../../actions/EventAction";
import { getRsvp } from "../../actions/RsvpAction";

import TopNavigation from "./TopNavigation";
import Footer from "./Footer";
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

import "./index.css";

import Event from "./Event";
import Rsvp from "./Rsvp";

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
      // <div className={classes.root}>
      //   <MenuAppBar logOut={this.onLogoutClick} />
      //   <Container style={{ display: "none" }}>
      //     <Event />
      //   </Container>
      //   <Container fixed style={{ padding: 0 }}>
      //     <Rsvp />
      //   </Container>
      // </div>
      <div className="flexible-content">
        <TopNavigation />
        <main id="content" className="p-5 mainAdminContent">
          <Switch>
            <Route exact path="/admin">
              <div>Hello world</div>
            </Route>
            <Route path="/admin/event">
              <Event />
            </Route>
            <Route path="/admin/rsvp">
              <Rsvp />
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
