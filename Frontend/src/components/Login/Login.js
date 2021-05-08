import React, { useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchService } from '../../services';
import {
  loadUserDataAction,
  loadAddressDataAction,
  loadAllOrderDataAction,
  loadMessageAction,
  setMessageVisibilityAction,
} from '../../actions';
import '../../styles/loginForm.css';
import formImg from '../../assets/images/loginFormImg.jpg';

export const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { orders: ordersInStore } = useSelector((state) => state.orderData);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleChangePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validateUserInput = () => {
    if (!userName && !password) {
      throw Error('Username and password are required');
    }
    if (!userName || !password) {
      throw Error(`${!userName ? 'Username' : 'Password'} is required.`);
    }
    if (userName.length < 3) {
      throw Error('Username must be at least 3 characters.');
    }
    if (password.length < 6) {
      throw Error('Password must be at least 6 characters.');
    }
  };

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();
    try {
      await validateUserInput();
      const { accessToken, addresses, orders } = await fetchService.fetchData(
        'user/login',
        'POST',
        { userName, password, orders: ordersInStore },
        null
      );
      location.state === '/main/cart'
        ? history.push('/main/cart')
        : history.push('/main');
      history.push('/main');
      dispatch(loadUserDataAction({ accessToken, userName }));
      dispatch(loadAddressDataAction(addresses));
      dispatch(loadAllOrderDataAction(orders));
    } catch (error) {
      console.log(error.message);
      dispatch(loadMessageAction({ type: 'error', message: error.message }));
      dispatch(setMessageVisibilityAction());
    }
  };

  return (
    <div className="loginBox">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h1 className="loginTitle">SIGN IN</h1>
        <input
          className="input"
          type="text"
          placeholder="Username"
          minLength="3"
          value={userName}
          onChange={(changeEvent) => {
            setUserName(changeEvent.target.value);
          }}
        />
        <div className="passworddiv">
          <input
            className="input"
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Password"
            minLength="6"
            value={password}
            onChange={(changeEvent) => {
              setPassword(changeEvent.target.value);
            }}
          />
          {isPasswordVisible ? (
            <i
              className="fa fa-eye"
              aria-hidden="true"
              onClick={handleChangePasswordVisibility}
            />
          ) : (
            <i
              className="fa fa-eye-slash"
              aria-hidden="true"
              onClick={handleChangePasswordVisibility}
            />
          )}
        </div>
        <button type="submit">SIGN IN</button>
        <Link to="/forgottenpass">
          <p className="forgottenPassword">Forgot your password?</p>
        </Link>
      </form>
      <div className="formImgBox">
        <img src={formImg} alt="login" />
      </div>
    </div>
  );
};
