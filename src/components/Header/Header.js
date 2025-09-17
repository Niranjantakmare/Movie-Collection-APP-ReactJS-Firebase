import React, { Component } from 'react';
import  classes from './Header.module.css';
import  NavBar  from '../Nav-bar/Nav-bar';
import { Container } from 'react-bootstrap';

class Header extends Component {
    render() { 
        return (
            <header className={classes.header}>
                 <Container>
                 <NavBar></NavBar>
                </Container>
            </header>
        );
    }
}
 
export default Header;
