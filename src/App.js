import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import routes from "./routes";

import Test from "./components/Test";

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        {routes}
      </div>
    );
  }
}

export default App;
