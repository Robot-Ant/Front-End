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
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart(props) {
   const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: props.items.title,
      },
    },
  };

  const labels = props.items.date;
  const ydata = props.items.asset;

  const data = {
    labels,
    datasets: [
      {
        label: 'asset',
        data: ydata,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  };

  return <Line options={options} data={data} />
}
