import styled from '@emotion/styled';

type DataTableProps = {
  color?: string;
  lastPosition?: string;
};

export const DataTableContainer = styled.div<DataTableProps>`
  min-height: 270px;
  max-height: 320px;
  overflow-y: auto;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-color: #00766e28;

  ::-webkit-scrollbar {
    width: 0.4em;
    height: 0.4em;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #00766e28;
  }

  table {
    font-size: 14px;
    color: ${({ theme }) => theme.palette.primary.main};

    th,
    td {
      border: none;
      text-align: left;
      color: ${({ color, theme }) => color || theme.palette.primary.main};

      :last-of-type {
        text-align: ${({ lastPosition }) => lastPosition};
      }
    }

    thead th {
      font-weight: 100;
      background-color: ${({ theme }) => theme.palette.primary.main};
      color: #ffffff;
      position: sticky;
      top: 0;

      :last-of-type {
        text-align: ${({ lastPosition }) => lastPosition};
      }
    }

    tbody tr:nth-of-type(odd) {
      background-color: #eef7f9;
    }
  }
`;
