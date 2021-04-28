import {
  LOAD_USER_DATA,
  UNLOAD_STORE,
  LOAD_ACTUAL_PRODUCT_CARD,
} from '../constants/actionTypes';

export const loadUserDataAction = (payload) => ({
    type: LOAD_USER_DATA,
    payload,
  });

export const unloadStoreAction = () => ({
    type: UNLOAD_STORE,
});

export function loadActualProductAction(payload) {
  return {
    type: LOAD_ACTUAL_PRODUCT_CARD,
    payload,
  };
};