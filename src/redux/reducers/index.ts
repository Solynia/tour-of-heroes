import { combineReducers } from "redux";
import heroes, { HeroState } from "./heroes";

export interface AppState {
    hero?: HeroState;
}

export default combineReducers<AppState>({ hero: heroes });