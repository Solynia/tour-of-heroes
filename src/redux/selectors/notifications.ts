import { AppState } from "../reducers";

export function getNotification(store: AppState) {
    return store?.notification?.notification;
}