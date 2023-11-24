import { combineReducers } from "redux";
import { notificationReducer, reducer } from "./reducer";

export default combineReducers({
  reducer: reducer,
  notificationData: notificationReducer,
});
