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
            {/* <Navbar.Brand>
            <img
                src="../images/travel.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
            />
            </Navbar.Brand> */}
            <Navbar.Brand href="/feed">Trippy</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Nav>
                    {localStorage.usertoken ?
                    <Nav>
                        <Nav.Link href="/profile"> Profile </Nav.Link>
                        <Nav.Link href="/settings"> Settings </Nav.Link>
                        <Nav.Link href="/" onClick={logout}> Log Out </Nav.Link>
                    </Nav>
                    :
                    <Nav.Link href="/" onClick={login}> Log In </Nav.Link>
                    }               
                </Nav>
            </Navbar.Collapse>
        </Navbar>   
        </div>
    );
};

export default NavbarComponent;