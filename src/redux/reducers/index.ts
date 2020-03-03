import { combineReducers } from "redux";
import hero, { HeroState } from "./heroes";
import notification, { NotificationState } from "./notifications";

export interface AppState {
    hero?: HeroState;
    notification?: NotificationState;
}

export default combineReducers<AppState>({
    hero,
    notification
});