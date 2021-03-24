import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withRouter, NavLink } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import classes from './SignUp.module.css';
import { checkValidity } from '../../../shared/Utility';
import axios from 'axios';
import axiosFirebase from '../../../axios-movies';
import Alert from 'react-bootstrap/Alert';


class SignUp extends Component {

    state = null;
    constructor() {
        super();
        this.state = {
            fields: {
                email : "",
                firstName : "",
                lastName : "",
                password : "",
                confirmPassword : ""
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
        let passwordValue = fields['password'];
        const error = checkValidity(e.target.name, e.target.value, passwordValue);
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
          let Url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDfTriynmZY0IgzgZNwsxDl35NmK3ZnZ8M';
          axios.post(Url, authData).then(response => {
            const userData = {
              email: this.state.fields['email'],
              firstName: this.state.fields['firstName'],
              lastName: this.state.fields['lastName'],
              password: this.state.fields['password'],
              returnSecureToken: true,
              token: response.data.idToken,
              userId: response.data.localId
            }
            axiosFirebase.post('users.json', userData).then(userResponse => {
              console.log(userResponse);
              this.resetFields();
              this.props.history.push('/Login');
            });
          })
          .catch(error => {
            if (error.response) {
                this.setState({errors: error.response});
            } else if (error.request) {
                console.log(error.request);
                this.setState({errors: error.response.request});
              } else {
                console.log('Error', error.message);
                this.setState({errors: error.response.message});
              }
              console.log(error);
          });
        }
      }
      
    resetFields() {    
        let fields = {};
        fields["email"] = "";
        fields["firstName"] = "";
        fields["lastName"] = "";
        fields["password"] = "";
        fields["confirmPassword"] = "";
        this.setState({fields:fields});
    }
    
    validateForm = (field) => {
        let errors = {};
        let formIsValid = true;
        let passwordValue = this.state.fields['password'];
        for(field in this.state.fields){
            let error = checkValidity(field, this.state.fields[field], passwordValue);
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
            <Container component="main" maxWidth="xs" className={classes.card}>
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Alert variant="danger" 
                onClose={() => this.alertDismissible()} 
                dismissible key='danger' 
                className={classes.alert_danger} 
                show={this.state.errors ? true : false}
                variant='danger'>{this.state.errors}</Alert>
                <form className={classes.form} noValidate onSubmit= {this.submituserRegistrationForm}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoFocus
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={this.state.fields.email} 
                        onChange={this.handleChange}
                      />
                      <div className={classes.errorMsg}>{this.state.fieldErrors.email}</div>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        value={this.state.fields.firstName} 
                        onChange={this.handleChange}
                      />
                      <div className={classes.errorMsg}>{this.state.fieldErrors.firstName}</div>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        value={this.state.fields.lastName} 
                        onChange={this.handleChange}
                      />
                      <div className={classes.errorMsg}>{this.state.fieldErrors.lastName}</div>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="password"
                        value={this.state.fields.password} 
                        onChange={this.handleChange}
                      />
                      <div className={classes.errorMsg}>{this.state.fieldErrors.password}</div>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="confirmpassword"
                        value={this.state.fields.confirmPassword} 
                        onChange={this.handleChange}
                      />
                      <div className={classes.errorMsg}>{this.state.fieldErrors.confirmPassword}</div>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.signUpsubmit}
                  >
                    Sign Up
                  </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <NavLink  exact to={"/Login"} variant="body2">
                        Already have an account? Sign in
                      </NavLink>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
          );
    }
} 

export default withRouter(SignUp);