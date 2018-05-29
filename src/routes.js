import React from "react";

import { Route, Switch } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Trips from "./components/Trips/Trips";
import DummyPlan from "./components/DummyPlan/DummyPlan";

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/home" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/profile" component={Profile} />
    <Route path="/trips" component={Trips} />
    <Route path="/dummyplan" component={DummyPlan} />
  </Switch>
);
