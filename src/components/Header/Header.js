import React, { Component } from "react";
import "./Header.css"
import "font-awesome/css/font-awesome.min.css";

import { Link } from "react-router-dom";

class Header extends Component {

    render() {
        return (
            <div className="header-container">
                <div className="logo-wrapper">
                    <Link to="/" className="header-links logo-container">
                        <h2>WishTrip</h2>
                        <i class="fa fa-plane plane-icon"></i>
                    </Link>
                </div>
                <div className="links-container">
                    <Link to="/" className="header-links">LandingPage</Link>
                    <Link to="/login" className="header-links">Login</Link>
                    <Link to="/plan" className="header-links">Plan</Link>
                    <Link to="/profile" className="header-links">Profile</Link>
                    <Link to="/trips" className="header-links">Trips</Link>
                </div>
            </div>
        )
    }
}

export default Header;