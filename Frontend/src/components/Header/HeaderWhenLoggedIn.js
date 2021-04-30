import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HeaderButton } from '../';
import { Link } from 'react-router-dom';
import { unloadStoreAction, setPreziVisibilityAction } from '../../actions';
import imageUrl from '../../assets/images/coffeelogo.png';

export const HeaderWhenLoggedIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogOut = () => {
    dispatch(unloadStoreAction());
    history.push('/');
  }

  const handleCart= () => {
    history.push('/main/cart');
  }

  const handleShop = () => {
    history.push('/main/shop');
  }

  const handleShowPrezi = () => {
    dispatch(setPreziVisibilityAction());
  }
  
  const handleUserProfile= () => {
    history.push('/main/userprofile');
  }
  
  return(
    <div>
      <div className="header">
      <div className="navbarholder">
      <div className="showprezibutton">
        <HeaderButton innerText="Show Prezi" onClickEvent={handleShowPrezi}/></div>
      <HeaderButton innerText="My profile" onClickEvent={handleUserProfile}/>
      <HeaderButton innerText="Shop" onClickEvent={handleShop}/>
      <HeaderButton innerText="Cart" onClickEvent={handleCart}/>
      <HeaderButton innerText="Log out" onClickEvent={handleLogOut}/>
      </div>
      </div>
      <div className="logoholder"><Link to="/main/landingpage"><img className="logo" src={imageUrl} height="160px"alt="logo"/></Link><p className="logotext">Coffee to Go</p></div>
    </div>
  )
};