import React, { Component } from "react";
import "./Header.css"
import "font-awesome/css/font-awesome.min.css";
import { auth } from '../../firebase';

import { Link } from "react-router-dom";
import { connect } from "react-redux"; 
import { toggleHamburgerBtn, toggleLogin } from "../../ducks/viewReducer";

class Header extends Component {
    render() {
        const { burgerFlag, loginFlag, toggleLogin } = this.props;
        
        var loginLink = (
            !this.props.loginFlag ? (<Link to="/login" className="header-links">Login</Link>) : (
                <Link to="/" className="header-links" onClick={() => {auth.signOut(), toggleLogin()}}>Logout</Link>
            )
        )
        return (
            <div>
                <div className="header-wrapper">
                    <div className="header-container">
                        <div className="burger" onClick={() => this.props.toggleHamburgerBtn()}>
                            <div className={burgerFlag ? "top topBun" : "top"} />
                            <div className={burgerFlag ? null : "middle"} />
                            <div className={burgerFlag ? "bottom bottomBun" : "bottom"} />
                        </div>
                        <div className="logo-wrapper">
                            <Link to="/" className="header-links logo-container">
                                <h2>WishTrip</h2>
                                <i className="fa fa-plane plane-icon"></i>
                            </Link>
                        </div>
                        <div className="links-container">
                            {/* <Link to="/home" className="header-links">Home</Link> */}
                            {/* <Link to="/login" className="header-links">Login</Link> */}
                            {loginLink}
                            <Link to="/profile" className="header-links">Profile</Link>
                            <Link to="/trips" className="header-links">Trips</Link>
                        </div>
                    </div>
                </div>
                {!burgerFlag ? (
                    <div style={{display: "none"}} className="hamburger-links-container" >
                        {/* <Link to="/home" className="hamburger-links">Home</Link> */}
                        {/* <Link to="/login" className="hamburger-links">Login</Link> */}
                        {loginLink}
                        <Link to="/profile" className="hamburger-links">Profile</Link>
                        <Link to="/trips" className="hamburger-links">Trips</Link>
                    </div>
                ) : <div  className="hamburger-links-container">
                {/* <Link to="/home" className="hamburger-links">Home</Link> */}
                {/* <Link to="/login" className="hamburger-links">Login</Link> */}
                {loginLink}
                <Link to="/profile" className="hamburger-links">Profile</Link>
                <Link to="/trips" className="hamburger-links">Trips</Link>
            </div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.viewReducer
})

export default connect(mapStateToProps, { toggleHamburgerBtn, toggleLogin })(Header);