import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchService } from '../../services';
import { loadErrorAction, unloadErrorAction } from '../../actions';
import '../../styles/RegisterForm.css';
import formImg from '../../assets/images/registerFormImg.jpg'

export const Register = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { isError, errorMessage } = useSelector(state => state.error.register);
  const dispatch = useDispatch();
  const history = useHistory();
 
  const handleChangePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validateUserInput = () => {
    if (!userName && !password) {
      throw Error ('Username and password are required');
    };
    if (!userName || !password) {
      throw Error (`${!userName ? 'Username' : 'Password'} is required.`);
    };
    if (userName.length < 3) {
      throw Error ('Username must be at least 3 characters.');
    };
    if (password.length < 6) {
      throw Error ('Password must be at least 6 characters.');
    };
  };

  const handleSubmit = async submitEvent => {
    submitEvent.preventDefault();
    try {
      await validateUserInput();
      await fetchService.fetchData('register', 'POST', { userName, password, email }, null);
      history.push('/login');
    } catch (error) {
      console.log(error.message);
      dispatch(loadErrorAction({ type: 'register', message: error.message}));
    }
  };

  return (
    <div className="registerBox">
      <div className="registerFormImgBox"><img src={formImg} alt="coffee"/></div>
      <form className="registerForm" onSubmit={handleSubmit}>
        <h1>SIGN UP</h1>
          <input
            type="text"
            placeholder="Username"
            minLength="3"
            value={userName}
            onChange={changeEvent => {
              setUserName(changeEvent.target.value);
              dispatch(unloadErrorAction());
            }}
          />
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
          <div className="passworddiv">
          <input
            className="passwordinput"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            minLength="6"
            value={password}
            onChange={changeEvent => {
              setPassword(changeEvent.target.value);
              dispatch(unloadErrorAction());
            }}
          />
          {isPasswordVisible 
            ? (<i className="fa fa-eye" aria-hidden="true" onClick={handleChangePasswordVisibility}/>) 
            : (<i className="fa fa-eye-slash" aria-hidden="true" onClick={handleChangePasswordVisibility}/>)
          }
          </div>
          {isError && (<div className="errormessage">{errorMessage}</div>)}
          <button type="submit">SIGN UP</button>
        </form>
    </div>
  );
};