import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
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
            newDay: true,
            agenda: 1,
            currentAgenda: 1,
            time: new Date(),
            tripNameInput: "",
            destinationInput: "",
            budgetInput: 0,
            notesInput: "",
            nextStepsFlag: false
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleDay = this.handleDay.bind(this);
        this.handleAgenda = this.handleAgenda.bind(this);
        this.decrementDay = this.decrementDay.bind(this);
        this.incrementDay = this.incrementDay.bind(this);
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

    handleDay() {
        let { day, currentDay } = this.state;
        this.setState({
            day: day + 1,
            currentDay: currentDay + 1,
            currentAgenda: 1,
            newDay: true
        })
    }

    decrementDay() {
        let { day, currentDay } = this.state;
        this.setState({
            day: day - 1,
            currentDay: currentDay - 1
        })
    }

    incrementDay() {
        let { day, currentDay } = this.state;
        this.setState({
            day: day + 1,
            currentDay: currentDay + 1
        })
    }

    handleAgenda(tripNameInput, destinationInput, budgetInput, notesInput, time) {
        let { currentAgenda, newDay, currentDay } = this.state;
        if (newDay) {
            this.props.saveAgenda(newDay, currentDay, currentAgenda, tripNameInput, destinationInput, budgetInput, notesInput, time);
            this.setState({
                newDay: false
            })
        } else {
            this.props.saveAgenda(newDay, currentDay, currentAgenda, tripNameInput, destinationInput, budgetInput, notesInput, time);
        }

        this.setState({
            nextStepsFlag: true,
            currentAgenda: currentAgenda + 1,
            tripNameInput: "",
            destinationInput: "",
            budgetInput: 0,
            notesInput: ""
        })
    }

    render() {
        const { day, agenda, currentDay, currentAgenda, time, tripNameInput, destinationInput, budgetInput, notesInput, nextStepsFlag } = this.state;
        const { days } = this.props;
        let amountOfDays = days.length
        console.log(days)
        console.log(amountOfDays - 1)
        console.log(days[currentDay - 1])

        let currentAgendas = days[currentDay - 1].map((e, i) => {
            return (
                <Agenda key={i} index={i} saved={e} agenda={agenda + i} time={time} />
            )
        })

        return (
            <div>
                <div>
                    <div className="home-wrapper" onClick={() => this.handleHamburgerMenu()} >
                        <Background />
                        <div className="home-day-container home-chevron">
                            <i onClick={() => this.decrementDay()} className={day === 1 ? null : "fa fa-chevron-left"}></i>
                            <h1 className="home-day-text">Day {day}</h1>
                            <i onClick={() => this.incrementDay()} className={days[currentDay - 1] ? "fa fa-chevron-right" : null}></i>
                        </div>
                        <h2 className="home-agenda-text">New Agenda</h2>
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
                                <button onClick={() => this.handleDay()} >Add New Day</button>
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
