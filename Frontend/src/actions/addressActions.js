import {
  LOAD_ADDRESS_DATA,
} from '../constants/actionTypes';

export const loadAddressDataAction = (payload) => ({
    type: LOAD_ADDRESS_DATA,
    payload,
  });