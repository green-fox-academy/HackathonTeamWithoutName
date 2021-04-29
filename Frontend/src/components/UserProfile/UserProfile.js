import React from 'react';
import { ModifyAddress, CreateAddress, ChangePassword } from '../../components'
import '../../styles/UserProfile.css';

export const UserProfile = () => {

  return (
    <div id="user_profile">
      <h1>Profile settings</h1>
        <CreateAddress />
        <ModifyAddress />
        <ChangePassword />
    </div>
  )
};