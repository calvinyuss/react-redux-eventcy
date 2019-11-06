import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Container,
  InputLabel,
  Input,
  TextareaAutosize,
  Switch,
  Grid,
  Button,
  Paper
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

import { updateEvent } from "../../actions/EventAction";

const styles = {
  container: {
    padding: "2em 3em"
  },
  inputLabel: {
    marginTop: "1em",
    fontWeight: "bold"
  },
  switch: {},
  input: {
    marginTop: ".5em"
  },
  button: {
    width: "150px",
    borderRadius: "50px"
  }
};

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
        name: "",
        description: "",
        openRegis: false,
        venue: "",
        date: "",
        paymentTo: "",
        openRegisDate: "",
        closeRegisDate: ""
      },
      error: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.event !== this.props.event) {
      return this.setState({
        details: this.props.event.details
      });
    }
    if (prevProps.error !== this.props.error) {
      return this.setState({
        error: this.props.error.messsage
      });
    }
  }

  handleChange = e => {
    let details = this.state.details;
    details[e.target.name] = e.target.value;
    this.setState({
      details: details
    });
  };

  handleChangeSwitch = e => {
    let details = this.state.details;
    details[e.target.name] = e.target.checked;
    this.setState({
      details: details
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    await this.props.updateEvent(this.state.details._id, this.state.details);
  };

  render() {
    const { details } = this.state;
    const { classes } = this.props;
    return (
      <Paper className={classes.container}>
        <form onSubmit={this.handleSubmit}>
          <Grid container>
            <Grid item xs={3}>
              <InputLabel className={classes.inputLabel}>
                Open Registration
              </InputLabel>
            </Grid>
            <Grid item>
              <Switch
                className={classes.switch}
                name="openRegis"
                color="primary"
                checked={details.openRegis}
                onChange={this.handleChangeSwitch}
              />
            </Grid>
          </Grid>

          <InputLabel className={classes.inputLabel}>Event Name</InputLabel>
          <Input
            fullWidth
            value={details.name}
            type="text"
            name="name"
            className={classes.input}
            onChange={this.handleChange}
          />
          <InputLabel className={classes.inputLabel}>Venue</InputLabel>
          <Input
            fullWidth
            value={details.venue}
            type="text"
            name="venue"
            className={classes.input}
            onChange={this.handleChange}
          />
          <InputLabel className={classes.inputLabel}>
            Date
          </InputLabel>
          <Input
            type="datetime-local"
            name="date"
            value={moment(details.date).format("YYYY-MM-DDTHH:mm")}
            className={classes.input}
            onChange={this.handleChange}
          />
          <InputLabel className={classes.inputLabel}>Description</InputLabel>
          <TextareaAutosize
            value={details.description}
            type="text"
            name="description"
            rows="5"
            style={{ width: "100%" }}
            className={classes.input}
            onChange={this.handleChange}
          />
          <InputLabel className={classes.inputLabel}>
            Payment Description
          </InputLabel>
          <TextareaAutosize
            value={details.paymentTo}
            type="text"
            name="paymentTo"
            rows="5"
            style={{ width: "100%" }}
            className={classes.input}
            onChange={this.handleChange}
          />
          <InputLabel className={classes.inputLabel}>
            Open Registration
          </InputLabel>
          <Input
            type="datetime-local"
            name="openRegisDate"
            value={moment(details.openRegisDate).format("YYYY-MM-DDTHH:mm")}
            className={classes.input}
            onChange={this.handleChange}
          />
          <InputLabel className={classes.inputLabel}>
            Close Registration
          </InputLabel>
          <Input
            type="datetime-local"
            name="closeRegisDate"
            value={moment(details.closeRegisDate).format("YYYY-MM-DDTHH:mm")}
            className={classes.input}
            onChange={this.handleChange}
          />
          <br></br>
          <Grid container spacing={2} justify="flex-end">
            <Grid item >
              <Button className={classes.button} type="submit" variant="contained" color="primary">
                Update
              </Button>
            </Grid>
            <Grid item>
              <Button className={classes.button} type="reset" variant="contained" color="primary">
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }
}

//set poperty types for this component
Event.propTypes = {
  error: PropTypes.object,
  classes: PropTypes.object.isRequired
};

//putting action state to this component props
const mapStateToProps = state => ({
  event: state.event,
  error: state.error
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { updateEvent }
  )
)(Event);
