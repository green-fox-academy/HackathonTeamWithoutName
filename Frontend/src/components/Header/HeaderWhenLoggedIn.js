import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HeaderButton } from '../';
import { unloadStoreAction,unloadErrorAction, setPreziVisibilityAction } from '../../actions';
import imageUrl from '../../assets/images/coffeelogo.png';

export const HeaderWhenLoggedIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogOut = () => {
    dispatch(unloadStoreAction());
    history.push('/');
  }
  const handleCart= () => {
    dispatch(unloadErrorAction());
    history.push('/main/cart');
  }
  const handleShop = () => {
    dispatch(unloadErrorAction());
    history.push('/main/shop');
  }
  const handleShowPrezi = () => {
    dispatch(setPreziVisibilityAction());
  }
  const handleUserProfile= () => {
    dispatch(unloadErrorAction());
    history.push('/main/userprofile');
  }
  
  return(
    <div>
      <div className="header">
      <div className="navbarholder">
      <div className="showprezibutton"><HeaderButton innerText="Show Prezi" onClickEvent={handleShowPrezi}/></div>
      <HeaderButton innerText="My profile" onClickEvent={handleUserProfile}/>
      <HeaderButton innerText="Shop" onClickEvent={handleShop}/>
      <HeaderButton innerText="Cart" onClickEvent={handleCart}/>
      <HeaderButton innerText="Log out" onClickEvent={handleLogOut}/>
      </div>
      </div>
      <div className="logoholder"><img className="logo" src={imageUrl} height="160px"alt="logo"/><p>Coffee to Go</p></div>
    </div>
  )
};