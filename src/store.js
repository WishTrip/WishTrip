import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import viewReducer from "./ducks/viewReducer";
import userReducer from "./ducks/userReducer";

export default createStore(
  combineReducers({viewReducer, userReducer}),
  applyMiddleware(promiseMiddleware())
);
