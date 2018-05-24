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
            trip: [],
            nextStepsFlag: false
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

    createTrip(name, destination, budget, notes, time) {
        let newArr = this.state.trip.slice();
        let numOfDays = 0
        newArr[numOfDays] ? (newArr[numOfDays].push({ name, destination, budget, notes, time })) :
            (newArr.push([{ name, destination, budget, notes, time }]))
        this.setState({
            trip: newArr,
            time: new Date(),
            tripNameInput: "",
            destinationInput: "",
            budgetInput: 0,
            notesInput: "",
            nextStepsFlag: true
        })
    }

    render() {
        const { day, time, tripNameInput, destinationInput, budgetInput, notesInput, nextStepsFlag } = this.state;
        console.log(this.state)
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
                                <button className="home-save-agenda-btn" onClick={() => this.createTrip(tripNameInput, destinationInput, budgetInput, notesInput, time)}>Save Agenda</button>
                            </div>
                        </div>
                    </div>
                </div>
                {nextStepsFlag ? (
                    <div>
                        <button>Add New Agenda</button>
                        <div>
                            <button>Complete Trip</button>
                            <button>Add New Day</button>
                        </div>
                    </div>
                ) : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.viewReducer
});

export default connect(mapStateToProps, { toggleHamburgerBtn })(Home);
