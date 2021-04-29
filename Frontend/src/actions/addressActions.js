import {
  LOAD_ADDRESS_DATA,
  UPDATE_ADDRESS_DATA,
  LOAD_NEW_ADDRESS_DATA,
} from '../constants/actionTypes';

export const loadAddressDataAction = (payload) => ({
  type: LOAD_ADDRESS_DATA,
  payload,
});

export const updateAddressDataAction = (payload) => ({
  type: UPDATE_ADDRESS_DATA,
  payload,
});

export const loadNewAddressDataAction = (payload) => ({
  type: LOAD_NEW_ADDRESS_DATA,
  payload,
});