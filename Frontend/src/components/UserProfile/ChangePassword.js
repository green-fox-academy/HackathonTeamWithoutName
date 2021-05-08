import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchService } from '../../services';
import { loadMessageAction, setMessageVisibilityAction } from '../../actions';
import '../../styles/OrderReview.css';

export const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { accessToken } = useSelector(state => state.userData);
  const dispatch = useDispatch();

  const handleSubmitOnChangePassword = async event => {
    event.preventDefault();
    try {
      const response = await fetchService.fetchData('user/pass', 'PUT', { oldpass: oldPassword, newpass: newPassword}, accessToken);
      dispatch(loadMessageAction({ type: 'response', message: response.message}));
      dispatch(setMessageVisibilityAction());
      setOldPassword('')
      setNewPassword('')
    } catch (error) {
      console.log(error.message);
      dispatch(loadMessageAction({ type: 'error', message: error.message}));
      dispatch(setMessageVisibilityAction());
    }
  }

  return (
    <form onSubmit={handleSubmitOnChangePassword}>
      <div id="user_profile_password_main">
        <div>Change password</div>
        <div id="change_password_input_field">
        <input
          type="password"
          placeholder="Old password"
          minLength="6"
          value={oldPassword}
          onChange={changeEvent => {
            setOldPassword(changeEvent.target.value);
          }}
        />
        <input
          type="password"
          placeholder="New password"
          minLength="6"
          value={newPassword}
          onChange={changeEvent => {
            setNewPassword(changeEvent.target.value);
          }}
        />
        </div>
        <button className="changePasswordSubmit" type="submit">Change password</button>
      </div>
    </form>
  )
};