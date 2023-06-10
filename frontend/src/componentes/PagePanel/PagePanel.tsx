import styled from '@emotion/styled';
import { Paper } from '@mui/material';

interface PagePanelProps {
  justify?: string;
  overflow?: string;
  backgroundColor?: string;
}

export const PagePanel = styled(Paper)<PagePanelProps>`
  padding: 0.938rem;
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: ${({ justify }) => justify || 'space-between'};
  max-height: 100%;
  -webkit-overflow-scrolling: touch;
  overflow: ${({ overflow }) => overflow || 'auto'};

  &::-webkit-scrollbar {
    width: 0.4em;
    background-color: #f5f5f5;
    height: 0.4em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #00766e28;
  }
`;
