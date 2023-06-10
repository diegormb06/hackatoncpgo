import { Box, Paper } from '@mui/material';

import { SideBar } from '../../componentes/Aside/SideBar/Sidebar';
import { DataTable } from '../../componentes/DataTable/DataTable';
import { Header } from '../../componentes/Header/Header';
import { Kpr } from '../../componentes/Kpr/CardProgress';
import { PageContainer } from '../../componentes/PageContainer/PageContainer';
import { PagePanel } from '../../componentes/PagePanel/PagePanel';
import { HomeContainer } from './styles';
import { table } from './tableData';

export const Dashboard = () => {
  return (
    <HomeContainer>
      <SideBar />
      <Header />
      <PageContainer>
        <PagePanel
          sx={{
            padding: '0 !important',
            boxShadow: 'none',
            gap: 2,
            background: 'transparent',
          }}
        >
          <Box sx={{ display: 'flex', columnGap: 5, rowGap: 2, flexWrap: 'wrap' }}>
            <Kpr qtdForm={1560} text="Formulários Completos" color="#00766F" />
            <Kpr qtdForm={210} text="Formulários Não Iniciados" color="#F57A7A" />
            <Kpr qtdForm={2560} text="Formulários Em Andamento" color="#4368B1" />
          </Box>

          <Paper>
            <DataTable data={table} onItemClick={() => false} />
          </Paper>
        </PagePanel>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 15,
          }}
        ></div>
      </PageContainer>
    </HomeContainer>
  );
};
