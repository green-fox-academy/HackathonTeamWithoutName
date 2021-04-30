import {
  LOAD_MESSAGE,
  UNLOAD_MESSAGE,
  SET_MESSAGE_VISIBILITY,
} from '../constants/actionTypes';

export const loadMessageAction = (payload) => ({
    type: LOAD_MESSAGE,
    payload,
  });

export const unloadMessageAction = () => ({
    type: UNLOAD_MESSAGE,
});

export const setMessageVisibilityAction = () => ({
    type: SET_MESSAGE_VISIBILITY,
});