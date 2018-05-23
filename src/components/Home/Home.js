import React, { Component } from "react";
import "./Home.css";
import Background from "../Background/Background";

import { connect } from "react-redux"; 
import { toggleHamburgerBtn } from "../../ducks/viewReducer";

class Home extends Component {


    handleHamburgerMenu = () => {
        if (!this.props.burgerFlag) {
            this.props.toggleHamburgerBtn()
        }
    }

    render() {
    return (
        <div onClick={() => this.handleHamburgerMenu()}>
            <Background />
            <p>Home</p>
        </div>
    )}
}

const mapStateToProps = state => ({
    ...state.viewReducer
})

export default connect(mapStateToProps, { toggleHamburgerBtn })(Home);