import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getEvent, updateEvent } from "../../actions/EventAction";
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

const styles = {
  container: {},
  inputLabel: {
    marginTop: "1em"
  },
  switch: {},
  input: {
    marginTop: ".5em"
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
        price: 0,
        paymentTo: "",
        openRegisDate: "",
        closeRegisDate: ""
      },
      error: {}
    };
  }

  async componentDidMount() {
    await this.props.getEvent(this.props.user._id);
    this.setState({
      details: this.props.event.details
    });
  }

  handleChange = e => {
    console.log(e.target.value);
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
      <Container maxWidth="sm" className={classes.container}>
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
            value={details.name}
            type="text"
            name="name"
            className={classes.input}
            onChange={this.handleChange}
          />
          <InputLabel className={classes.inputLabel}>Description</InputLabel>
          <TextareaAutosize
            value={details.description}
            type="text"
            name="description"
            rows="3"
            rowsMax="5"
            className={classes.input}
            onChange={this.handleChange}
          />
          <InputLabel className={classes.inputLabel}>Price</InputLabel>
          <Input
            value={details.price}
            type="Number"
            name="price"
            rows="3"
            rowsMax="5"
            className={classes.input}
            onChange={this.handleChange}
          />
          <InputLabel className={classes.inputLabel}>Payment To</InputLabel>
          <TextareaAutosize
            value={details.paymentTo}
            type="text"
            name="paymentTo"
            rows="3"
            rowsMax="5"
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
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </form>
      </Container>
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
  error: state.error,
  user: state.auth.user
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getEvent, updateEvent }
  )
)(Event);
