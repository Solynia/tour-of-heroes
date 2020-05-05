import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dismissNotification } from "../redux/actions/notifications";
import { getNotification } from "../redux/selectors/notifications";
import "./Message.css";

const Message = () => {
  const notification = useSelector(getNotification);
  const dispatch = useDispatch();
  return notification ? (
    <div className="message" onClick={() => dispatch(dismissNotification())}>
      {notification?.message}
    </div>
  ) : null;
}

export default Message;
