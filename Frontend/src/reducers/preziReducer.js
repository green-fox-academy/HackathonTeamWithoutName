import {
  SET_PREZI_VISIBILITY,
  SET_ACTUAL_SLIDE,
} from '../constants/actionTypes';
import slides from '../assets/prezi';

const initialState = {
  isPreziVisible: false,
  slides: slides,
  actualSlide: 0,
};

export const preziReducer = (state = initialState, action) => {
  if (action.type === SET_PREZI_VISIBILITY) {
    return {
      ...state,
      isPreziVisible: !state.isPreziVisible,
    };
  }
  if (action.type === SET_ACTUAL_SLIDE) {
    return {
      ...state,
      actualSlide: action.payload,
    };
  }
  return state;
}