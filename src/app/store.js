import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "./slices/LoginSlice";
import driverReducer from "./slices/DriverSlice";
import RuleReducer from "./slices/RuleSlice";
import PSReducer from "./slices/PSSlice";
import PenaltyReducer from "./slices/PenaltySlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    driver: driverReducer,
    rule: RuleReducer,
    station: PSReducer,
    penalty: PenaltyReducer,
  },
});
