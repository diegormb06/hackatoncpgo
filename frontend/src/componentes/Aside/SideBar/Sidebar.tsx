import { Box, ListItemButton, ListItemText, useTheme } from '@mui/material';
import { House, SignOut } from '@phosphor-icons/react';
import React from 'react';

import { ItemContainer, SidePanel, StyledContainer } from './styles';

export const SideBar: React.FC = () => {
  const theme = useTheme();

  return (
    <SidePanel>
      <a>
        <img
          src="https://goias.gov.br/images/g5_padrao-institucional/preset1/goias.png"
          alt="logo goias"
        />
      </a>

      <nav
        style={{
          marginTop: '70px',
          maxWidth: '250px',
          minWidth: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Box>
          <ItemContainer isActive={true}>
            <ListItemButton sx={{ p: '5px' }} className="selected" onClick={() => false}>
              <House size={35} weight="thin" color="#00766F" />
              <ListItemText
                sx={{
                  color: theme.palette.primary.main,
                  pl: 1,
                }}
                primary={'Home'}
              />
            </ListItemButton>
          </ItemContainer>
        </Box>
        <Box>
          <ItemContainer>
            <ListItemButton onClick={() => sessionStorage.clear()}>
              <ListItemText
                sx={{
                  color: 'white',
                }}
                primary={
                  <StyledContainer>
                    <SignOut size={20} weight="thin" />
                    Sair
                  </StyledContainer>
                }
              />
            </ListItemButton>
          </ItemContainer>
        </Box>
      </nav>
    </SidePanel>
  );
};
