import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/AuthAction";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/styles";


const styles = {
  paper: {
    marginTop: "4em",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: ".5em"
  },
  submit: {
    marginTop: "1em"
  },
  tooltip: {
    color: "lightblue",
    backgroundColor: "green",
    fontSize: "2em"
  }
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.instagram.com/sistech_uphmedan/">
        <u>HMPSSI</u>
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      usernameValid: true,
      passwordValid: true,
      formerror: {
        username: "",
        password: ""
      }
    };
  }

  componentDidUpdate(prevProps) {
    //when login error
    if (prevProps.error !== this.props.error) {
      console.log(this.props.error);
      if (this.props.error) {
        this.setState({
          error: this.props.error.message
        });
      }
    }
    //when login and success
    //redirect to home page
    else if (prevProps.auth !== this.props.auth) {
      if (this.props.auth.isAuthenticated) {
        this.props.history.push("/dashboard"); // push user to dashboard when they login
      }
    }
  }

  //validate username and password function
  validateForms() {
    let formerror = this.state.formerror;
    let username = this.state.username;
    let password = this.state.password;
    
    let flag = true
    if (username.length === 0) {
      formerror.username = "Username is empty";
      flag = false
      this.setState({
        usernameValid: false
      });
    }
    if (password.length < 3) {
      formerror.password = "Password can't less then 4";
      flag = false
      this.setState({
        passwordValid: false
      });
    }
    return flag;
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    //if something wrong when validation return to render the component
    const flag = this.validateForms()
    if (flag) {
      const userData = {
        username: this.state.username,
        password: this.state.password
      };
      //redux login
      this.props.loginUser(userData);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          {/* show error message when login */}
          <Typography align="center" color="error" display="block">
            {this.state.error}
          </Typography>

          <form
            noValidate
            className={classes.form}
            onSubmit={this.handleSubmit}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              className="input"
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={this.handleChange}
              error={!this.state.usernameValid}
              helperText={this.state.formerror.username}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              className="input"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleChange}
              error={!this.state.passwordValid}
              helperText={this.state.formerror.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

//set poperty types for this component
Login.propTypes = {
  loginUser: PropTypes.func,
  auth: PropTypes.object,
  error: PropTypes.object,
  classes: PropTypes.object.isRequired
};

//putting action state to this component props
const mapStateToProps = state => ({
  auth: state.auth,
  error: state.errors
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { loginUser }
  )
)(Login);
