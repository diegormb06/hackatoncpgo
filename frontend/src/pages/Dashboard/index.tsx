import { Box, Paper } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import { SideBar } from '../../componentes/Aside/SideBar/Sidebar';
import { DataTable } from '../../componentes/DataTable/DataTable';
import { Header } from '../../componentes/Header/Header';
import { Kpr } from '../../componentes/Kpr/CardProgress';
import { PageContainer } from '../../componentes/PageContainer/PageContainer';
import { PagePanel } from '../../componentes/PagePanel/PagePanel';
import { HomeContainer } from './styles';
import { table } from './tableData';

type TableData = {
  id: number;
  serie: string;
  turma: string;
  indicios_bullyng: boolean;
  indicios_violencia: boolean;
  risco: 'baixo' | 'neutro' | 'alto';
};

type Risco ={
alto:number;
medio:number;
baixo:number;
}

export const Dashboard = () => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const[risco,setRisco]=useState<Risco>({
    alto:0,
    medio:0,
    baixo:0,} as Risco);
  // const [tableData, setTableData] = useState<TableData>({} as TableData);

  useEffect(() => {
    (async () => {
      const response = await fetch('https://api.autofastapp.com.br/hackaton');
      const newData = await response.json();
      console.log(newData.data);
      if (newData.data.length > 0) {
        setTableData(newData.data);
        contarCard
        }
    })();
  }, []);

  
  // const dataTable = useMemo(() => {
  //   if (!tableData?.id) return table;

  //   table[0] = {
  //     Série: tableData.serie,
  //     Turma: tableData.turma,
  //     'Indicios de Bullyng': tableData.indicios_bullyng ? 'Sim' : 'Não',
  //     'Indicios de Violência': tableData.indicios_violencia ? 'Sim' : 'Não',
  //     Risco:
  //       tableData.risco === 'baixo'
  //         ? 'Baixo'
  //         : tableData.risco === 'neutro'
  //         ? 'Médio'
  //         : 'Alto',
  //   };

  //   return table;
  // }, [tableData]);

  const dataTable = useMemo(() => {
    if (tableData.length == 0) return table;
    var x:any=[];
    tableData.map((e,i)=>{
      x[i] = {
        Série: e.serie,
        Turma: e.turma,
        'Indicios de Bullyng': e.indicios_bullyng ? 'Sim' : 'Não',
        'Indicios de Violência': e.indicios_violencia ? 'Sim' : 'Não',
        Risco:
          e.risco === 'baixo'
            ? 'Baixo'
            : e.risco === 'neutro'
            ? 'Médio'
            : 'Alto',
      }
    })
    return x;
  }, [tableData]);

  const contarCard = useMemo(()=>{
    let x:Risco = {
      alto:0,
      medio:0,
      baixo:0,
    };
    if(tableData.length>0){
      tableData.map((e:any)=>{
        if(e.risco == "baixo"){
          x.baixo ++
        } else if(e.risco == "medio"){
          x.medio++
        } else if (e.risco =="alto"){
          x.alto++
        }

      }
      );
      setRisco(x);
    }

  },[tableData])

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
            <Kpr qtdForm={risco.alto} text="Turmas com riscos" color="#F57A7A" />
            <Kpr qtdForm={risco.medio} text="Turmas com indicadores neutros" color="#4368B1" />
            <Kpr qtdForm={risco.baixo} text="Turmas com indicadores positivos" color="#00766F" />
          </Box>

          <Paper>
            <DataTable data={dataTable} onItemClick={() => false} />
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
