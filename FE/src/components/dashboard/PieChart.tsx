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
import { Pie } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export default function PieChart(props:{data:Number[],cate: String[]}) {
    const parts = props.data;
    if(parts.length==0) return <></>

    const theme :string[] = [];
    parts.forEach(x=>{
        theme.push(`rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`)
    })
    const optionPieChart ={
        plugins: {
            title: {
                display: true,
                text: 'Doanh Thu Theo Loại Sách',
                position: 'top' as const,
                font: {
                    size: 20
                },
                color: '#000'
            },
            legend: {
                display: true,
                position: 'bottom' as const,
            },
        }
    }
    const dataPieChart = {
        labels: props.cate,
        datasets: [
            {
            label: 'Số Lượng',
            data: parts,
            backgroundColor: theme,
            borderColor: theme,
            borderWidth: 1,
            },
        ],  
    };
  
  return (
    <Pie className='pie-chart' data={dataPieChart} options={optionPieChart}/>
  )
}
