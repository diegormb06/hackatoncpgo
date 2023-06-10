import styled from '@emotion/styled';

export const HomeContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 86px 1fr;
  grid-template-areas: 'sidebar header' 'sidebar main';
`;

export const HomeSection = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;
