import { createStore } from "redux";
import rootReducer from "./reducers";
import { HEROES } from "../model/Hero";

export default createStore(rootReducer, {
    hero: {
        heroes: HEROES
    }
});