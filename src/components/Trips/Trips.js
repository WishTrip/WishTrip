import React from "react";
import "../../assets/fontawesome-all.css"
// import "font-awesome/css/font-awesome.min.css";
import Background from "../Background/Background.js";
import "./Trips.css"
export default function Trips() {
    return (
        <div className="trip-container">
            <Background />
             My Trips
  



             <div className="trip-main-container">
             <div className="trip-edit-button">
             <i className="far fa-edit"></i>
             </div>

             <div className="trip-main-inner-container">

             <div className="trip-name-top">Trip Name</div>
             <div className="trip-name-duration">
             <div className="trip-name">Trip Name</div>
             <div className="trip-duration">Trip duration</div>
             </div>
             <div className="trip-straight-lines"></div>
             <div className="trip-budget">
             Trip budget: $9001
             </div>
             <div className="trip-description-time-code"></div>
             <div className="trip-straight-lines"></div>
             <div className="trip-desciption">We are going to the moon for earthday, bring plenty of food, water, and oxygen.</div>
             <div className="trip-time">Time: 9:00am</div>
             <div className="trip-code">Code: jh4kj34k </div>
             </div>





             </div>
             <div className="trips-view-delete">
             <div className="trips-view">View Trip</div>
             <div className="trip-up-line"></div>
             <div className="trip-delete">Delete Trip</div>
             </div>
        </div>
    )
}