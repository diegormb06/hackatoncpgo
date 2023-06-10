import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';

export const ContainerHeader = styled.div`
  width: 100%;
  height: 86px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding: 20px;
  color: #ffffff;
  border: 1px solid #ebebeb;
`;

export const TitlePerfil = styled.p`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: normal;
  display: flex;
  align-items: center;
  font-size: 1.25em;
`;

export const SearchInput = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e3e3e3;
  border-radius: 20px;
  background: #f8f8f8;
  padding: 2px;
  flex: 1;
  max-width: 350px;
`;

export const ButtonSearch = styled(IconButton)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  width: 34px;
  height: 35px;
  padding: 8px;
  &:hover {
    background-color: #018080;
  }
`;
