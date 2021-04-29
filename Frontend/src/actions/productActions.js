import {
  LOAD_PRODUCT_DATA,
} from '../constants/actionTypes';

export const loadProductDataAction = (payload) => ({
    type: LOAD_PRODUCT_DATA,
    payload,
  });