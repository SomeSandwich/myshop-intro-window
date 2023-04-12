import React, { useState,useEffect } from 'react'
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
import TotalMoney from '@/components/dashboard/TotalMoney';
import ToTalAmout from '@/components/dashboard/ToTalAmout';
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
    const [curYearChoosen,setYear] = useState(new Date().getFullYear())
    const arroundYears = [curYearChoosen+1,curYearChoosen,curYearChoosen-1];
    useEffect(() => {
      
    
      return () => {
        
      }
    }, [curYearChoosen])
    
    return (
        <div className='dash-board'> 
            <div className='row d-flex flex-wrap justify-content-between'>
                <ToTalAmout title='Tổng sách nhập kho' amount='85000' iconClass="fa-solid fa-book" bg_color={{left:'darkorchid',right:'pink'}}/>
                <ToTalAmout title='Tổng đơn hàng' amount='32' iconClass="fa-solid fa-cart-shopping" bg_color={{left:'#2fafe2',right:'#88ebe2'}}/>
                <select value={curYearChoosen} onChange={(e)=>{
                        const num =parseInt(e.currentTarget.value);
                        setYear(pre=>num)
                        
                    }} className="custom-select filter-year" id="inputGroupSelect02">
                    <option value={arroundYears[0]}>{arroundYears[0]}</option>
                    <option value={arroundYears[1]}>{arroundYears[1]}</option>
                    <option value={arroundYears[2]}>{arroundYears[2]}</option>
                </select>
            </div>
            <div className='row d-flex flex-wrap justify-content-between'>
                <TotalMoney title='Tổng tiền nhập kho' amount='13,750,000' iconClass="fa-solid fa-truck" bg_color={{left:'red',right:'lightcoral'}}/>
                <TotalMoney title='Tổng doanh thu' amount='29,509,000' iconClass="fa-solid fa-wallet" bg_color={{left:'darkorange',right:'yellow'}}/>
                <TotalMoney title='Tổng lợi nhuận' amount='15,759,000' iconClass="fa-solid fa-dollar-sign" bg_color={{left:'green',right:'lime'}}/>
            </div>
            <div className='row '>
                <div className='chart-card'>
                    <BarChart data={[100,500,200,100,8000,400,1000,500,200,100,8000,400]}/>
                </div>
                <div className='chart-card ml-4'>
                    <PieChart data = {[12, 19, 3, 5, 2, 3]} cate={["Romatic","Action","War","Novel","Fatasy","Cartoon"]}/>
                </div>
            </div>
        </div>
    
    );
  
}
