import {
  LOAD_ORDER_DATA,
  UPDATE_ORDER_QUANTITY,
  REMOVE_ORDER,
  REMOVE_ALL_ORDER,
  UNLOAD_STORE,
  LOAD_ALL_ORDER_DATA,
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
  if (action.type === LOAD_ALL_ORDER_DATA) {
    if (action.payload.length) {
      return {
        ...state,
        orders: action.payload,
      };
    }
    return state;
  }
  if (action.type === UPDATE_ORDER_QUANTITY) {
    return {
      ...state,
      orders: state.orders.map(order => {
        if (order.id === action.payload.order_id) {
          order.quantity += action.payload.quantityModifier;
        }
        return order
      }),
    };
  }
  if (action.type === REMOVE_ORDER) {
    return {
      ...state,
      orders: state.orders.filter(order => (order.id !== action.payload.order_id)),
    };
  }
  if (action.type === REMOVE_ALL_ORDER) {
    return initialState;
  }
  if (action.type === UNLOAD_STORE) {
    return initialState;
  }
  return state;
}