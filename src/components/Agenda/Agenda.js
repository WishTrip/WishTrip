import React, { Component } from "react";
import "./Agenda.css"
import { connect } from "react-redux";
import { saveAgenda } from "../../ducks/userReducer";
import TimeInput from 'material-ui-time-picker'

export default function Agenda(props) {
    const { index, agenda, time, tripNameInput, destinationInput, budgetInput, notesInput } = props;
    return (
        <div className="agenda-wrapper">
            <h2 className="home-agenda-text">Agenda {agenda}</h2>
            <div className="home-container-wrapper agenda-container-wrapper">
                <div className="home-container">
                    <p className="home-name-input home-inputs">{props.saved.name}</p>
                    <div className="home-inputs-container">
                        <p className="home-destination-input home-inputs">{props.saved.destination}</p>
                        <p className="home-budget-input home-inputs" >${props.saved.budget}</p>
                        <p className="home-notes-input  home-inputs" >{props.saved.notes}</p>
                        <div className="home-time-agenda-container">
                            <TimeInput style={{ color: "#fff" }} className="home-clock" disabled mode='12h' okLabel="submit" value={time} onChange={e => this.handleInput('time', e)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}