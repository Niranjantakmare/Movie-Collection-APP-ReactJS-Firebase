import React, { Component } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import axiosFirebase from '../../axios-movies';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import classes from './Movies.module.css';
import { Route } from 'react-router-dom';
import  MovieDetails from '../../components/MovieDetails/MovieDetails';
import { addRequestHandler}  from '../../shared/Utility';

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            movieList: [],
            loading: true,
            selectedMovie: null
        }
    }

    componentDidMount() {
        axiosFirebase.get( 'movielist.json')
            .then( response => {
            let fetchedObj = [];
            for(let key in response.data) {
                response.data[key].map((item,index)=> {
                    let isAdded = this.props.isFavouriteMoviesTab ? this.props.isFavouriteMoviesTab && item.isFavourite ? true : false : true; 
                    if(isAdded) {
                        fetchedObj.push({
                            ...item,
                            isFavourite: item.isFavourite !== undefined ? item.isFavourite : false, 
                            id: key,
                            index: index
                        })
                    }
                });
            }
            console.log(fetchedObj);
            this.setState( { movieList: fetchedObj.reverse(), loading: false} );
        } )
        .catch( error => {
            this.setState( { error: true } );
        } );
    }

    onMovieClick = (item) => {
        this.setState({selectedMovie: item});
        // this.props.history.push(this.props.match.url + '/' + item.imdbID);
    }

    clicked = () => {
        this.setState({selectedMovie: null});
        // this.props.history.push(this.props.match.url);
    }

    deleteMovie = (movieData) => {
        axiosFirebase.interceptors.request.use(
          request => addRequestHandler(request)
        )
        const updatedData = {
            ...movieData,
            isDeleted: true
        }
        axiosFirebase.put('movielist/'+movieData.id+'/'+movieData.index+'.json', updatedData)
        .then(response => {
            console.log(response);
            const list = this.state.movieList.map(item => {
                if(item.index === movieData.index) {
                    return response.data;
                } else {
                    return item;
                }
            });
            this.setState({
                movieList: list,
                loading: false  
            })
        });
    }

    makeFavouriteMovie = (movieData, movieIndex) => {
        if(this.props.isFavouriteMoviesTab) {
            this.setState({loading:  true});
        }
        axiosFirebase.interceptors.request.use(
          request => addRequestHandler(request)
        )
        const updatedData = {
            ...movieData,
            isFavourite: !movieData.isFavourite
        }
        axiosFirebase.put('movielist/'+movieData.id+'/'+movieData.index+'.json', updatedData)
        .then(response => {
            console.log(response);
            const list = [...this.state.movieList];
            if(this.props.isFavouriteMoviesTab){
                if(updatedData.isFavourite) {
                    list[movieIndex] = updatedData;
                } else {
                    list.splice(movieIndex,1);
                }
            } else {
                list[movieIndex] = updatedData;
            }
            this.setState({
                movieList: list,
                loading: false  
            })
        });
    }

    render() { 
        let movies = null;
        
        if(this.state.movieList && !this.state.selectedMovie) {
            movies =  <MovieList movieList={this.state.movieList}  
            isSelectIcon={false}
            deleteMovie={(movieData)=> this.deleteMovie(movieData)}
            isFavouriteIcon
            isFavouriteMoviesTab = {this.props.isFavouriteMoviesTab}
            onMakeFavouriteHandler={(movieData, movieIndex) => this.makeFavouriteMovie(movieData, movieIndex)}
            onClickHandler={(movieId) => this.onMovieClick(movieId)}
            ></MovieList>
        }

        if(this.state.loading) {
            return (
                <Spinner animation="border" className={classes.Spinner} role="status">
                <span className="sr-only">Loading...</span>
                </Spinner>
            )
        }
        
        return (
            <div className={classes.cardDesk}>
                { !this.state.selectedMovie ? movies : null}
                {this.state.selectedMovie ?
                <MovieDetails {...this.state.selectedMovie} backToListClicked={() => this.clicked()}  />
                : null
                }
            </div>
        );
    }
}
 
export default withRouter(Movies);