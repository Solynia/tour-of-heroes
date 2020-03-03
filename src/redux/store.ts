import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer, { AppState } from "./reducers";

const defaultState: AppState = {
    hero: { heroes: [] },
    notification: {}
}

const store = createStore(
    rootReducer,
    defaultState,
    applyMiddleware(thunk)
);

export default store;