import { ADD_TO_CART, SHOW_NOTIFICATION } from "./constants";

export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    data: item,
  };
}

export function AddNotification(item) {
  return {
    type: SHOW_NOTIFICATION,
    data: item,
  };
}
