import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';

import { Materialtheme } from '@/assets/styles/MaterialTheme';

import { DataTable } from './DataTable';

describe('DataTable', () => {
  it('Deve exibir o número correto de linhas por página quando a paginação estiver habilitada', () => {
    const rowsPerPage = 2;
    const props = {
      data: [
        { id: 1, name: 'John' },
        { id: 2, name: 'Mary' },
        { id: 3, name: 'Bob' },
      ],
      onItemClick: jest.fn(),
      pagination: true,
    };

    render(
      <ThemeProvider theme={Materialtheme}>
        <DataTable {...props} />
      </ThemeProvider>,
    );

    const firstPageRows = screen.getAllByRole('row').slice(1, rowsPerPage + 1);
    expect(firstPageRows).toHaveLength(rowsPerPage);

    const secondPageRows = screen.getAllByRole('row').slice(rowsPerPage);
    expect(secondPageRows).toHaveLength(rowsPerPage);
  });

  it("Deve exibir a mensagem 'Linhas por página:' por padrão quando a paginação estiver habilitada", () => {
    const props = {
      data: [
        { id: 1, name: 'John' },
        { id: 2, name: 'Mary' },
        { id: 3, name: 'Bob' },
      ],
      onItemClick: jest.fn(),
      pagination: true,
    };

    render(
      <ThemeProvider theme={Materialtheme}>
        <DataTable {...props} />
      </ThemeProvider>,
    );

    const labelRowsPerPage = screen.getByText(/Linhas por página:/i);
    expect(labelRowsPerPage).toBeInTheDocument();
  });
});
