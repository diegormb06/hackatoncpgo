import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Quantidade de Escolas completas',
    },
  },
};

export const LineChart = () => {
  const LineData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],

    datasets: [
      {
        label: 'Completos',
        fill: false,
        lineTension: 0.1,
        borderColor: '#007670',
        pointBorderColor: '#007670',
        pointBackgroundColor: '#fff',
        data: [15, 40, 50, 20, 55, 30, 25, 35, 5, 60, 10, 45, 65],
      },
      {
        label: 'Em Aberto',
        fill: false,
        lineTension: 0.1,
        borderColor: '#f66c6c',
        pointBorderColor: '#ef4b4b',
        pointBackgroundColor: '#fff',
        data: [3, 4, 10, 8, 5, 4, 1, 3, 4, 10, 8, 5, 4, 1],
      },
    ],
  };

  return <Line data={LineData} options={options} height={200} />;
};
