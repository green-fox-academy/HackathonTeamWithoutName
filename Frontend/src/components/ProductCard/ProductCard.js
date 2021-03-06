import React from 'react';
import { useDispatch } from 'react-redux';
import { setProductDetailsVisibilityAction, loadActualProductDataAction } from '../../actions';
import '../../styles/ProductCard.css';
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
      <div className="cardHolder">
        <img src={image} alt={title} height="200px"/>
      </div>
      <div>
        <div className="cardtitle">{title}</div>
        <div className="detailsHolder">
        <div>Price: ${price.toLocaleString().split(',').join('.')}</div>
        <div>Rating: {reviews.map(review => review.rating).reduce((a, b) => a + b, 0) / reviews.length}</div>
        {inStock > 10 ? <div>In stock</div> : inStock > 0 ? <div>In stock: {inStock}</div> : <div>Out of stock</div>}
      </div>
      </div>
    </div>
  );
}

