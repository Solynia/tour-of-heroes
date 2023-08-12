import Notification from "../../model/Notification";
import { NotificationActions } from "../actions/actionTypes";
import { NotificationAction } from "../actions/notifications";

export type NotificationState = {
  notification?: Notification;
}

export default function notifications(state: NotificationState = {}, action: NotificationAction) {
  switch (action.type) {
    case NotificationActions.display:
      return notificationDisplay(state, action.payload.notification);
    case NotificationActions.dismiss:
      return notificationDismiss(state);
    default:
      return state;
  }
}

function notificationDisplay(state: NotificationState, notification?: Notification) {
  return {
    ...state,
    notification
  };
}

function notificationDismiss(state: NotificationState) {
  const newState = { ...state };
  delete newState.notification;
  return newState;
}
