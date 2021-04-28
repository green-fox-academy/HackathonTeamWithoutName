import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadActualProductAction, loadErrorAction } from '../../actions';
import { fetchService } from '../../services/';

//title, image, rating, price, raktáron van-e vagy sem, on card click for details

export const ProductCard = ({productData:{
  id,
  title,
  price,
  reviews,
  availability,
  image,
  inStock,
}}) => {

  return (
    <div>
      <div>
        <img src={image} alt={title}/>
      </div>
      <div>
        <div>{title}</div>
        <div>Price: {price.toLocaleString().split(',').join(' ')} HUF</div>
        <div>Rating: {reviews.map(review => review.rating).reduce((a, b) => a + b, 0) / reviews.length}</div>
        <div>In stock: {inStock}</div>
      </div>
    </div>
  );
}

