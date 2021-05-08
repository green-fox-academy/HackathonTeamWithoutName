import React from 'react';
import '../../styles/OrderReviewItem.css';

export const OrderReviewItem = ({ order: { title, price, image, quantity } }) => {

  return (
    <div className="order_review_item">
      <div className="order_review_item_image_box">
        <img src={image} alt={title}/>
      </div>
      <div className="order_review_item_datas">
        <div className="order_review_item_title">
          {title}
        </div>
        <div className="order_review_item_price">
          <h4>Unit price</h4>
          <div>$ {price.toLocaleString().split(',').join('.')}</div>
        </div>
        <div className="order_review_item_quantity">
          <h4>Quantity</h4>
          <div>{quantity}</div>
        </div>
        <div className="order_review_item_total_price">
          <h4>Total price</h4>
          <div>$ {(price * quantity).toLocaleString().split(',').join('.')}</div>
        </div>
      </div>
    </div>
  )
};