import React, { Component } from "react";
import "./LandingPage.css"
import "font-awesome/css/font-awesome.min.css";

import { connect } from "react-redux"; 
import { toggleHamburgerBtn } from "../../ducks/viewReducer";

import { Link } from "react-router-dom";
class LandingPage extends Component {
    state = {
        codeInput: ""
    }

    handleCodeInput(val) {
        this.setState({
            codeInput: val
        })
    }

    handleHamburgerMenu = () => {
        if (!this.props.burgerFlag) {
          this.props.toggleHamburgerBtn()
        }
    }

    render() {
        const { codeInput } = this.state;
        return (
            <div className="landingpage-wrapper" onClick={() => this.handleHamburgerMenu()}>
                <div className="landingpage-container">
                    <div>
                        <div className="landingpage-logo-codeinput-wrapper">
                            <div className="landingpage-logo-container">
                                <h2 className="landingpage-brand-text">WishTrip</h2>
                                <i className="fa fa-plane plane-icon"></i>
                            </div>
                            <div className="landingpage-codeinput-container">
                                <input className="landingpage-codeinput" type="text" value={codeInput} placeholder="Enter Code Here" onChange={e => this.handleCodeInput(e.target.value)} />
                            </div>
                        </div>
                        <div className="landingpage-login-container">
                            <p className="landingpage-login-text">Already have an account?</p>
                            <Link to="/login" className="landingpage-login-link">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.viewReducer
})

export default connect(mapStateToProps, { toggleHamburgerBtn })(LandingPage);