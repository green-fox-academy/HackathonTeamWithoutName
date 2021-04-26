import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPreziVisibilityAction, setActualSlideAction } from '../../actions';
import '../../styles/Prezi.css'

export const Prezi = () => {
  const { isPreziVisible, slides, actualSlide } = useSelector(state => state.prezi);
  const dispatch = useDispatch();
  const preziRef = useRef();

  const handleClick = event => {
    if (preziRef.current === event.target) {
      dispatch(setPreziVisibilityAction());
    }
  };

  const handleClickOnArrow = event => {
    if (event.target.id === 'prezi_left_arrow') {
      if (actualSlide > 0) {
        const newActualSlide = actualSlide - 1;
        dispatch(setActualSlideAction(newActualSlide));
      }
    }
    if (event.target.id === 'prezi_right_arrow') {
      if (actualSlide < (slides.length - 1)) {
        const newActualSlide = actualSlide + 1;
        dispatch(setActualSlideAction(newActualSlide));
      }
    }
  };

  const keyPress = useCallback(
    keyPressEvent => {
      if (keyPressEvent.key === 'Escape' && isPreziVisible) {
        dispatch(setPreziVisibilityAction());
      }
    },
    // eslint-disable-next-line
    [isPreziVisible]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <>
      {isPreziVisible 
        ? 
          (<div id="prezi_background" onClick={handleClick} ref={preziRef}>
            <div id="prezi_modal">
              <div id="prezi_left_arrow" onClick={handleClickOnArrow}>left</div>
              <div id="prezi_slide_box">
                <img id="prezi_slide_img" src={slides[actualSlide]} alt="slide"/>
              </div>
              <div id="prezi_right_arrow" onClick={handleClickOnArrow}>right</div>
            </div>
          </div>) 
        : 
          null
      }
    </>
  );
};