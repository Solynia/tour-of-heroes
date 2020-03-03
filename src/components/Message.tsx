import React from "react";
import { connect } from "react-redux";
import Notification from "../model/Notification";
import { AppState } from "../redux/reducers";
import { getNotification } from "../redux/selectors/notifications";
import { dismissNotification } from "../redux/actions/notifications";
import "./Message.css";

interface MessageProps {
  notification?: Notification;
  dismissNotification?: () => void;
}
const Message = (props: MessageProps) =>
  props.notification ? (
    <div className="message" onClick={() => props.dismissNotification?.()}>
      {props?.notification?.message}
    </div>
  ) : null;

const mapStateToProps = (state: AppState): MessageProps => ({
  notification: getNotification(state)
});
export default connect<MessageProps>(mapStateToProps, { dismissNotification })(
  Message
);
