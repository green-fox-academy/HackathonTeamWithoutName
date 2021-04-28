import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HeaderButton } from '../';
import { unloadErrorAction, setPreziVisibilityAction } from '../../actions';
import imageUrl from '../../assets/images/coffeelogo.png';

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
  const handleShop = () => {
    dispatch(unloadErrorAction());
    history.push('/main/shop');
  }
  const handleCart= () => {
    dispatch(unloadErrorAction());
    history.push('/main/cart');
  }

  const handleShowPrezi = () => {
    dispatch(setPreziVisibilityAction());
  }
  
  return(
    <div>
      
      <div className="header">
      <div className="navbarholder">
      <div className="showprezibutton"><HeaderButton innerText="Show Prezi" onClickEvent={handleShowPrezi}/></div>
      <HeaderButton innerText="Sign in" onClickEvent={handleSignIn}/>
      <HeaderButton innerText="Sign up" onClickEvent={handleSignUp}/>
      <HeaderButton innerText="Shop" onClickEvent={handleShop}/>
      <HeaderButton innerText="Cart" onClickEvent={handleCart}/>
      </div>
      </div>
      <div className="logoholder"><img className="logo" src={imageUrl} height="160px"alt="logo"/></div>
    </div>
  )
};