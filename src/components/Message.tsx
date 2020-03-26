import React from "react";
import { connect } from "react-redux";
import Notification from "../model/Notification";
import { AppState } from "../redux/reducers";
import { getNotification } from "../redux/selectors/notifications";
import { dismissNotification } from "../redux/actions/notifications";
import "./Message.css";

type StateProps = {
  notification?: Notification;
}

type DispatchProps = {
  dismissNotification: () => void;
}

type Props = StateProps & DispatchProps;

const Message = (props: Props) =>
  props.notification ? (
    <div className="message" onClick={() => props.dismissNotification?.()}>
      {props?.notification?.message}
    </div>
  ) : null;

const mapStateToProps = (state: AppState): StateProps => ({
  notification: getNotification(state)
});

export default connect<StateProps, DispatchProps>(mapStateToProps, { dismissNotification })(Message);
