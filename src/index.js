import React from "react";
// import { render } from 'react-dom';
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
