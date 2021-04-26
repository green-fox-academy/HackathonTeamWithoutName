import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HeaderButton } from '../';
import { unloadErrorAction, setPreziVisibilityAction } from '../../actions';

export const HeaderWhenNotLoggedIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignIn = () => {
    dispatch(unloadErrorAction());
    history.push('/login');
  }
  
  const handleSignUp = () => {
    dispatch(unloadErrorAction());
    history.push('/register');
  }

  const handleShowPrezi = () => {
    dispatch(setPreziVisibilityAction());
  }
  
  return(
    <div>
      <HeaderButton innerText="Show Prezi" onClickEvent={handleShowPrezi}/>
      <HeaderButton innerText="Sign in!" onClickEvent={handleSignIn}/>
      <HeaderButton innerText="Sign up!" onClickEvent={handleSignUp}/>
    </div>
  )
};