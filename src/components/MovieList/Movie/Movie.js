import React, { Component } from 'react'
import classes from './Movie.module.css';
import Icon from '@material-ui/core/Icon';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const Movie = (props) =>  {  
            let classList = [classes.card_view];
            let cardIcon = null
            let deleteMovieIcon = null;
            if(props.movieDetails.isSelected) {
                classList = [classes.card_view, classes.card_view_selected]
            }
            if(props.movieDetails.isDeleted) {
                return null;
            }
            if(props.isSelectIcon) {
                cardIcon = (<div className={classes.checkCircleIcon}>
                        <span className={ props.movieDetails.isSelected ? 
                            classes.selected : classes.unselected}>
                            <CheckCircleIcon>
                            </CheckCircleIcon>
                        </span>
                </div>);
            }
            if(props.isFavouriteIcon) {
                cardIcon =  (<div onClick={ () => props.makeFavourite(props.movieDetails)} className={
                     props.movieDetails.isFavourite ? 
                    [classes.movie_fovourite_icon, classes.isFovourite].join(' ')
                    : [classes.movie_fovourite_icon, classes.isNotFovourite].join(' ')
                    }>
                 <Icon></Icon></div>);
                 if(!props.isFavouriteMoviesTab){
                    deleteMovieIcon = (<div onClick={props.deleteMovie} className={classes.deleteMovieIcon}>
                    <Tooltip title="Delete movie">
                    <IconButton aria-label="delete">
                    <DeleteIcon />
                    </IconButton>
                    </Tooltip>
                    </div>);
                }
            }

    return (
        <div className={classList.join(' ')}>
            <div onClick={props.clicked}
                className={classes.card_header +" " + classes.missionImpossible}
                style={{ backgroundImage: `url(${props.movieDetails.Poster})` }}>
                <div className={classes.card_header_icon}>
                        <Icon className={classes.header_icon}>play_arrow</Icon>
                </div>
            </div>
            <div className={classes.card_movie_content} onClick={() => props.onMovieSelected(!props.isSelected, props.movieDetails)} >
                <div className={classes.card_movie_content_head}>
                    <h3 className={classes.card_movie_title}>{props.movieDetails.Title}</h3>
                    <div className={classes.ratings}><span>{props.movieDetails.imdbRating}</span>/10</div>
                </div>
                <div className={classes.card_movie_info}>
                    <div className={classes.movie_running_time}>
                        <label>Release Year</label>
                        <span>{props.movieDetails.Year}</span>
                    </div>
                    <div className={classes.movie_running_time}>
                        <label>Running time</label>
                        <span>{props.movieDetails.Runtime}</span>
                    </div>
                </div>
                <div className={classes.card_movie_info}>
                    <div className={classes.movie_running_time}>
                        <label>Languages</label>
                        <span>{props.movieDetails.Language}</span>
                    </div>
                </div>
            </div>
            <div className={classes.movieIcons}>
                    {cardIcon}
                    {deleteMovieIcon}
                </div>
        </div>
    );   
}

export default Movie;