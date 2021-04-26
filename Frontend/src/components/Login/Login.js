import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchService } from '../../services';
import { loadUserDataAction, loadErrorAction, unloadErrorAction } from '../../actions';


export const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { isError, errorMessage } = useSelector(state => state.error.login);
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
      // const response = await fetchService.fetchData('login', 'POST', { userName, password }, null);
      dispatch(loadUserDataAction({ accessToken: true, id: 1, userName: 'viktor' }));
      history.push('/main');
    } catch (error) {
      console.log(error.message);
      dispatch(loadErrorAction({ type: 'login', message: error.message}));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
         <h1>SIGN IN</h1>
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
          {isError && (<div className="errormessage">{errorMessage}</div>)}
          <button type="submit">SIGN IN</button>   
        </form>
    </div>
  );
};