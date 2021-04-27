import React from 'react';
import '../../styles/OrderReview.css';
import { sampleCoffeeList, sampleOrderList } from '../Cart/sampleCoffee';

export const OrderReview = () => {

  return (
    <div id="order_review">
      <h1>Review your order</h1>
      <div id="order_review_main">
        <div id="order_review_inner_main">
          <div id="order_review_settings">
            <div id="order_review_shipping_address">

            </div>
            <div id="order_review_billing_address">

            </div>
            <div id="order_review_payment">

            </div>
          </div>
          <div id="order_review_items">
            <div id="order_review_items_list">

            </div>
            <div id="order_review_delivery_option">
              
            </div>
          </div>
        </div>
        <div id="order_review_aside">
          <div id="order_review_checkout">
            <div>
              Gross total ({sampleOrderList.map(({ quantity }) => quantity).reduce((a, b) => a + b, 0)} items):
            </div>
            <div>
              {sampleOrderList.map(({ product_id, quantity }) => sampleCoffeeList.filter(({ id }) => product_id === id)[0].price * quantity).reduce((a, b) => a + b, 0).toLocaleString().split(',').join(' ')} Ft
            </div>
            <button>Place your order</button>
          </div>
        </div>
      </div>
    </div>
  )
};