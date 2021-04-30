import React from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CartItem } from '../';
import '../../styles/Cart.css';

export const Cart = () => {
  const { accessToken } = useSelector(state => state.userData);
  const { orders } = useSelector(state => state.orderData);
  const { products } = useSelector(state => state.productData);
  const history = useHistory();
  const location = useLocation();

  const handleClickOnCheckout = () => {
    accessToken ? history.push('/main/orderreview') : history.push('/login', location.pathname);
  }

  const handleClickOnContinueShopping = () => {
    history.push('/main');
  }

  return (
    <div id="cart">
      <h1>Shopping Cart</h1>
      <div id="cart_main">
        { orders.length > 0 
        ? <div id="cart_inner_main">
            <div id="cart_header">       
              <h4>Item</h4>
              <h4>Unit price</h4>
              <h4>Quantity</h4>
              <h4>Total price</h4>
            </div>
            { orders.map(({ id: order_id, product_id, quantity }) => {
              return products.map(({ id, title, price, image }) => {
                return product_id === id && <CartItem key={product_id} order={{order_id, title, price, image, quantity}}/>
              })
            })}      
          </div>
        : <div id="cart_inner_main_empty" className="errormessage">Your cart is empty!<br/>Please, visit our shop <NavLink to='/main/shop'>here</NavLink>!</div>}
        <div id="cart_aside">
          <div id="cart_checkout">
            <div>Gross total ({orders.map(({ quantity }) => quantity).reduce((a, b) => a + b, 0)} items):</div>
            <div>
              $ {orders.map(({ product_id, quantity }) => products.filter(({ id }) => product_id === id)[0].price * quantity).reduce((a, b) => a + b, 0).toLocaleString().split(',').join(' ')}
            </div>
            <button onClick={handleClickOnCheckout}>Proceed to checkout</button>
          </div>
          <div id="cart_continue_shopping">
            <button onClick={handleClickOnContinueShopping}>Continue shopping</button>
          </div>
        </div>
      </div>
    </div>
  )
};