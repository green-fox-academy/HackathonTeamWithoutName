import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchService } from '../../services';
import { loadErrorAction, unloadErrorAction } from '../../actions';
import '../../styles/ForgottenPass.css';
import formImg from '../../assets/images/forgottenFormImg.jpg'

export const ForgottenPass = () => {
  const [email, setEmail] = useState('');
  const { isError, errorMessage } = useSelector(state => state.error.register);
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
      await fetchService.fetchData('forgottenpass', 'POST', { email }, null);
      history.push('/login');
    } catch (error) {
      console.log(error.message);
      dispatch(loadErrorAction({ type: 'register', message: error.message}));
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
              dispatch(unloadErrorAction());
            }}
          />
          <div>
          </div>
          {isError && (<div className="errormessage">{errorMessage}</div>)}
          <button type="submit">RESET PASSWORD</button>
        </form>
    </div>
  );
};