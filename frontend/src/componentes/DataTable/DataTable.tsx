import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useState } from 'react';

import { DataTableContainer } from './styles';

type DataTableProps = {
  data: Record<string | number, unknown>[];
  onItemClick: (row: unknown, index: number) => void;
  pagination?: boolean;
  maxWidth?: number;
  maxHeight?: number;
  color?: string;
  lastPosition?: string;
  defaultRows?: number;
};

export const DataTable = ({
  data,
  pagination = true,
  onItemClick,
  maxWidth,
  maxHeight,
  lastPosition = 'right',
  defaultRows,
}: DataTableProps) => {
  const columns = Object.keys(data[0]);
  const defaultRowsPerPage = defaultRows ?? 5;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);

  const [activeRowIndex, setActiveRowIndex] = useState(-1);

  const columnsValues = data
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((e) => {
      return Object.values(e);
    });

  const formatRow = (e: unknown[]) => {
    return e.map((e, i) => {
      const dataRow = e as string;
      return (
        <TableCell style={{ color: 'inherit' }} key={dataRow + i}>
          {dataRow}
        </TableCell>
      );
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleClick = (index: number, rowData: unknown) => {
    if (index == activeRowIndex) {
      setActiveRowIndex(-1);
    } else {
      setActiveRowIndex(index);
    }
    onItemClick(rowData, index);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <DataTableContainer lastPosition={lastPosition} style={{ maxWidth, maxHeight }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((e) => (
              <TableCell key={e}>{e}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {columnsValues.map((element, index) => (
            <TableRow
              key={index}
              style={{
                border: activeRowIndex === index ? '2px solid #007670' : 'none',
                fontWeight: 'bold',
                color: element[4] === 'Alto' ? 'red' : 'inherit',
                cursor: 'pointer',
              }}
              onClick={() => handleClick(index, data[index])}
            >
              {formatRow(element)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[defaultRowsPerPage, 10, 20, 50]}
          component="div"
          labelRowsPerPage={'Linhas por página: '}
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </DataTableContainer>
  );
};
