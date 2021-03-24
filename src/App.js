import React, { Component } from 'react';
import { Route, Redirect, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { withRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Movies  from './containers/Movies/Movies';
import MovieDetails  from './components/MovieDetails/MovieDetails';
import Songs  from './containers/Songs/Songs';
import SearchMovies  from './containers/Search/SearchMovies';
import  SignUp from './containers/Auth/SignUp/SignUp';
import  Login from './containers/Auth/Login/Login';
import { authCheckState } from './shared/Utility';
import Profile  from './containers/Profile/Profile';

class App extends Component {

  state = {
    isAuthenticated: false
  }

  isLoginIn = (isAuth) => {
    if(isAuth) {
      this.setState({isAuthenticated: isAuth});
    }
  }
  
  componentDidMount() {
    let isValid = authCheckState();
    if(isValid) {
      this.setState({isAuthenticated: true});
      this.props.history.push('/Search');
    }
  }
  
  render() {
    let routes = null;
    let isValid = authCheckState();
    if(!isValid) {
      routes = (
        <Switch>
          <Route path="/Login"  render={()=> <Login isAuthenticated={isValid}
            isLoginIn={(isAuth)=>this.isLoginIn(isAuth)}
          ></Login>} />
          <Route path="/SignUp"  exact component={SignUp} />
          <Redirect from="*" to="/Login" ></Redirect>
        </Switch> 
      );
    }
    if(isValid) {
      routes = (
        <Layout>
          <Switch>
              <Route path="/Search"  component={SearchMovies} /> 
              <Route path="/Profile"   exact component={Profile} />
              <Route path="/FavMovies"   render={()=><Movies isFavouriteMoviesTab ></Movies>} />
              {/* <Route path="/FavMovies/:id"   exact component={MovieDetails} /> */}
              <Route path="/Movies"    component={()=><Movies isFavouriteMoviesTab={false}></Movies>} />
              {/* <Route path="/Movies/:id"   exact component={MovieDetails} /> */}
              <Redirect from="*" to="/Search" ></Redirect>
          </Switch>
        </Layout>
      )
    }
    return (
    <div className="App">
      {routes}
    </div>
    );
  }
}

export default withRouter(App);
