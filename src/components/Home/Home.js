import React, { Component } from "react";
import "./Home.css";
import Background from "../Background/Background";
import { connect } from "react-redux";
import { toggleHamburgerBtn } from "../../ducks/viewReducer";
import TimeInput from 'material-ui-time-picker'
// import TextField from '@material-ui/core/TextField';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            day: 1,
            time: new Date(),
            tripNameInput: "",
            destinationInput: "",
            budgetInput: 0,
            notesInput: "",
            agenda: []
        }
        this.handleInput = this.handleInput.bind(this)
    }


    handleHamburgerMenu = () => {
        if (!this.props.burgerFlag) {
            this.props.toggleHamburgerBtn();
        }
    };

    handleInput(key, val) {
        if (key === "budgetInput") {
            return this.setState({
                [key]: Number(val)
            })
        }
        this.setState({ [key]: val });
    }

    createAgenda(name, destination, budget, notes, time) {
        let newArr = this.state.agenda.slice();
        newArr.push({ name, destination, budget, notes, time })
        this.setState({
            agenda: newArr,
            time: new Date(),
            tripNameInput: "",
            destinationInput: "",
            budgetInput: 0,
            notesInput: ""
        })
    }

    render() {
        const { day, time, tripNameInput, destinationInput, budgetInput, notesInput } = this.state;
        console.log(this.state.agenda)
        return (
            <div className="home-wrapper" onClick={() => this.handleHamburgerMenu()}>
                <Background />
                <h2 className="home-day-text">Day {day}</h2>
                <div className="home-container-wrapper">
                    <div className="home-container">
                        <input className="home-name-input home-inputs" type="text" placeholder="Trip Name" value={tripNameInput} onChange={e => this.handleInput('tripNameInput', e.target.value)} />
                        <div className="home-inputs-container">
                            <input className="home-destination-input home-inputs" type="text" placeholder="Trip Destination" value={destinationInput} onChange={e => this.handleInput('destinationInput', e.target.value)} />
                            <input className="home-budget-input home-inputs" type="text" placeholder="Budget for Day" value={budgetInput} onChange={e => this.handleInput('budgetInput', e.target.value)} />
                            <textarea className="home-notes-input  home-inputs" type="text" placeholder="import notes, blah, blah, blah.." value={notesInput} onChange={e => this.handleInput('notesInput', e.target.value)} />
                            <div className="home-time-agenda-container">
                                <TimeInput className="home-clock" mode='12h' okLabel="submit" value={time} onChange={e => this.handleInput('time', e)} />
                                <button className="home-save-agenda-btn" onClick={() => this.createAgenda(tripNameInput, destinationInput, budgetInput, notesInput, time)}>Save Agenda</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.viewReducer
});

export default connect(mapStateToProps, { toggleHamburgerBtn })(Home);
