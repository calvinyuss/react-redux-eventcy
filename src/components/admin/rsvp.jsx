import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRsvp } from "../../actions/RsvpAction";
import EnhancedTable from "./participantTable";
// import moment from "moment";

import {
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const styles = {};

class Rsvp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rsvp: [],
      participants: [],
      event: {},
      error: {}
    };
  }

  componentDidUpdate(props) {
    if(this.props.rsvp!==props.rsvp){
      this.setState({
        rsvp : this.props.rsvp.details,
        participants : this.props.rsvp.participants
      })
    }
    if (
      (this.props.event && !props.event) ||
      this.props.event !== props.event
    ) {
      this.props.event.details.rsvpID.forEach(async id => {
        await this.props.getRsvp(id);
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <EnhancedTable participants={this.state.participants}/>
      </div>
    );
  }
}

//set poperty types for this component
Rsvp.propTypes = {
  error: PropTypes.object,
  classes: PropTypes.object.isRequired,
  event: PropTypes.object,
  rsvp: PropTypes.object
};

//putting action state to this component props
const mapStateToProps = state => {
  return {
    error: state.error,
    event: state.event,
    rsvp: state.rsvp
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getRsvp }
  )
)(Rsvp);
