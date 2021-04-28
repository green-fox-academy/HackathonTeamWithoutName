import React from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../styles/Cart.css';
import { CartItem } from '../';
import { sampleCoffeeList, sampleOrderList } from './sampleCoffee';

export const Cart = () => {
  const { accessToken } = useSelector(state => state.userData);
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
        { sampleOrderList.length > 0 
        ? <div id="cart_inner_main">
            <div id="cart_header">       
              <h4>Item</h4>
              <h4>Unit price</h4>
              <h4>Quantity</h4>
              <h4>Total price</h4>
            </div>
            { sampleOrderList.map(({ product_id, quantity }) => {
              return sampleCoffeeList.map(({ id, title, price, image }) => {
                return product_id === id && <CartItem key={product_id} order={{title, price, image, quantity}}/>
              })
            })}      
          </div>
        : <div id="cart_inner_main_empty" className="errormessage">Your cart is empty!<br/>Please, visit our shop <NavLink to='/main'>here</NavLink>!</div>}
        <div id="cart_aside">
          <div id="cart_checkout">
            <div>Gross total ({sampleOrderList.map(({ quantity }) => quantity).reduce((a, b) => a + b, 0)} items):</div>
            <div>
              {sampleOrderList.map(({ product_id, quantity }) => sampleCoffeeList.filter(({ id }) => product_id === id)[0].price * quantity).reduce((a, b) => a + b, 0).toLocaleString().split(',').join(' ')} HUF
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