import {
  LOAD_MESSAGE,
  UNLOAD_MESSAGE,
  UNLOAD_STORE,
  SET_MESSAGE_VISIBILITY,
} from '../constants/actionTypes';

const initialState = {
  isMessageVisible: false,
  error: {
    isMessage: false,
    message: '',
  },
  response: {
    isMessage: false,
    message: '',
  }
};

export const messageReducer = (state = initialState, action) => {
  if (action.type === LOAD_MESSAGE) {
    return {
      ...state,
      [action.payload.type]: {
        isMessage: true,
        message: action.payload.message,
      }
    };
  }
  if (action.type === SET_MESSAGE_VISIBILITY) {
    return {
      ...state,
      isMessageVisible: !state.isMessageVisible,
    };
  }
  if (action.type === UNLOAD_MESSAGE || UNLOAD_STORE) {
    return initialState;
  }
  return state;
}