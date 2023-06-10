import styled from '@emotion/styled';

type SidePanelStyle = {
  isActive?: boolean;
};

export const SidePanel = styled.div<SidePanelStyle>`
  min-height: 100vh;
  min-width: 215px;
  background: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;

  a {
    text-decoration: none;
  }

  .selected {
    min-width: 100%;
    background-color: ${({ isActive, theme }) =>
      isActive ? '#fff' : theme.palette.primary.main};
    color: ${({ isActive, theme }) => (isActive ? theme.palette.primary.main : '#fff')};
  }
`;
export const StyledContainer = styled('span')({
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
});

type ItemContainerStyle = {
  isActive?: boolean;
};

export const ItemContainer = styled.div<ItemContainerStyle>`
  background-color: ${({ isActive, theme }) =>
    isActive ? '#fff' : theme.palette.primary.main};
  display: flex;
  transition: all 0.2s ease;
  position: relative;
  cursor: pointer;
  max-width: 100%;
  path {
    fill: ${({ isActive, theme }) => (isActive ? theme.palette.primary.main : '#FFF')};
  }

  .selected {
    min-width: 100%;
    background-color: ${({ isActive, theme }) =>
      isActive ? '#fff' : theme.palette.primary.main};
    color: ${({ isActive, theme }) => (isActive ? theme.palette.primary.main : '#fff')};
  }

  .active {
    min-width: 100%;
    background-color: ${({ isActive, theme }) =>
      isActive ? '#E3E3E3' : theme.palette.primary.main};
  }

  .item-name {
    color: ${({ isActive, theme }) => (isActive ? theme.palette.primary.main : '#fff')};
  }
`;
