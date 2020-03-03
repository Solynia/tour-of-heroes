import { Action } from "redux";
import { NotificationActions } from "./actionTypes";
import Notification from "../../model/Notification";
import { Dispatch } from "react";

export interface NotificationAction extends Action<NotificationActions> {
    type: NotificationActions;
    payload: { notification?: Notification }
}

export function displayNotification(notification: Notification): (dispatch: Dispatch<NotificationAction>) => void {
    return (dispatch: Dispatch<NotificationAction>) => {
        setTimeout(() => dispatch(dismissNotification()), 5000);
        dispatch({ type: NotificationActions.display, payload: { notification } });
    };
}

export function dismissNotification(): NotificationAction {
    return {
        type: NotificationActions.dismiss,
        payload: {}
    };
}