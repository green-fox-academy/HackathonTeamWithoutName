import {
  LOAD_ADDRESS_DATA,
  UNLOAD_STORE,
} from '../constants/actionTypes';

const initialState = {
  addresses: [],
};

export const addressReducer = (state = initialState, action) => {
  if (action.type === LOAD_ADDRESS_DATA) {
    if (action.payload.length) {
      return {
        ...state,
        addresses: action.payload
      };
    }
    return state;
  }
  if (action.type === UNLOAD_STORE) {
    return initialState;
  }
  return state;
}