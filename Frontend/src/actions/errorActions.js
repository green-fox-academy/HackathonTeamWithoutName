import {
  LOAD_ERROR,
  UNLOAD_ERROR,
} from '../constants/actionTypes';

export const loadErrorAction = (payload) => ({
    type: LOAD_ERROR,
    payload,
  });

export const unloadErrorAction = () => ({
    type: UNLOAD_ERROR,
});