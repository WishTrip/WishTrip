import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import viewReducer from "./ducks/viewReducer"

export default createStore(
  combineReducers({viewReducer}),
  applyMiddleware(promiseMiddleware())
);
