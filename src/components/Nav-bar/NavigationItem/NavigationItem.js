import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => {
    return (
    <Nav.Link as={NavLink} to={props.link}
    exact={props.exact}
    activeClassName="active">
        {props.children}
    </Nav.Link>
    );
}

export default NavigationItem;
