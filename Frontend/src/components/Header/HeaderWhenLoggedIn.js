import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HeaderButton } from '../';
import { unloadStoreAction, setPreziVisibilityAction } from '../../actions';

export const HeaderWhenLoggedIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogOut = () => {
    dispatch(unloadStoreAction());
    history.push('/login');
  }

  const handleLoadUploadImage = () => {
    history.push('/main/upload');
  }

  const handleShowPrezi = () => {
    dispatch(setPreziVisibilityAction());
  }
  
  return(
    <div>
      <HeaderButton innerText="Upload image" onClickEvent={handleLoadUploadImage}/>
      <HeaderButton innerText="Show Prezi" onClickEvent={handleShowPrezi}/>
      <HeaderButton innerText="Log out!" onClickEvent={handleLogOut}/>
    </div>
  )
};