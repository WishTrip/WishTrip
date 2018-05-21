import React from "react";

import { Route, Switch } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import Plan from "./components/Plan/Plan";
import Profile from "./components/Profile/Profile";
import Trips from "./components/Trips/Trips";

export default (
    <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/plan" component={Plan} />
        <Route path="/profile" component={Profile} />
        <Route path="/trips" component={Trips} />
    </Switch>
);