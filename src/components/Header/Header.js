import React, {Component} from "react";
import "./Header.css"

import { Link } from "react-router-dom";

class Header extends Component {

    render() {
        return (
            <div className="links-container">
                <Link to="/" className="header-links">LandingPage</Link>
                <Link to="/login" className="header-links">Login</Link>
                <Link to="/plan" className="header-links">Plan</Link>
                <Link to="/profile" className="header-links">Profile</Link>
                <Link to="/trips" className="header-links">Trips</Link>
            </div>
        )
    }
}

export default Header;