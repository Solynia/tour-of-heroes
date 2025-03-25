import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  getNotification,
  notificationDismissed,
} from "../redux/notifications/notificationsSlice";
import "./Message.css";

const Message = () => {
  const notification = useAppSelector(getNotification);
  const dispatch = useAppDispatch();
  return notification ? (
    <div className="message" onClick={() => dispatch(notificationDismissed())}>
      {notification?.message}
    </div>
  ) : null;
};

export default Message;
