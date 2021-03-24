import React, { Component } from 'react';
import classes from './MovieDetails.module.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

const MovieDetails = (props) => {

    return  (
            <Container className={classes.MovieContainer}>
                <h2 className={classes.MovieInfo}>
                    <small>Movie Info</small>
               </h2>
                <hr/>
                <div className={classes.MovieDetails}>
                <Row>
                    <Col>
                        <div className={classes.MovieLogo}
                         style={{ backgroundImage: `url(${props?.Poster})`,
                         height: '100%' }}>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <h3 className={classes.MovieTitle}>{props?.Title}</h3>
                        <div className={classes.MovieLabels}>
                           <div className={classes.details}>
                               <label>Genre:</label>
                               <p>{props?.Genre}</p>
                           </div>
                           <div className={classes.details}>
                               <label>Released:</label>
                               <p>{props?.Released}</p>
                           </div>
                           <div className={classes.details}>
                               <label>Director:</label>
                               <p>{props?.Director}</p>
                           </div>
                           <div className={classes.details}>
                               <label>IMDB Rating:</label>
                               <p>{props?.imdbRating}</p>
                           </div>
                           <div className={classes.details}>
                               <label>Writer:</label>
                               <p>{props?.Writer}</p>
                           </div>
                           <div className={classes.details}>
                               <label>Action:</label>
                               <p>{props?.Actors}</p>
                           </div>
                           <div className={classes.details}>
                               <label>Awards:</label>
                               <p>{props?.Awards}</p>
                           </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Card className={classes.Plot}>
                        <Card.Body>
                            <Card.Title><h2>Plot</h2></Card.Title>
                            <Card.Text>
                                {props?.Plot}
                            </Card.Text>
                            <Row>  
                            <Col> 
                                <Button variant="primary">View on IMDB</Button>
                            </Col>
                            <Col> 
                                <Button onClick={props.backToListClicked ?
                                    props.backToListClicked :
                                    this.backToMovies} variant="secondary">Back To Movies</Button>
                            </Col>
                            <Col xs={8}></Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>    
                </div>
            </Container>
        )
}

export default withRouter(MovieDetails);