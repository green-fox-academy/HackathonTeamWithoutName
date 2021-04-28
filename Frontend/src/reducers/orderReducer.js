import {
  LOAD_ORDER_DATA,
  UNLOAD_STORE,
} from '../constants/actionTypes';

const initialState = {
  orders: [],
};

export const orderReducer = (state = initialState, action) => {
  if (action.type === LOAD_ORDER_DATA) {
    if (action.payload.length) {
      return {
        ...state,
        orders: [ ...state.orders ].concat(action.payload)
      };
    }
    return state;
  }
  if (action.type === UNLOAD_STORE) {
    return initialState;
  }
  return state;
}