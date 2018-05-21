import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

// import reducer from "./ducks/reducer"
// insert reducers into combineReducer

export default createStore(
//   combineReducers(),
  applyMiddleware(promiseMiddleware())
);
