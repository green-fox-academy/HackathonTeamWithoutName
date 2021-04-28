import {
  LOAD_ORDER_DATA,
} from '../constants/actionTypes';

export const loadOrderDataAction = (payload) => ({
    type: LOAD_ORDER_DATA,
    payload,
  });