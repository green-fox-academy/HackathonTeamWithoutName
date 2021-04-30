import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchService } from '../../services';
import { 
  updateOrderQuantityAction,
  removeOrderAction,
  loadMessageAction, 
  setMessageVisibilityAction,
} from '../../actions';
import '../../styles/CartItem.css';

export const CartItem = ({ order: { order_id, title, price, image, quantity } }) => {
  const { accessToken } = useSelector(state => state.userData);
  const dispatch = useDispatch();

  const handleClickOnChangeQuantity = async event => {
    const quantityModifier = Number(event.target.innerHTML + 1);
    try {
      await fetchService.fetchData('order/quantity', 'PUT', { order_id, new_quantity: quantityModifier }, accessToken);
      dispatch(updateOrderQuantityAction({ order_id, quantityModifier }));
    } catch (error) {
      console.log(error.message);
      dispatch(loadMessageAction({ type: 'error', message: error.message}));
      dispatch(setMessageVisibilityAction());
    }
  }

  const handleClickOnRemoveOrder = async () => {
    try {
      await fetchService.fetchData('order', 'DELETE', { order_id }, accessToken);
      dispatch(removeOrderAction({ order_id }));
    } catch (error) {
      console.log(error.message);
      dispatch(loadMessageAction({ type: 'error', message: error.message}));
      dispatch(setMessageVisibilityAction());
    }
  }

  return (
    <div className="cart_item">
      <div className="cart_item_start_box">
        <div className="cart_item_image_box">
          <img src={image} alt={title}/>
        </div>
        <div className="cart_item_title_box">{title}</div>
      </div>
      <div className="cart_item_price_box"><h4>Unit price</h4>$ {price.toLocaleString().split(',').join(' ')}</div>
      <div className="cart_item_quantity_box">
        <h4>Quantity</h4>
        <div className="cart_item_quantity">
          <button onClick={handleClickOnChangeQuantity}>-</button>
          <div>{quantity}</div>
          <button onClick={handleClickOnChangeQuantity}>+</button>
        </div>
      </div>
      <div className="cart_item_total_price_box">
        <h4>Total price</h4>
        <div className="cart_item_total_price">
          <div>
          $ {(price * quantity).toLocaleString().split(',').join(' ')}
          </div>
          <button onClick={handleClickOnRemoveOrder}><i className="fa fa-trash"/></button>
        </div>
      </div>
    </div>
  )
};