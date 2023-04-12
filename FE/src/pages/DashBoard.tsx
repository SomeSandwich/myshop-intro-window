import React, { useState } from 'react'
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
import { Bar, Pie } from 'react-chartjs-2';
import BarChart from '@/components/dashboard/BarChart';
import PieChart from '@/components/dashboard/PieChart';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);
export default function DashBoard() {
    
    return (
        <>
            <div className='row'>
            
            </div>
            <div className='row d-flex justify-content-center'>
                <div className='chart-card'>
                    <BarChart data={[100,500,200,100,8000,400,1000,500,200,100,8000,400]}/>
                </div>
                <div className='chart-card'>
                    <PieChart data = {[12, 19, 3, 5, 2, 3]} cate={["Romatic","Action","War","Novel","Fatasy","Cartoon"]}/>
                </div>
            </div>
        </>
    
    );
  
}
