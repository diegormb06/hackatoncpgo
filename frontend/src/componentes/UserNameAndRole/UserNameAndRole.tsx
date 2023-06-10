import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react';

import { Content, IconContainer, UserDataWrapper, UserRole } from './styles';

export type UserDataProps = {
  name: string;
  userRole?: string;
};
export const UserData: React.FC<UserDataProps> = ({ name, userRole }) => {
  return (
    <UserDataWrapper>
      <IconContainer>
        <AccountCircleIcon sx={{ fontSize: 55 }} />
      </IconContainer>
      <Content>
        <p>{name}</p>
        <UserRole>{userRole}</UserRole>
      </Content>
    </UserDataWrapper>
  );
};
