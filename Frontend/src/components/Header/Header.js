import React from 'react';
import { useSelector } from 'react-redux';
import { HeaderWhenNotLoggedIn, HeaderWhenLoggedIn } from '../';
import '../../styles/Header.css';

export const Header = () => {
  const { accessToken } = useSelector(state => state.userData);

  return accessToken ? <HeaderWhenLoggedIn />: <HeaderWhenNotLoggedIn />;
};