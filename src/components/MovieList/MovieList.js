import React, { Component } from 'react';
import Movie from '../../components/MovieList/Movie/Movie';
import { withRouter } from 'react-router-dom';
import { CardDeck } from 'react-bootstrap';
import DialogBox from '../../shared/DialogBox';
import { deleteDialogBox }  from '../../shared/Utility';
import classes from './Movie/Movie.module.css';

const MovieList = (props) => {
    let movieList = null;
    const [open, setOpen] = React.useState(false);
    const [movie, setMovie] = React.useState(0);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOk = () => {
        props.deleteMovie(movie);
        setOpen(false);
    };

    if(props.movieList && props.movieList.length > 0) {
        movieList = props.movieList.map((item, index)=> {
            return <Movie
            onMovieSelected = { (isSelected, movieData) => 
                {
                    if(props.isSelectIcon){
                    props.onMovieSelect(movieData, index, isSelected)
                    } else {
                        return false;
                    }

                }}
            clicked={() => props.onClickHandler(item)} 
            key={index} 
            deleteMovie={() => {
                setOpen(true);
                setMovie(item);
            }}
            movieDetails={{...item}} 
            isFavouriteMoviesTab={props.isFavouriteMoviesTab}
            isSelectIcon={props.isSelectIcon}
            makeFavourite = {(movieData) => props.onMakeFavouriteHandler(movieData, index)}
            isFavouriteIcon={props.isFavouriteIcon}></Movie>
        });
    } 

    const allDeleted = props.movieList.every(item => item.isDeleted);
    if(allDeleted || (props.movieList && props.movieList.length === 0)) {
        if(props.isFavouriteIcon) {
            if(props.isFavouriteMoviesTab) {
                movieList = (<div className={classes.noMoviesFound}>
                    <h2>No movie found in Favourite movies list</h2>
                </div>);
            } else {
            movieList = (<div className={classes.noMoviesFound}>
                <h2>No movie found in the your movie list</h2>
            </div>);
            }
        } else {
            movieList = (<div className={classes.noMoviesFound}>
                <h2>We could not find movies matching your search keywords.</h2>
            </div>);
        }
    }
    
    
    return (
        <>
        <CardDeck>
            {movieList}
        </CardDeck>
        <DialogBox {...deleteDialogBox}
        open={open}
        handleClose={handleClose}
        handleOk={handleOk}></DialogBox>
      </>
    )
}
 
export default withRouter(MovieList);