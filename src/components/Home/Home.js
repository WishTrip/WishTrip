import React, { Component } from "react";
// import "font-awesome/css/font-awesome.min.css";
import "./Home.css";
import Background from "../Background/Background";
import { connect } from "react-redux";
import { toggleHamburgerBtn } from "../../ducks/viewReducer";
import { saveAgenda } from "../../ducks/userReducer";
import TimeInput from 'material-ui-time-picker'
import Agenda from "../Agenda/Agenda";


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            day: 1,
            currentDay: 1,
            time: new Date(),
            tripNameInput: "",
            destinationInput: "",
            budgetInput: 0,
            notesInput: "",
            nextStepsFlag: false
        }
        this.handleInput = this.handleInput.bind(this);
    }



    handleHamburgerMenu = () => {
        if (!this.props.burgerFlag) {
            this.props.toggleHamburgerBtn();
        }
    };

    handleInput(key, val) {
        if (key === 'budgetInput') {
            return this.setState({
                [key]: parseInt(val, 10)
            })
        }
        this.setState({
            [key]: val
        })
    }

    handleAgenda(tripNameInput, destinationInput, budgetInput, notesInput, time) {
        this.props.saveAgenda(tripNameInput, destinationInput, budgetInput, notesInput, time);
        let { currentDay } = this.state;

        this.setState({
            nextStepsFlag: true,
            currentDay: currentDay + 1,
            tripNameInput: "",
            destinationInput: "",
            budgetInput: 0,
            notesInput: ""
        })
    }

    render() {
        const { day, currentDay, time, tripNameInput, destinationInput, budgetInput, notesInput, nextStepsFlag } = this.state;
        const { trip } = this.props;
        let currentAgendas = trip.map((e, i) => {
            return (
                <Agenda key={i} index={i} saved={e} day={day + i} time={time} />
            )
        })

        return (
            <div>
                <div>
                    <div className="home-wrapper" onClick={() => this.handleHamburgerMenu()} >
                        <Background />
                        <h2 className="home-day-text">Day {currentDay}</h2>
                        <div className="home-container-wrapper">
                            <div className="home-container">
                                <input className="home-name-input home-inputs" type="text" placeholder="Trip Name" value={tripNameInput} onChange={e => this.handleInput('tripNameInput', e.target.value)} />
                                <div className="home-inputs-container">
                                    <input className="home-destination-input home-inputs" type="text" placeholder="Trip Destination" value={destinationInput} onChange={e => this.handleInput('destinationInput', e.target.value)} />
                                    <div className="budget-container">
                                        <i className="home-dollar-sign">$</i>
                                        <input className="home-budget-input-position  home-budget-input home-inputs" type="number" placeholder="Budget for Day" value={budgetInput} onChange={e => this.handleInput('budgetInput', e.target.value)} />
                                    </div>
                                    <textarea className="home-notes-input  home-inputs" type="text" placeholder="import notes, blah, blah, blah.." value={notesInput} onChange={e => this.handleInput('notesInput', e.target.value)} />
                                    <div className="home-time-agenda-container">
                                        <TimeInput className="home-clock" mode='12h' okLabel="submit" value={time} onChange={e => this.handleInput('time', e)} />
                                        <button className="home-save-agenda-btn" onClick={() => this.handleAgenda(tripNameInput, destinationInput, budgetInput, notesInput, time)}>Add Agenda</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {nextStepsFlag ? (
                            <div>
                                <button>Complete Trip</button>
                                <button>Add New Day</button>
                            </div>
                        ) : null}
                    </div>
                </div>
                {currentAgendas}
            </div>

        );
    }
}

const mapStateToProps = state => ({
    ...state.viewReducer,
    ...state.userReducer
});

export default connect(mapStateToProps, { toggleHamburgerBtn, saveAgenda })(Home);
