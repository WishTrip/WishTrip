import React from "react";
import "./Profile.css"
import 'w3-css/w3.css';


export default function Profile() {
    return (
        <div className= "profile-container" >
        
          <div className= "profile-wrapper">
          Profile
      <form>
            <input className="w3-input w3-animate-input" type="text" style={{width: "135px"}} placeholder="Username" />
            <input className="w3-input w3-animate-input" type="text" style={{width: "135px"}} placeholder="First Name"  />
            <input className="w3-input w3-animate-input" type="text" style={{width: "135px"}} placeholder="Last Name"  />
            <input className="w3-input w3-animate-input" type="text" style={{width: "135px"}} placeholder="Email"  />
      </form>
            <div className="profile-trip-codes">
            
            <div>   Trip Codes     </div>
            <div className="profile-tripname-code">

               <div>Trip Name</div>
               <div>Code</div>
             
            </div>
                </div>
            Previous Trips
            <div className="profile-previous-trips">
            <div>Trip Name</div>
            <div>Trip duration</div>
            </div>
            
            </div>
        </div>
    )
}