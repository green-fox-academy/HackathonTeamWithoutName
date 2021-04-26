import {
  SET_PREZI_VISIBILITY,
  SET_ACTUAL_SLIDE,
} from '../constants/actionTypes';

export const setPreziVisibilityAction = () => ({
    type: SET_PREZI_VISIBILITY,
});

export const setActualSlideAction = payload => ({
    type: SET_ACTUAL_SLIDE,
    payload,
});