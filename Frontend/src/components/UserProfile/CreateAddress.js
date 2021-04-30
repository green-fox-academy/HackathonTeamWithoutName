import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchService } from '../../services';
import { loadErrorAction, loadNewAddressDataAction } from '../../actions';
import '../../styles/OrderReview.css';

export const CreateAddress = () => {
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

  const handleChangeOnAddressValue = event => {
    const newValue = event.target.value;
    const newKey = event.target.name;
    if (newKey === 'phone') {
      setNewAddress({ ...newAddress, [newKey]: Number(newValue)});
    } else {
      setNewAddress({ ...newAddress, [newKey]: newValue});
    }
  };

  const handleSubmitOnPlaceOrder = async event => {
    event.preventDefault();
    try {
      const { address_id } = await fetchService.fetchData('user/address', 'POST', newAddress, accessToken);
      dispatch(loadNewAddressDataAction([{...newAddress, id: address_id}]));
    } catch (error) {
      console.log(error.message);
      dispatch(loadErrorAction({ type: 'address', message: error.message }));
    }
  }

  return (
    <form onSubmit={handleSubmitOnPlaceOrder}>
      <div id="user_profile_create_main">
        <div>Create address:</div>
        <div id="user_profile_create_input_field">
          <input 
            className="createFirstName"
            type="text"
            name="first_name"
            placeholder="First name" 
            onChange={handleChangeOnAddressValue}
            value={newAddress.first_name}
          />
          <input
            className="createLastName"
            type="text" 
            name="last_name"
            placeholder="Last name" 
            onChange={handleChangeOnAddressValue}
            value={newAddress.last_name}
          />
          <input 
            className="createPhoneNumber"
            type="text" 
            name="phone"
            placeholder="Phone number" 
            onChange={handleChangeOnAddressValue}
            value={newAddress.phone}
          />
          <input 
            className="createCountry"
            type="text" 
            name="country"
            placeholder="Country" 
            onChange={handleChangeOnAddressValue}
            value={newAddress.country}
          />
          <input 
            className="createCity"
            type="text" 
            name="city"
            placeholder="City" 
            onChange={handleChangeOnAddressValue}
              value={newAddress.city}
          />
          <input 
            className="createPostcode"
            type="text"
            name="zip_code" 
            placeholder="Postcode" 
            onChange={handleChangeOnAddressValue}
              value={newAddress.zip_code}
          />
          <input 
            className="createStreet"
            type="text" 
            name="street"
            placeholder="Street" 
            onChange={handleChangeOnAddressValue}
            value={newAddress.street}
          />
          <input 
            className="createHouseNumber"
            type="text"
            name="house_number" 
            placeholder="House number" 
            onChange={handleChangeOnAddressValue}
            value={newAddress.house_number}
          />
        </div>
        <button className="createSubmit" type="submit">ADD</button>
      </div>
    </form>
  )
};