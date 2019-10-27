import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { logoutUser } from "../../actions/AuthAction";
import MenuAppBar from "./header";

import Event from "./event";
import Rsvp from "./rsvp";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const styles = {
  root: {
    flexGrow: 1,
  }
};

class Dashboard extends Component {
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


  render() {
    const { user } = this.props.auth;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <MenuAppBar logOut={this.onLogoutClick} />
        <Grid container >
          <Grid item>
            <Event />
          </Grid>
          <Grid item>
            <Rsvp />
          </Grid>
        </Grid>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  error: PropTypes.object
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { logoutUser }
  )
)(Dashboard);
