import {
  LOAD_USER_DATA,
  UNLOAD_STORE,
} from '../constants/actionTypes';

export const loadUserDataAction = (payload) => ({
    type: LOAD_USER_DATA,
    payload,
  });

export const unloadStoreAction = () => ({
    type: UNLOAD_STORE,
});