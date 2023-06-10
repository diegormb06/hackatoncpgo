import styled from '@emotion/styled';

type PageContainerProps = {
  active?: boolean;
  sideWidth?: number;
};

export const PageContainer = styled.div<PageContainerProps>`
  grid-area: main;
  display: grid;
  grid-template-columns: ${({ active, sideWidth }) =>
    active ? ` 1fr ${sideWidth || '600'}px` : '1fr 0'};
  grid-template-rows: calc(100vh - 116px);
  padding: 0.938rem;
  place-content: center;
  background-color: #eef7f9;
  transition: all 100ms ease-out;
  overflow: hidden;
`;

export const FormPageContainer = styled.form<PageContainerProps>`
  grid-area: main;
  display: grid;
  grid-template-columns: ${({ active, sideWidth }) =>
    active ? ` 1fr ${sideWidth || '600'}px` : '1fr 0'};
  grid-template-rows: calc(100vh - 116px);
  padding: 0.938rem;
  place-content: center;
  background-color: #eef7f9;
  transition: all 100ms ease-out;
  overflow: hidden;
`;
