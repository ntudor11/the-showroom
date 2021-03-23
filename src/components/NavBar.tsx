import React from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Image } from "react-bootstrap";
import Logo from '../images/showroom-logo.svg';

const NavBar: React.FC = () => {
    return (
        <Navbar
            bg="light"
            expand="sm"
            collapseOnSelect
        >
            <Navbar.Brand>
                <NavLink exact to="/">
                    <Image alt="the-showroom-logo" src={Logo} width="100"/>
                </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar" />
                <Navbar.Collapse id="navbar">
                    <Nav className="ml-auto">
                        <NavLink exact activeClassName="active" to="/" className="nav-link">Home</NavLink>
                        <NavLink exact activeClassName="active" to="/products" className="nav-link">Products</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;