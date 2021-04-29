import {
  LOAD_ORDER_DATA,
  UPDATE_ORDER_QUANTITY,
  REMOVE_ORDER,
  REMOVE_ALL_ORDER,
} from '../constants/actionTypes';

export const loadOrderDataAction = (payload) => ({
  type: LOAD_ORDER_DATA,
  payload,
});

export const updateOrderQuantityAction = (payload) => ({
  type: UPDATE_ORDER_QUANTITY,
  payload,
});

export const removeOrderAction = (payload) => ({
  type: REMOVE_ORDER,
  payload,
});

export const placeOrderAction = () => ({
  type: REMOVE_ALL_ORDER,
});