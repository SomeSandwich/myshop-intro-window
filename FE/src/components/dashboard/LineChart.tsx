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



export function LineChart(props: { data: Number[] , label: String[] }) {
    if(!props) return <></>
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Doanh Thu Line Chart',
                font: {
                    size: 20
                }
    
            },
        },
    
    };
    
    
    
    const data = {
        labels:props.label,
        datasets: [
            {
                label: 'Doanh Thu',
                data: props.data,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };
    return <Line style={{width:"600px",maxWidth:"600px",minWidth:"600px"}} options={options} data={data} />;
}
