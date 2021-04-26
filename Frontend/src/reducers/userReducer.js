import {
  LOAD_USER_DATA,
  UNLOAD_STORE,
} from '../constants/actionTypes';

const initialState = {
  accessToken: '',
  id: null,
  userName: '',
};

export const userReducer = (state = initialState, action) => {
  if (action.type === LOAD_USER_DATA) {
    return {
      ...state,
      accessToken: action.payload.accessToken,
      id: action.payload.id,
      userName: action.payload.userName,
    };
  }
  if (action.type === UNLOAD_STORE) {
    return initialState;
  }
  return state;
}