import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchService } from '../../services';
import {
  loadUserDataAction,
  loadErrorAction,
  unloadErrorAction,
} from '../../actions';
import '../../styles/loginForm.css';

export const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { isError, errorMessage } = useSelector((state) => state.error.login);
  const dispatch = useDispatch();
  const history = useHistory();

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
      // const response = await fetchService.fetchData('login', 'POST', { userName, password }, null);
      dispatch(
        loadUserDataAction({ accessToken: true, id: 1, userName: 'viktor' })
      );
      history.push('/main');
    } catch (error) {
      console.log(error.message);
      dispatch(loadErrorAction({ type: 'login', message: error.message }));
    }
  };
  //<img className="loginFormImg" src={formImage} alt="Login Form" height="400px"></img>
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
            dispatch(unloadErrorAction());
          }}
        />
        <div>
          <input
            className="input"
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Password"
            minLength="6"
            value={password}
            onChange={(changeEvent) => {
              setPassword(changeEvent.target.value);
              dispatch(unloadErrorAction());
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
        {isError && <div className="errormessage">{errorMessage}</div>}
        <button type="submit">SIGN IN</button>
      </form>
      <div className="formImgBox"></div>
    </div>
  );
};
