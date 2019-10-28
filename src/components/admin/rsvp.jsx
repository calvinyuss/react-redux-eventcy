import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRsvp, deleteParticipant } from "../../actions/RsvpAction";
import EnhancedTable from "./participantTable";
// import moment from "moment";

import {} from "@material-ui/core";
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
    if (this.props.rsvp !== props.rsvp) {
      this.setState({
        rsvp: this.props.rsvp.details,
        participants: this.props.rsvp.participants
      });
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

  onDeleteParticipant = async (rsvpID,dataID) => {
    let deleteParticipant
    if (typeof(dataID)==="string"){
      deleteParticipant = await this.props.deleteParticipant(rsvpID,dataID)
    }else{
      dataID.forEach(async id => {
        deleteParticipant =await this.props.deleteParticipant(rsvpID,id)
      });
    }
    
  };


  render() {
    // const { classes } = this.props;
    return (
      <div>
        <EnhancedTable
          participants={this.state.participants === undefined ? [] : this.state.participants}
          keys = {this.state.rsvp.length===0 ? "" : this.state.rsvp[0]._id}
          onDeleteParticipant={this.onDeleteParticipant}
        />
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
    { getRsvp, deleteParticipant }
  )
)(Rsvp);
