import { createStore, compose } from "redux";
import { applyMiddleware } from "redux";
import rootReducer from "./reducer/reducer";
import ThunkMiddleware from "redux-thunk";
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(ThunkMiddleware))
);
export default store;
