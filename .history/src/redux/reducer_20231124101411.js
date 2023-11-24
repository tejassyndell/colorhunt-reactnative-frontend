import { ADD_TO_CART, SHOW_NOTIFICATION } from "./constants";

const initialState = [];
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return action.data;

    default:
      return state;
  }
};

const notificationinitialState = [];
export const notificationReducer = (
  state = notificationinitialState,
  action
) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return action.data;
    default:
      return state;
  }
};
