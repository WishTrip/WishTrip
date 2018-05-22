import React, { Component } from "react";
import "./Header.css"
import "font-awesome/css/font-awesome.min.css";

import { Link } from "react-router-dom";

class Header extends Component {
    state = {
        burgerFlag: false
    }

    render() {
        const { burgerFlag } = this.state;
        return (
            <div>
                <div className="header-container">
                    <div className="burger" onClick={() => this.setState({ burgerFlag: !burgerFlag })}>
                        <div className={burgerFlag ? "top" : "top topBun"} />
                        <div className={burgerFlag ? "middle" : null} />
                        <div className={burgerFlag ? "bottom" : "bottom bottomBun"} />
                    </div>
                    <div className="logo-wrapper">
                        <Link to="/" className="header-links logo-container">
                            <h2>WishTrip</h2>
                            <i class="fa fa-plane plane-icon"></i>
                        </Link>
                    </div>
                    <div className="links-container">
                        <Link to="/" className="header-links">Home</Link>
                        <Link to="/login" className="header-links">Login</Link>
                        <Link to="/plan" className="header-links">Plan</Link>
                        <Link to="/profile" className="header-links">Profile</Link>
                        <Link to="/trips" className="header-links">Trips</Link>
                    </div>
                </div>
                {!burgerFlag ? (
                    <div className="hamburger-links-container">
                        <Link to="/" className="hamburger-links">Home</Link>
                        <Link to="/login" className="hamburger-links">Login</Link>
                        <Link to="/plan" className="hamburger-links">Plan</Link>
                        <Link to="/profile" className="hamburger-links">Profile</Link>
                        <Link to="/trips" className="hamburger-links">Trips</Link>
                    </div>
                ) : null}
            </div>
        )
    }
}

export default Header;