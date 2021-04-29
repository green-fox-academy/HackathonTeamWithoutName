import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchService } from '../../services';
import { loadErrorAction, updateAddressDataAction } from '../../actions';
import '../../styles/OrderReview.css';

export const ModifyAddress = () => {
  const { addresses } = useSelector(state => state.addressData);
  const { accessToken } = useSelector(state => state.userData);
  const dispatch = useDispatch();
  const [newAddress, setNewAddress] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    country: '',
    city: '',
    zip_code: '',
    street: '',
    house_number: '',
  });

  const handleChangeOnSelectedAddress = event => {
    const addressIndex = event.target.value;
    if (addressIndex !== 'initial') {
      setNewAddress(addresses[addressIndex]);
    } else {
      setNewAddress({
        first_name: '',
        last_name: '',
        phone: '',
        country: '',
        city: '',
        zip_code: '',
        street: '',
        house_number: '',
      })
    }
  };

  const handleChangeOnAddressValue = event => {
    const newValue = event.target.value;
    const newKey = event.target.name;
    setNewAddress({ ...newAddress, [newKey]: newValue});
  };

  const handleSubmitOnPlaceOrder = async event => {
    event.preventDefault();
    try {
      await fetchService.fetchData('user/address', 'PUT', newAddress, accessToken);
      dispatch(updateAddressDataAction(newAddress));
    } catch (error) {
      console.log(error.message);
      dispatch(loadErrorAction({ type: 'address', message: error.message }));
    }
  }

  return (
      <form onSubmit={handleSubmitOnPlaceOrder}>
        <div id="user_profile_modify_main">
          <div>Modify address:</div>
          <select id="myList" onChange={handleChangeOnSelectedAddress}>
            <option value="initial">Please select your address</option>
            { addresses.map((address, index) => <option key={address.id} value={index}>{address.street}</option>)}
          </select>
          <div id="user_profile_modify_input_field">
            <input 
              type="text"
              name="first_name"
              placeholder="First name" 
              onChange={handleChangeOnAddressValue}
              value={newAddress.first_name}
            />
            <input 
              type="text" 
              name="last_name"
              placeholder="Last name" 
              onChange={handleChangeOnAddressValue}
              value={newAddress.last_name}
            />
            <input 
              type="text" 
              name="phone"
              placeholder="Phone number" 
              onChange={handleChangeOnAddressValue}
              value={newAddress.phone}
            />
            <input 
              type="text" 
              name="country"
              placeholder="Country" 
              onChange={handleChangeOnAddressValue}
              value={newAddress.country}
            />
            <input 
              type="text" 
              name="city"
              placeholder="City" 
              onChange={handleChangeOnAddressValue}
                value={newAddress.city}
            />
            <input 
              type="text"
              name="zip_code" 
              placeholder="Postcode" 
              onChange={handleChangeOnAddressValue}
                value={newAddress.zip_code}
            />
            <input 
              type="text" 
              name="street"
              placeholder="Street" 
              onChange={handleChangeOnAddressValue}
              value={newAddress.street}
            />
            <input 
              type="text"
              name="house_number" 
              placeholder="House number" 
              onChange={handleChangeOnAddressValue}
              value={newAddress.house_number}
            />
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
  )
};