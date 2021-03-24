import React, { Component } from 'react';
import  MovieList from '../../components/MovieList/MovieList';
import axiosFirebase from '../../axios-movies';
import axios from 'axios';
import Icon from '@material-ui/core/Icon';
import { withRouter } from 'react-router-dom';
import classes from './SearchMovies.module.css';
import { Route } from 'react-router-dom';
import { Form, Button, Jumbotron, Badge, CardDeck, Spinner} from 'react-bootstrap';
import Aux from '../../hoc/Aux/Aux';
import  MovieDetails from '../../components/MovieDetails/MovieDetails';

class SearchMovies extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchString: '',
            movieList: [],
            selectedMovie: null,
            selectedMovieList: [],
            loading: false,
            errors: ''
        }
    }

    onChangeInputHandler = (event) => {
        this.setState({searchString: event.target.value});
    }

    searchMovies = (event) => {
        this.setState({loading: true});
        event.preventDefault();
        axios.get('https://www.omdbapi.com/?apikey=2005d8c2&s='+this.state.searchString+'&plot=full')
        .then(res => res.data)
        .then(res => {
            const movieList = [];
            if(res.Search) {
                const resPromises = res.Search.map(item => {
                    return axios.get(`https://www.omdbapi.com/?i=${item.imdbID}&apikey=2005d8c2`)
                });
                Promise.all(resPromises)
                .then(responses => {
                    console.log(responses);
                    responses.map(item => {
                        movieList.push(item.data);
                    });
                    this.setState({ movieList: movieList, loading: false, errors: ""  });
                }).catch((error) => {
                    this.setState({loading: false });
                });
            } 
            if(res.Error) {
                this.setState({ errors: res.Error });
            }
            this.setState({loading: false });
        }).catch((error) => {
            this.setState({loading: false, errors: error });
        });
        console.log("Promise finished");
    }

    addToMovieList = () => {
        this.setState({loading: true})
        const movieList = this.state.selectedMovieList;
        axiosFirebase.post( '/movielist.json', movieList)
            .then( response => {
                this.setState( { loading: false, selectedMovieList: null } );
                this.props.history.push('/movies');
            } )
            .catch( error => {
                this.setState( { loading: false, errors: error ,selectedMovieList: null } );
            });
    }
    
    onMovieClick = (item) => {
        this.setState({selectedMovie: item});
        this.props.history.push(this.props.match.url + '/' + item.imdbID);
    }

    clicked = () => {
        this.setState({selectedMovie: null});
        this.props.history.push(this.props.match.url);
    }
    
    onMovieSelect = (movie, movieIndex, isMovieSelected) => {
        this.setState({selectedMovie: null});
        const selectedMovieIndex = this.state.selectedMovieList.findIndex( (item) => {
            return item.imdbID === movie.imdbID
        });
        const originalMovie = {
            ...this.state.movieList[movieIndex],
            isSelected: isMovieSelected
        }
        const newMovieList = [].concat(this.state.movieList);
        newMovieList[movieIndex] = originalMovie;
        if(selectedMovieIndex !== -1) {
            if(!isMovieSelected) {
                const selectedMovieListArr = this.state.selectedMovieList.concat();
                this.setState({
                    selectedMovieList: selectedMovieListArr.splice(selectedMovieIndex, 1)
                });
            }
        } else {
            const selectedMovieListArr = [].concat(this.state.selectedMovieList);
            selectedMovieListArr.push(movie);
            this.setState({
                selectedMovieList: selectedMovieListArr
            });
        }    
        this.setState({
            movieList: newMovieList
        })
    }

    render() {
        let serachForm = null;
        let addMovieListBtn = null;

         serachForm = (<Jumbotron className={classes.jumbotron}>
                    <Form onSubmit={this.searchMovies} className={classes.searchForm}>
                        <Form.Control onChange={(event) => this.onChangeInputHandler(event)} type="text" value={this.state.searchString} placeholder="Enter keyword to search any movie" />
                        <Button type="submit" variant="primary"><Icon>search</Icon></Button>
                    </Form>
         <div className={classes.errorMsg}>{this.state.errors}</div>
                </Jumbotron>);
    
        let movieList = this.state.loading ? <Spinner animation="border" className={classes.Spinner} role="status">
        <span className="sr-only">Loading...</span>
        </Spinner> : null;    

        if(!this.state.loading  && !this.state.selectedMovie && this.state.movieList.length > 0) {
            movieList =  (<div className={classes.cardDesk}>
            <MovieList 
                onMovieSelect={(movieItem, movieIndex, isMovieSelected) => this.onMovieSelect(movieItem, movieIndex, isMovieSelected)} 
                onClickHandler={(movieId) => this.onMovieClick(movieId)}
                isSelectIcon
                isFavouriteIcon={false}
                movieList={this.state.movieList}>
            </MovieList>
            </div>)

            addMovieListBtn = (<div className={classes.AddToMovie}>
                <Button variant="primary" onClick={ () => this.addToMovieList()} className={classes.addBtn}>
                Add To Movie List <Badge variant="light">{this.state.selectedMovieList ? this.state.selectedMovieList.length : 0}</Badge>
                <span className="sr-only">unread messages</span>
                </Button>
            </div>)
        }

        return (
            <Aux>
                {!this.state.selectedMovie ? serachForm : null}
                {addMovieListBtn}
                {movieList}
                {this.state.selectedMovie ? 
                <MovieDetails {...this.state.selectedMovie} backToListClicked={() => this.clicked()}  />
                : null}
            </Aux>
        )
    }
}

export default withRouter(SearchMovies);