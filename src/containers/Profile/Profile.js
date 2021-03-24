import React,{ Component } from "react";
import classes from './Profile.module.css';
import Container from 'react-bootstrap/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import firebaseAxios from '../../axios-movies';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { checkValidity } from '../../shared/Utility';
import Alert from 'react-bootstrap/Alert';

class Profile extends Component {
    state = null;
    constructor() {
      super();
      this.state = {
        fields: {
            firstName : "",
            lastName : "",
            address1 : "",
            address2 : "",
            city : "",
            state : "",
            country : "",
            zip: ""
        },
        fieldErrors: {},
        errors: null,
        loading: true,
        success: null
      }
    }

    CancelToken = axios.CancelToken;
    source = this.CancelToken.source();

    componentDidMount() {
      firebaseAxios.get( 'users.json',
         { cancelToken: this.source.token})
            .then( response => {
              console.log(response.data);
                const userId = sessionStorage.getItem('userId')
                for(let key in response.data) {
                    console.log(response.data[key]);
                    console.log(userId);
                    if(response.data[key].userId == userId) {
                      let updatedFields = {...this.state.fields, ...response.data[key], key: key};
                      this.setState({fields: updatedFields, loading: false});
                    }
                }
            })
            .catch( error => {
                this.setState( { error: true } );
            } );
    }

    componentWillUnmount() {
      this.source.cancel("Operation canceled by the user.");

    }

    alertDismissible = () => {
      this.setState({
        errors: null,
        success: null
      });
    }

    submituserRegistrationForm = (e) => {
      e.preventDefault();
      if (this.validateForm()) {
        this.setState({loading: true});
        const userData = {
          ...this.state.fields,
          returnSecureToken: true
        }
          const response = firebaseAxios.put('users/' + userData.key+'.json', userData)
          .then(response => {
              console.log(response);
              this.setState({loading: false});
              this.setState({success: 'Profile has been updated successfully'});
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
          console.log(response)
          console.log(response.data)
  
      }
    }

    handleChange = (e) => {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      const errors = this.state.fieldErrors;
      let passwordValue = '';
      const error = checkValidity(e.target.name, e.target.value, passwordValue);
      errors[e.target.name] = error;
      this.setState({
          fields,
          fieldErrors: errors
      });
    }

    validateForm = (field) => {
        let errors = {};
        let formIsValid = true;
        let passwordValue = '';
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

    render() {
        if(this.state.loading) {
          return (
            <Spinner animation="border" className={classes.Spinner} role="status">
            <span className="sr-only">Loading...</span>
            </Spinner>
          );
        }
        return (
            <Container className={classes.ProfileContainer}>
                <h2 className={classes.ProfileInfo}>
                    <small>Profile View</small>
               </h2>
                <hr/>
                <div className={classes.ProfileDetails}>
                <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                { this.state.fields.firstName?.charAt(0).toUpperCase() +  this.state.fields.lastName?.charAt(0).toUpperCase() }
                </Avatar>
                <Alert variant="danger" 
                onClose={() => this.alertDismissible()} 
                dismissible key='danger' 
                className={classes.alert_danger} 
                show={this.state.errors ? true : false}
                variant='danger'>{this.state.errors}</Alert>
                <Alert variant="success" 
                onClose={() => this.alertDismissible()} 
                dismissible key='success' 
                className={classes.alert_success} 
                show={this.state.success ? true : false}
                variant='success'>{this.state.success}</Alert>
                <form className={classes.form} noValidate onSubmit= {this.submituserRegistrationForm}>
                  <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                value={this.state.fields?.firstName} 
                onChange={this.handleChange}
              />
              <div className={classes.errorMsg}>{this.state.fieldErrors.firstName}</div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                value={this.state.fields?.lastName} 
                onChange={this.handleChange}
              />
              <div className={classes.errorMsg}>{this.state.fieldErrors.lastName}</div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Address line 1"
                fullWidth
                value={this.state.fields?.address1} 
                onChange={this.handleChange}
              />
              <div className={classes.errorMsg}>{this.state.fieldErrors.address1}</div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address2"
                name="address2"
                label="Address line 2"
                fullWidth
                value={this.state.fields?.address2} 
                onChange={this.handleChange}
              />
              <div className={classes.errorMsg}>{this.state.fieldErrors.address2}</div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                value={this.state.fields?.city} 
                onChange={this.handleChange}
              />
              <div className={classes.errorMsg}>{this.state.fieldErrors.city}</div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="state"
                name="state"
                label="state"
                fullWidth
                value={this.state.fields?.state} 
                onChange={this.handleChange}
              />
              <div className={classes.errorMsg}>{this.state.fieldErrors.state}</div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                value={this.state.fields?.country} 
                onChange={this.handleChange}
              />
              <div className={classes.errorMsg}>{this.state.fieldErrors.country}</div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                value={this.state.fields?.zip} 
                onChange={this.handleChange}
              />
              <div className={classes.errorMsg}>{this.state.fieldErrors.zip}</div>
            </Grid>
            </Grid>
            <Grid item xs={4}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.signUpsubmit}>
              Save
            </Button>
            </Grid>
            </form>
            </div>
            </div>
             </Container>
        );
    }
}

export default Profile;
