import {
  LOAD_PRODUCT_DATA,
  SET_PRODUCT_DETAILS_VISIBILITY,
  LOAD_ACTUAL_PRODUCT,
  UNLOAD_ACTUAL_PRODUCT,
  LOAD_POSTED_REVIEW,
} from '../constants/actionTypes';

const initialState = {
  products: [],
  isProductDetailsVisible: false,
  actualProduct: {
    id: null,
    title: '',
    price: null,
    category: '',
    description: '',
    image: '',
    inStock: null,
    reviews: [],
  },
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
  if (action.type === SET_PRODUCT_DETAILS_VISIBILITY) {
    return {
      ...state,
      isProductDetailsVisible: !state.isProductDetailsVisible,
    };
  }
  if (action.type === LOAD_ACTUAL_PRODUCT) {
    return {
      ...state,
      actualProduct: action.payload,
    };
  }
  if (action.type === UNLOAD_ACTUAL_PRODUCT) {
    return {
      ...state,
      actualProduct: initialState.actualProduct,
    };
  }
  if (action.type === LOAD_POSTED_REVIEW) {
    return {
      ...state,
      products: state.products.map(product => {
        if (product.id === action.payload.product_id) {
          product.reviews.push(action.payload.review)
        }
        return product
      }),
    };
  }
  return state;
}