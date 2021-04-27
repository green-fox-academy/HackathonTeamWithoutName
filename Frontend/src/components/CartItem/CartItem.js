import React from 'react';
import '../../styles/CartItem.css';

export const CartItem = ({ order: { title, price, image, quantity } }) => {

  return (
    <div className="cart_item">
      <div className="cart_item_start_box">
        <div className="cart_item_image_box">
          <img src={image} alt={title}/>
        </div>
        <div className="cart_item_title_box">{title}</div>
      </div>
      <div className="cart_item_price_box"><h4>Unit price</h4>{price.toLocaleString().split(',').join(' ')} Ft</div>
      <div className="cart_item_quantity_box">
        <h4>Quantity</h4>
        <div className="cart_item_quantity">
          <button>-</button>
          <div>{quantity}</div>
          <button>+</button>
        </div>
      </div>
      <div className="cart_item_total_price_box">
        <h4>Total price</h4>
        <div className="cart_item_total_price">
          <div>
            {(price * quantity).toLocaleString().split(',').join(' ')} Ft
          </div>
          <button>törlés</button>
        </div>
      </div>
    </div>
  )
};