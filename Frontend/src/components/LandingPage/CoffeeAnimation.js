import React from 'react';
import '../../styles/CoffeeAnimation.css';

export const CoffeeAnimation = () => {
  return (
    <div className="container">
      <div className="row beans"></div>
      <div className="row grinder"></div>
      <div className="row grinder_bottom"></div>
      <div className="row v60"></div>
      <div className="row drip"></div>
      <div className="row cup"></div>
    </div>
  );
};
