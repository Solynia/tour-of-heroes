import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Notification from "../../model/Notification";
import { AppState } from "../store";

type NotificationState = {
  notification?: Notification;
};

const initialState: NotificationState = {};

const slice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    notificationDismissed: (state) => {
      delete state.notification;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(displayNotification.fulfilled, (state, { payload }) => {
      state.notification = payload;
    });
  },
});

export const displayNotification = createAsyncThunk(
  `${slice.name}/displayNotification`,
  (notification: Notification, { dispatch }) => {
    setTimeout(() => dispatch(notificationDismissed()), 5000);
    return notification;
  }
);

export const { notificationDismissed } = slice.actions;

export const getNotification = (state: AppState) =>
  state.notifications.notification;

export default slice.reducer;
