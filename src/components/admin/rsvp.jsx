import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRsvp } from "../../actions/RsvpAction";
import moment from "moment";

import {
  Container,
  InputLabel,
  Input,
  TextareaAutosize,
  Switch,
  Grid,
  Button
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

  async componentDidUpdate(props) {
    if (
      (this.props.event && !props.event) ||
      this.props.event !== props.event
    ) {
      this.props.event.details.rsvpID.forEach(async id => {
        await this.props.getRsvp(id);
      });
      console.log(this.props)
      // this.setState({
      //   participants
      // })
    }
  }

  render() {
    const { details } = this.state;
    const { classes } = this.props;
    return <Container container> {this.state.event.name} emcia lan </Container>;
  }
}

//set poperty types for this component
Event.propTypes = {
  error: PropTypes.object,
  classes: PropTypes.object.isRequired
};

//putting action state to this component props
const mapStateToProps = state => ({
  error: state.error,
  event: state.event,
  rsvp: state.rsvp
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getRsvp }
  )
)(Rsvp);
