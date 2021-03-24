import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { withRouter, NavLink } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import classes from './Login.module.css';
import  { checkValidity } from '../../../shared/Utility';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

class Login extends Component {

  state = null;
  constructor() {
      super();
      this.state = {
          fields: {
              email : "",
              password : ""
          },
          fieldErrors: {},
          errors: null
      }
      this.handleChange = this.handleChange.bind(this);
      this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
  };

  handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      const errors = this.state.fieldErrors;
      let password = '';
      const error = checkValidity(e.target.name, e.target.value, password);
      errors[e.target.name] = error;
      this.setState({
          fields,
          fieldErrors: errors
      });
  }

  submituserRegistrationForm(e) {
      e.preventDefault();
      if (this.validateForm()) {
        const authData = {
          email: this.state.fields['email'],
          password: this.state.fields['password'],
          returnSecureToken: true
        }
        let Url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDfTriynmZY0IgzgZNwsxDl35NmK3ZnZ8M';
        axios.post(Url, authData).then(response => {
          let expirationDate = new Date(new Date().getTime() + parseInt(response.data.expiresIn) * 1000);
          sessionStorage.setItem('token', response.data.idToken);
          sessionStorage.setItem('expirationDate', expirationDate);
          sessionStorage.setItem('userId', response.data.localId);
          this.resetFields();
          this.props.isLoginIn(true);
        }).catch(error => {
          if (error && error.response) {
              console.log(error.response.status);
              console.log(error.response.headers);
              this.setState({errors: 'Please enter correct Email and password '});
          } else if (error && error.request) {
              console.log(error.request);
              this.setState({errors: error.response.request});
            } else {
              console.log('Error', error);
              this.setState({errors: error});
            }
            this.props.isLoginIn(false);
          console.log(error.config);
        })
      }
  }
    
  resetFields() {
      let fields = {};
      fields["email"] = "";
      fields["password"] = "";
      this.setState({fields:fields, fieldErrors: {}, errors: null});
  }

  validateForm = (field) => {
      let errors = {};
      let formIsValid = true;
      let password = '';
      for(field in this.state.fields){
          let error = checkValidity(field, this.state.fields[field], password);
          if(error) {
              errors[field] = error;
              formIsValid = false;
          }
      }
      this.setState({
        fieldErrors: errors
      });
      return formIsValid;
  }
  alertDismissible = () => {
    this.setState({
      errors: null
    });
  }
 

  render() {  
      
      return (
          <Container component="main" maxWidth="xs" className={classes.card} onSubmit= {this.submituserRegistrationForm}>
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Alert variant="danger" 
              onClose={() => this.alertDismissible()} 
              dismissible key='danger' 
              className={classes.alert_danger} 
              show={this.state.errors}
              variant='danger'>{this.state.errors}</Alert>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={this.state.fields.email} 
                  onChange={this.handleChange}
                />
                <div className={classes.errorMsg}>{this.state.fieldErrors.email}</div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.fields.password} 
                  onChange={this.handleChange}
                />
                <div className={classes.errorMsg}>{this.state.fieldErrors.password}</div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.signINsubmit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <NavLink exact to={"/SignUp"}>
                      {"Don't have an account? Sign Up"}
                    </NavLink>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
      );
  }
}

export default withRouter(Login); 