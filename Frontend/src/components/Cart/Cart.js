import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/Cart.css';
import { CartItem } from '../'
import { sampleCoffeeList, sampleOrderList } from './sampleCoffee';

export const Cart = () => {

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
        : <div id="cart_inner_main_empty" className="errormessage">A kosarad még üres!<br/>Tekintsd meg teljes kínálatunkat <NavLink to='/main'>itt</NavLink>!</div>}
        <div id="cart_checkout">
          <div>Gross total ({sampleOrderList.map(({ quantity }) => quantity).reduce((a, b) => a + b, 0)} items):</div>
          <div>
            {sampleOrderList.map(({ product_id, quantity }) => sampleCoffeeList.filter(({ id }) => product_id === id)[0].price * quantity).reduce((a, b) => a + b, 0).toLocaleString().split(',').join(' ')} Ft
          </div>
          <button>Proceed to checkout</button>
        </div>
      </div>
    </div>
  )
};