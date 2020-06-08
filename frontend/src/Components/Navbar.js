import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';

const NavbarComponent = () => {

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('usertoken');
    }

    const login = (e) => {
        e.preventDefault();
    }

    return (
        <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/feed">Trippy</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Nav>
                    <Nav.Link href="#profile"> Profile </Nav.Link>
                </Nav>
                <Nav>

                    {localStorage.usertoken ? 
                    <Nav.Link href="/" onClick={logout}> Log Out </Nav.Link>
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

{/* <div className="navitem">
//     <ul className="nav justify-content-end">
//     <li className="nav-item">
//             <a className="nav-link active" href="/">
//                 SignUp
//             </a>
//         </li>
//         <li className="nav-item">
//             <a className="nav-link active" href="/feed">
//                 Feed
//             </a>
//         </li>
//         <li className="nav-item">
//             <a className="nav-link" href="/profile">
//                 Profile
//             </a>
//         </li>
//         <li className="nav-item">
//             <a className="nav-link active" href="/trip">
//                 trip
//             </a>
//         </li>
//     </ul>
// </div> */}