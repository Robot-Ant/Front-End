import React from 'react';
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
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function BackTestLineChart(props) {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '자동매매 전략 백테스팅 차트',
      },
    },
  };

  const labels = props.items.date;

  const data = {
    labels,
    datasets: [
      {
        label: '변동성 돌파매매',
        data: props.items.asset_vb,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '평균 복원',
        data: props.items.asset_rbp,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: '이평선 괴리율 스윙',
        data: props.items.asset_mas,
        borderColor: 'rgba(255, 159, 26,1.0)',
        backgroundColor: '#ffaf40',
      }
    ],
  };
  
  return <Line options={options} data={data} />;
}
