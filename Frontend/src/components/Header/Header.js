import React from 'react';
import { useSelector } from 'react-redux';
import { HeaderWhenNotLoggedIn, HeaderWhenLoggedIn } from '../';

export const Header = () => {
  const { accessToken } = useSelector(state => state.userData);

  return accessToken ? <HeaderWhenLoggedIn /> : <HeaderWhenNotLoggedIn />;
};