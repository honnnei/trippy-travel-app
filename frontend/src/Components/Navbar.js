import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navigation">
            <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navigation">
                <div className="logo">
                    <span class="navbar-brand mb-0 h1">Navbar</span>
                </div>

                <div className="navitem">
                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                                Active
                </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Link
                </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;