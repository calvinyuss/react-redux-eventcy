import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import EnhancedTable from "./participantTable";
import RsvpCard from "./AdminRsvpCard";
// import moment from "moment";

import {
  getRsvp,
  deleteParticipant,
  editRsvp,
  newRsvp
} from "../../actions/RsvpAction";

import { Grid, Card, CardContent } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/styles";

const styles = {
  card: {
    width: 275,
    height: 350
  },
  addRsvpCard: {
    height: "100%",
    textAlign: "center",
    padding: "50%"
  }
};

class Rsvp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rsvp: [],
      error: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.rsvp !== prevProps.rsvp) {
      let details = [];
      this.props.rsvp.rsvp.forEach(element => {
        details.push(element.details);
      });
      return this.setState({
        rsvp: details
      });
    }
  }

  componentDidMount() {
    let details = [];
    this.props.rsvp.rsvp.forEach(element => {
      details.push(element.details);
    });
    return this.setState({
      rsvp: details
    });
  }

  onDeleteParticipant = async (rsvpID, dataID) => {
    //eslint-disable-next-line

    let deleteParticipant;
    if (typeof dataID === "string") {
      deleteParticipant = await this.props.deleteParticipant(rsvpID, dataID);
    } else {
      dataID.forEach(async id => {
        deleteParticipant = await this.props.deleteParticipant(rsvpID, id);
      });
    }
  };

  onEditRsvp = async (rsvpID, data) => {
    const editRsvp = await this.props.editRsvp(rsvpID, data);
  };

  addNewRsvp = async () => {
    const newRsvp = await this.props.newRsvp(this.props.event.details._id);
  };

  async onDeleteRsvp(rspvID) {}

  render() {
    const { classes } = this.props;
    return (
      // <div>
      //   <EnhancedTable
      //     participants={
      //       this.state.participants === undefined ? [] : this.state.participants
      //     }
      //     keys={this.state.rsvp.length === 0 ? "" : this.state.rsvp[0]._id}
      //     onDeleteParticipant={this.onDeleteParticipant}
      //   />
      // </div>
      <Grid container justify="center" className={classes.gridRoot} spacing={2}>
        {this.state.rsvp.map(value => (
          <RsvpCard
            key={value._id}
            rsvpDetails={value}
            onEditRsvp={this.onEditRsvp}
            onDeleteRsvp={this.onDeleteRsvp}
          />
        ))}
        <Grid item>
          <Card className={classes.card}>
            <CardContent className={classes.addRsvpCard}>
              <Icon
                className="fa fa-plus-circle"
                color="disabled"
                fontSize="large"
                onClick={this.addNewRsvp}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
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
  connect(mapStateToProps, { getRsvp, deleteParticipant, editRsvp, newRsvp })
)(Rsvp);
