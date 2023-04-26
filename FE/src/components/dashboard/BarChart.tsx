import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Bar, } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarChart(props:{data:Number[],labels:String[]}) {
    const options = {
        indexAxis: 'x' as const,
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        scales:{
            x:{
                title :{
                    display :true,
                    text:"Month",
                    font: {
                        size: 10
                    }
                }
            },
            y:{
                title :{
                    display :true,
                    text:"Revenue",
                    font: {
                        size: 10
                    }
                },
                stacked: true,
                barThickness : 7
            },
        },
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Doanh thu Bar Chart',
            font: {
                size: 20
            },
            color: '#000'
          },
        },
      };
      const data = {
        labels: props.labels,
        datasets: [
          {
            label: 'Doanh thu',
            data: props.data,
            borderColor: '#2195f2',
            backgroundColor: '#2195f2',
          }
        ],
      };
  return (
    <Bar className='bar-chart' options={options} data={data} />
  )
}
