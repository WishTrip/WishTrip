import React from "react";
import "./Profile.css"


export default function Profile() {
    return (
        <div className= "profile-container" >
        
          <div className= "profile-wrapper">
          Profile

            <input placeholder="Username"  />
            <input placeholder="First Name"  />
            <input placeholder="Last Name"  />
            <input placeholder="Email"  />

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
            <div>Code</div>
            </div>
            
            </div>
        </div>
    )
}