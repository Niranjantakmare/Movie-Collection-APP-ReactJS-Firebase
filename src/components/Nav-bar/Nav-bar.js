import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { withRouter } from 'react-router-dom'; 
import classes from './Nav-bar.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import  ProfileMenu from '../ProfileMenu/ProfileMenu';
import Logo from '../Logo/Logo';

const NavBar = (props) => {
    return (
        <Navbar className={classes.Navbar} collapseOnSelect bg="light" expand="lg">
        <Navbar.Brand href="#home"><Logo></Logo></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className={classes.Nav + " mr-auto"}>
                <NavigationItem exact='false' link="/Search">SEARCH</NavigationItem>
                <NavigationItem exact='false' link="/Movies">MY MOVIES LIST</NavigationItem>
                <NavigationItem exact='false' link="/FavMovies">FAV MOVIES</NavigationItem>
            </Nav>
            <Nav className={classes.Nav + " justify-content-end" + classes.ProfileNav}>
             <ProfileMenu {...props}></ProfileMenu>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
}

export default withRouter(NavBar);