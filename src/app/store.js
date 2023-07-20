import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "./slices/LoginSlice";
import driverReducer from "./slices/DriverSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    driver: driverReducer,
  },
});
