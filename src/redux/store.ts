import { configureStore } from "@reduxjs/toolkit";
import heroesReducer from "./heros/heroesSlice";
import notificationsReducer from "./notifications/notificationsSlice";

const store = configureStore({
  reducer: {
    heroes: heroesReducer,
    notifications: notificationsReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
