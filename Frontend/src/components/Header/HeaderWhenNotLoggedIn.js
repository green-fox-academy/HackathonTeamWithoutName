import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HeaderButton } from '../';
import { Link } from 'react-router-dom';
import { setPreziVisibilityAction } from '../../actions';
import imageUrl from '../../assets/images/coffeelogo.png';

export const HeaderWhenNotLoggedIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignIn = () => {
    history.push('/login');
  }
  
  const handleSignUp = () => {
    history.push('/register');
  }

  const handleShop = () => {
    history.push('/main/shop');
  }
  
  const handleCart= () => {
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
      <div className="logoholder"><Link to="/main/landingpage"><img className="logo" src={imageUrl} height="160px"alt="logo"/></Link><p className="logotext">Coffee to Go</p></div>
    </div>
  )
};