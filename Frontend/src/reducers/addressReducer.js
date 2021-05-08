import {
  LOAD_ADDRESS_DATA,
  UNLOAD_STORE,
  UPDATE_ADDRESS_DATA,
  LOAD_NEW_ADDRESS_DATA,
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
  if (action.type === LOAD_NEW_ADDRESS_DATA) {
    if (action.payload.length) {
      return {
        ...state,
        addresses: [ ...state.addresses ].concat(action.payload)
      };
    }
    return state;
  }
  if (action.type === UPDATE_ADDRESS_DATA) {
    return {
      ...state,
      addresses: state.addresses.map(address => {
        if (address.id === action.payload.id) {
          address = action.payload;
        }
        return address
      }),
    };
  }
  if (action.type === UNLOAD_STORE) {
    return initialState;
  }
  return state;
}