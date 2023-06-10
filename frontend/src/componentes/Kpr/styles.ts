import styled from '@emotion/styled';
import { Paper } from '@mui/material';

type ContainerCardProps = {
  color?: string;
};

export const ContainerCardProgress = styled(Paper)<ContainerCardProps>`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  flex: 1;

  span {
    color: ${({ color }) => color};
    font-size: 3em;
    padding: 10px;
    font-family: 'Poppins', sans-serif;
  }

  p {
    color: #515151;
    font-size: 1.2em;
    font-family: 'Poppins', sans-serif;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
`;
