import {
  LOAD_ERROR,
  UNLOAD_ERROR,
  UNLOAD_STORE,
} from '../constants/actionTypes';

const initialState = {
  login: {
    isError: false,
    errorMessage: '',
  },
  register: {
    isError: false,
    errorMessage: '',
  },
  upload: {
    isError: false,
    errorMessage: '',
  },
};

export const errorReducer = (state = initialState, action) => {
  if (action.type === LOAD_ERROR) {
    return {
      ...state,
      [action.payload.type]: {
        isError: true,
        errorMessage: action.payload.message,
      }
    };
  }
  if (action.type === UNLOAD_ERROR || UNLOAD_STORE) {
    return initialState;
  }
  return state;
}