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
import { LineChart } from '@/components/dashboard/LineChart';
import ProductStatistics from '@/components/dashboard/ProductStatistics';
import { getStatisticOrderCate, getStatisticOrderYearService } from '@/services/order.service';
import { useAppSelector } from '@/Hooks/apphooks';
import { RootState } from '@/store';
import { Book } from '@/interfaces/bookDetail';
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
    const booklist = useAppSelector((state:RootState)=>state.book.listAllBook)
    const [curYearChoosen,setYear] = useState(new Date().getFullYear())
    const [amountBook,setAmoutBook] = useState<Number>(0)
    const [cost,setCost] = useState<Number>(0)
    const [revenue,setRevenue] = useState<Number>(0)
    const [profit,setProfit] = useState<Number>(0)

    const [dataBarORLineChart,setDataBarORLineChart] = useState([])
    const [dataPieChart,setDataPieChart] = useState([])
    const [labelPieChart,setLabelPieChart] = useState([])
    const [labelBarORLineChart,setlabeLBarORLineChart] = useState([])
    const arroundYears = [curYearChoosen+1,curYearChoosen,curYearChoosen-1];

    useEffect(()=>{
        if(booklist.length>0){
            setAmoutBook(calAmountSellBook(booklist))
        }
    },[booklist])
    useEffect(() => {
        console.log("get Data")
        const getStatisticBarChart= async() => {
            const data = await getStatisticOrderYearService(curYearChoosen)
            setlabeLBarORLineChart(data.month)
            setDataBarORLineChart(data.revenue)
            console.log(data.month)
            console.log(data.revenue)
            setRevenue(calculateSum(data.revenue))
            setCost(calculateSum(data.cost))
            setProfit(calculateSum(data.profit))
        }
        const getStatisticPieChart= async() => {
            const data = await getStatisticOrderCate()
            setLabelPieChart(data.id)
            setDataPieChart(data.quantity)
        }
        getStatisticPieChart()
        getStatisticBarChart()

    }, [curYearChoosen])
    
    return (
        <div className='dash-board'> 
            <div className='row d-flex flex-wrap justify-content-between'>
                <ToTalAmout title='Tổng sách nhập kho' amount={amountBook.toString()} iconClass="fa-solid fa-book" bg_color={{left:'darkorchid',right:'pink'}}/>
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
                <TotalMoney title='Tổng tiền nhập kho' amount={cost.toString()} iconClass="fa-solid fa-truck" bg_color={{left:'red',right:'lightcoral'}}/>
                <TotalMoney title='Tổng doanh thu' amount={revenue.toString()} iconClass="fa-solid fa-wallet" bg_color={{left:'darkorange',right:'yellow'}}/>
                <TotalMoney title='Tổng lợi nhuận' amount={profit.toString()} iconClass="fa-solid fa-dollar-sign" bg_color={{left:'green',right:'lime'}}/>
            </div>
            <div className='row '>
                <div className='chart-card'>
                    <BarChart data={dataBarORLineChart} labels={labelBarORLineChart}/>
                </div>
                <div className='chart-card ml-4'>
                    <PieChart data = {dataPieChart} cate={labelPieChart}/>
                </div>
            </div>
            <div className='row '>
                <LineChart data={[100, 500, 200, 100, 8000, 400, 1000, 500, 200, 100, 8000, 400]} label={['January', 'February', 'March', 'April', 'May', 'June', 'July','January', 'February', 'March', 'April', 'May', 'June', 'July','January', 'February', 'March', 'April', 'May', 'June', 'July','January', 'February', 'March', 'April', 'May', 'June', 'July','January', 'February', 'March', 'April', 'May', 'June', 'July']}/>
            </div>
            <div className='row d-flex justify-content-center'>
                
                <div>
                    <ProductStatistics/>
                </div>
            </div>
        </div>
    
    );
  
}
const calAmountSellBook= (booklist:Book[]) =>{
    var sum = 0;
    booklist.forEach(book=>{
        sum+= +book.quantity
    })
    return sum
}
function calculateSum(array:[]) {
    return array.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
}