import styled from '@emotion/styled';

export const UserDataWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const IconContainer = styled.div`
  color: ${({ theme }) => theme.palette.primary.main};
  align-items: center;
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  color: #2e2e2e;
  font-family: 'Poppins', sans-serif;
`;

export const UserRole = styled.div`
  display: flex;
  font-size: 0.875rem;
  font-weight: normal;
  color: #bbbbbb;
  justify-content: flex-end;
`;
