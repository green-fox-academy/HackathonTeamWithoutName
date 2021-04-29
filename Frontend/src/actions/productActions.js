import {
  LOAD_PRODUCT_DATA,
  SET_PRODUCT_DETAILS_VISIBILITY,
  LOAD_ACTUAL_PRODUCT,
  UNLOAD_ACTUAL_PRODUCT,
  LOAD_POSTED_REVIEW,
} from '../constants/actionTypes';

export const loadProductDataAction = (payload) => ({
  type: LOAD_PRODUCT_DATA,
  payload,
});

export const setProductDetailsVisibilityAction = () => ({
  type: SET_PRODUCT_DETAILS_VISIBILITY,
});

export const loadActualProductDataAction = (payload) => ({
  type: LOAD_ACTUAL_PRODUCT,
  payload,
});

export const unloadActualProductDataAction = () => ({
  type: UNLOAD_ACTUAL_PRODUCT,
});

export const loadPostedReviewAction = (payload) => ({
  type: LOAD_POSTED_REVIEW,
  payload,
});