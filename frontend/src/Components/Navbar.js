import React from "react";
import { Navbar, Nav } from 'react-bootstrap';

const NavbarComponent = () => {

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('usertoken');
        window.location.href = "/";
    }

    const login = (e) => {
        e.preventDefault();
        window.location.href = "/";
    }

    return (
        <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>
            <img
                src={require('../images/trippy_logo.png')}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
            />
            </Navbar.Brand>
            <Navbar.Brand href="/feed" id="trippy-logo-text">Trippy</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Nav>
                    {localStorage.usertoken ?
<<<<<<< HEAD
                    <Nav id="trippy-logo-text">
                        <Nav.Link href="/profile"> Profile </Nav.Link>
                        <Nav.Link href="/settings"> Settings </Nav.Link>
                        <Nav.Link href="/" onClick={logout}> Log Out </Nav.Link>
=======
                    <Nav>
                        <Nav.Link href="/profile" className="login-logout-button"> Profile </Nav.Link>
                        <Nav.Link href="/settings" className="login-logout-button"> Settings </Nav.Link>
                        <Nav.Link href="/" className="login-logout-button" onClick={logout}> Log Out </Nav.Link>
>>>>>>> 01a1443dc7263bee7b3356f2d3b5b2a329695d03
                    </Nav>
                    :
                    <Nav.Link href="/" className="login-logout-button" onClick={login}> Log In </Nav.Link>
                    }               
                </Nav>
            </Navbar.Collapse>
        </Navbar>   
        </div>
    );
};

export default NavbarComponent;