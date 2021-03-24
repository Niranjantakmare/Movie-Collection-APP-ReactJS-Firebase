import React, { Component } from 'react'
import Header from '../../components/Header/Header';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import { Container } from 'react-bootstrap';
import MovieDetails from '../../components/MovieDetails/MovieDetails';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <Aux>
                <Header></Header>
                <Container>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                </Container>
            </Aux>
        );
    }
}
 
export default Layout;