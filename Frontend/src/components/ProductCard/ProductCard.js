import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadActualProductAction, loadErrorAction } from '../../actions';
import { fetchService } from '../../services/';
import { setProductDetailsVisibilityAction, loadActualProductDataAction } from '../../actions';

//title, image, rating, price, raktáron van-e vagy sem, on card click for details

export const ProductCard = ({productData:{
  id,
  title,
  price,
  category,
  description,
  reviews,
  availability,
  image,
  inStock,
}}) => {
  const dispatch = useDispatch();

  const handleShowProductDetails = () => {
    dispatch(loadActualProductDataAction({
      id,
      title,
      price,
      category,
      description,
      image,
      inStock,
      reviews,
    }));
    dispatch(setProductDetailsVisibilityAction());
  }

  return (
    <div onClick={handleShowProductDetails}>
      <div>
        <img src={image} alt={title}/>
      </div>
      <div>
        <div>{title}</div>
        <div>Price: {price.toLocaleString().split(',').join(' ')} HUF</div>
        <div>Rating: {reviews.map(review => review.rating).reduce((a, b) => a + b, 0) / reviews.length}</div>
        {inStock > 10 ? <div>In stock</div> : inStock > 0 ? <div>In stock: {inStock}</div> : <div>Out of stock</div>}
      </div>
    </div>
  );
}

