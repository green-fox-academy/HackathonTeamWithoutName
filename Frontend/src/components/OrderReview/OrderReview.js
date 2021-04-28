import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { OrderReviewItem } from '../';
import { sampleCoffeeList } from '../Cart/sampleCoffee';
import '../../styles/OrderReview.css';

export const OrderReview = () => {
  const { addresses } = useSelector(state => state.addressData);
  const { orders } = useSelector(state => state.orderData);
  const [shippingAddress, setShippingAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [payment, setPayment] = useState('');
  const [delivery, setDelivery] = useState('');
  const [deliveryCost, setDeliveryCost] = useState(0);
  const orderTotal = deliveryCost + orders.map(({ product_id, quantity }) => sampleCoffeeList.filter(({ id }) => product_id === id)[0].price * quantity).reduce((a, b) => a + b, 0);

  const handleChangeOnDelivery = event => {
    const newDelivery = event.target.value;
    setDelivery(newDelivery);
    setDeliveryCost(0);
  }

  const handleChangeOnPayment = event => {
    const newPayment = event.target.value;
    setPayment(newPayment);
  }

  const handleChangeOnBillingAddress = event => {
    const newBillingAddress = event.target.value;
    setBillingAddress(newBillingAddress);
  }

  const handleChangeOnShippingAddress = event => {
    const newShippingAddress = event.target.value;
    setShippingAddress(newShippingAddress);
  }

  const handleSubmit = event => {
    event.preventDefault();
    console.log({shippingAddress:addresses[shippingAddress], billingAddress:addresses[billingAddress], payment, delivery, orderTotal});
  }

  return (
    <div id="order_review">
      <h1>Review your order</h1>
      <form onSubmit={handleSubmit}>
        <div id="order_review_main">
          <div id="order_review_inner_main">
            <div id="order_review_settings">
              <div id="order_review_shipping_address">
                <div>Shipping address:</div>
                <select id="myList" onChange={handleChangeOnShippingAddress}>
                  <option value="">Please select your shipping address</option>
                  { addresses.map((address, index) => <option key={address.id} value={index}>{address.street}</option>)}
                </select>
                <div>
                  <div>
                    <input type="text" placeholder="First name" value={shippingAddress && addresses[shippingAddress].first_name} disabled/>
                    <input type="text" placeholder="Last name" value={shippingAddress && addresses[shippingAddress].last_name} disabled/>
                  </div>
                  <input type="text" placeholder="Phone number" value={shippingAddress && addresses[shippingAddress].phone} disabled/>
                  <input type="text" placeholder="Country" value={shippingAddress && addresses[shippingAddress].country} disabled/>
                  <input type="text" placeholder="City" value={shippingAddress && addresses[shippingAddress].city} disabled/>
                  <input type="text" placeholder="Postcode" value={shippingAddress && addresses[shippingAddress].zip_code} disabled/>
                  <div>
                    <input type="text" placeholder="Street" value={shippingAddress && addresses[shippingAddress].street} disabled/>
                    <input type="text" placeholder="House number" value={shippingAddress && addresses[shippingAddress].house_number} disabled/>
                  </div>
                </div>
              </div>
              <div id="order_review_billing_address">
                <div>Billing address:</div>
                <select id="myList" onChange={handleChangeOnBillingAddress}>
                  <option value="">Please select your billing address</option>
                  { addresses.map((address, index) => <option key={address.id} value={index}>{address.street}</option>)}
                </select>
                <div>
                  <div>
                    <input type="text" placeholder="First name" value={billingAddress && addresses[billingAddress].first_name} disabled/>
                    <input type="text" placeholder="Last name" value={billingAddress && addresses[billingAddress].last_name} disabled/>
                  </div>
                  <input type="text" placeholder="Phone number" value={billingAddress && addresses[billingAddress].phone} disabled/>
                  <input type="text" placeholder="Country" value={billingAddress && addresses[billingAddress].country} disabled/>
                  <input type="text" placeholder="City" value={billingAddress && addresses[billingAddress].city} disabled/>
                  <input type="text" placeholder="Postcode" value={billingAddress && addresses[billingAddress].zip_code} disabled/>
                  <div>
                    <input type="text" placeholder="Street" value={billingAddress && addresses[billingAddress].street} disabled/>
                    <input type="text" placeholder="House number" value={billingAddress && addresses[billingAddress].house_number} disabled/>
                  </div>
                </div>
              </div>
              <div id="order_review_payment">
                <div>Payment method:</div>
                <div>
                  <input type="radio" name="payment" value="by_cash" onChange={handleChangeOnPayment}/>
                  <label htmlFor="by_cash">Payment by cash on delivery</label>
                </div>
              </div>
            </div>
            <div id="order_review_items">
              <div id="order_review_items_list">
                <div id="order_review_items_list_title">Items:</div>
                { orders.map(({ product_id, quantity }) => {
                  return sampleCoffeeList.map(({ id, title, price, image }) => {
                    return product_id === id && <OrderReviewItem key={product_id} order={{title, price, image, quantity}}/>
                  })
                })} 
              </div>
              <div id="order_review_delivery_option">
                <div id="order_review_delivery_option_title">Choose a delivery option:</div>
                <div>
                  <input type="radio" name="delivery" value="standard" onChange={handleChangeOnDelivery}/>
                  <label htmlFor="standard">FREE Standard Shipping</label>
                </div>
              </div>
            </div>
          </div>
          <div id="order_review_aside">
            <div id="order_review_checkout">
              <div id="order_review_checkout_summary">Order summary</div>
              <div>
                <div>
                  Items ({orders.map(({ quantity }) => quantity).reduce((a, b) => a + b, 0)}):
                </div>
                <div>
                  {orders.map(({ product_id, quantity }) => sampleCoffeeList.filter(({ id }) => product_id === id)[0].price * quantity).reduce((a, b) => a + b, 0).toLocaleString().split(',').join(' ')} HUF
                </div>
              </div>
              <div>
                <div>
                  Shipping:
                </div>
                <div>
                  {deliveryCost} HUF
                </div>
              </div>
              <div id="order_review_checkout_total">
                <div>
                  Order Total:
                </div>
                <div>
                  {orderTotal.toLocaleString().split(',').join(' ')} HUF
                </div>
              </div>
              { orders.length > 0 && shippingAddress && billingAddress && delivery && payment ? <button type="submit">Place your order</button> : <button type="submit" disabled>Place your order</button> }
            </div>
          </div>
        </div>
      </form>
    </div>
  )
};