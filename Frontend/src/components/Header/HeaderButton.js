import React from 'react';

export const HeaderButton = ({ innerText, onClickEvent}) => {
  
  return <button type="button" onClick={onClickEvent}>{innerText}</button>
};