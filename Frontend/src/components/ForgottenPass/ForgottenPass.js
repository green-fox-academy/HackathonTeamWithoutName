import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchService } from '../../services';
import { loadMessageAction, setMessageVisibilityAction } from '../../actions';
import '../../styles/ForgottenPass.css';
import formImg from '../../assets/images/forgottenFormImg.jpg'

export const ForgottenPass = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
 
  const validateUserInput = () => {
    if (!email) {
      throw Error('Please enter the email address of your account.');
    }
  };
  const handleSubmit = async submitEvent => {
    submitEvent.preventDefault();
    try {
      await validateUserInput();
      const response = await fetchService.fetchData('user/forgottenpass', 'POST', { email }, null);
      dispatch(loadMessageAction({ type: 'response', message: response.message}));
      dispatch(setMessageVisibilityAction());
      history.push('/login');
    } catch (error) {
      console.log(error.message);
      dispatch(loadMessageAction({ type: 'error', message: error.message}));
      dispatch(setMessageVisibilityAction());
    }
  };

  return (
    <div className="forgottenBox">
      <div className="forgottenFormImgBox"><img src={formImg} alt="coffee"/></div>
      <form className="forgottenForm" onSubmit={handleSubmit}>
        <h1>Forgot your password?</h1>
          <input
            type="email"
            placeholder="Email"
            minLength="3"
            value={email}
            onChange={changeEvent => {
              setEmail(changeEvent.target.value);
            }}
          />
          <div>
          </div>
          <button type="submit">RESET PASSWORD</button>
        </form>
    </div>
  );
};