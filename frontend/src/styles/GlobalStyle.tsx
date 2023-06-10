import { css, Global } from '@emotion/react';

export const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: 'Poppins', sans-serif;
        margin: 0;
        padding: 0;

        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }
    `}
  />
);
