import {
  LOAD_PRODUCT_DATA,
} from '../constants/actionTypes';

const initialState = {
  products: [],
};

export const productReducer = (state = initialState, action) => {
  if (action.type === LOAD_PRODUCT_DATA) {
    if (action.payload.length) {
      return {
        ...state,
        products: action.payload
      };
    }
    return state;
  }
  return state;
}