import React, { useState, useEffect } from 'react'
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
import { getStatisticOrdeDayService, getStatisticOrdeMonthService, getStatisticOrdeWeekService, getStatisticOrderCate, getStatisticOrderYearService } from '@/services/order.service';
import { useAppSelector } from '@/Hooks/apphooks';
import { RootState } from '@/store';
import { Book } from '@/interfaces/bookDetail';
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import { Notification, notification } from '@/components/Book/AddBook';
import { ToastContainer } from 'react-toastify';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);
const enum Statistic {
    Year,
    Month,
    Week,
    Day
}
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const weeks = Array.from(Array(52).keys())
export default function DashBoard() {
    const booklist = useAppSelector((state: RootState) => state.book.listAllBook)
    const [currentTypeofStatistic, setcurrentTypeofStatistic] = useState<Statistic>(Statistic.Year)
    const [curYearChoosen, setYear] = useState(new Date().getFullYear())
    const [curMonthrChoosen, setcurMonthrChoosen] = useState(new Date().getMonth())
    const [curWeekrChoosen, setcurWeekrChoosen] = useState(1)
    const [amountBook, setAmoutBook] = useState<Number>(0)
    const [cost, setCost] = useState<Number>(0)
    const [revenue, setRevenue] = useState<Number>(0)
    const [profit, setProfit] = useState<Number>(0)
    const [show, setShow] = useState(false);
    const [dataBarORLineChart, setDataBarORLineChart] = useState([])
    const [dataPieChart, setDataPieChart] = useState([])
    const [labelPieChart, setLabelPieChart] = useState([])
    const [labelBarORLineChart, setlabeLBarORLineChart] = useState([])
    const arroundYears = [curYearChoosen + 1, curYearChoosen, curYearChoosen - 1];
    const [lastDayFrom, setLastDayFrom] = useState("")
    const [lastDayTo, setLastDayTo] = useState("")
    const handleEndChange = (e: any) => {
        setLastDayTo(e.target.value);
    };
    const handleShow = () => {
        setShow(true)
    };

    const handleClose = () => setShow(false);
    const handleStartChange = (e: any) => {
        setLastDayFrom(e.target.value);
    };
    const handleStatisDay = ()=>{
        console.log(lastDayFrom)
        console.log(lastDayTo)
        if(!lastDayFrom || !lastDayTo) {
            notification("Please Input Both Of DayForm and DayTo ", Notification.Warn);
        }else{
            const getStatisticBarChart = async () => {
                const data = await getStatisticOrdeDayService(lastDayFrom,lastDayTo)
                setlabeLBarORLineChart(data.month)
                setDataBarORLineChart(data.revenue)
                setRevenue(calculateSum(data.revenue))
                setCost(calculateSum(data.cost))
                setProfit(calculateSum(data.profit))
            }
            getStatisticBarChart()
            setcurrentTypeofStatistic(Statistic.Day)
        }
    }
    const handleStatisWeek = ()=>{
        console.log(curWeekrChoosen)
        const getStatisticBarChart = async () => {
            const data = await getStatisticOrdeWeekService(curWeekrChoosen,curYearChoosen)
            setlabeLBarORLineChart(data.month)
            setDataBarORLineChart(data.revenue)
            setRevenue(calculateSum(data.revenue))
            setCost(calculateSum(data.cost))
            setProfit(calculateSum(data.profit))
        }
        getStatisticBarChart()
        setcurrentTypeofStatistic(Statistic.Week)
    }
    const handleStatisMonth = ()=>{
        console.log(curMonthrChoosen)
        const getStatisticBarChart = async () => {
            const data = await getStatisticOrdeMonthService(curMonthrChoosen,curYearChoosen)
            setlabeLBarORLineChart(data.month)
            setDataBarORLineChart(data.revenue)
            setRevenue(calculateSum(data.revenue))
            setCost(calculateSum(data.cost))
            setProfit(calculateSum(data.profit))
        }
        getStatisticBarChart()
        setcurrentTypeofStatistic(Statistic.Month)
    }
    const handleStatisYear = ()=>{
        console.log(curYearChoosen)
        const getStatisticBarChart = async () => {
            const data = await getStatisticOrderYearService(curYearChoosen)
            setlabeLBarORLineChart(data.month)
            setDataBarORLineChart(data.revenue)
            setRevenue(calculateSum(data.revenue))
            setCost(calculateSum(data.cost))
            setProfit(calculateSum(data.profit))
        }
        const getStatisticPieChart = async () => {
            const data = await getStatisticOrderCate()
            setLabelPieChart(data.id)
            setDataPieChart(data.quantity)
        }
        getStatisticPieChart()
        getStatisticBarChart()
        setcurrentTypeofStatistic(Statistic.Year)
    }
    useEffect(() => {
        if (booklist.length > 0) {
            setAmoutBook(calAmountSellBook(booklist))
        }
    }, [booklist])
    useEffect(() => {
        console.log("get Data")
        const getStatisticBarChart = async () => {
            const data = await getStatisticOrderYearService(curYearChoosen)
            setlabeLBarORLineChart(data.month)
            setDataBarORLineChart(data.revenue)
            setRevenue(calculateSum(data.revenue))
            setCost(calculateSum(data.cost))
            setProfit(calculateSum(data.profit))
        }
        const getStatisticPieChart = async () => {
            const data = await getStatisticOrderCate()
            setLabelPieChart(data.id)
            setDataPieChart(data.quantity)
        }
        getStatisticPieChart()
        getStatisticBarChart()

    }, [curYearChoosen])

    return (
        <div className='dash-board'>
            <ToastContainer />
            <div className='row d-flex flex-wrap justify-content-between'>
                <ToTalAmout title='Tổng sách nhập kho' amount={amountBook.toString()} iconClass="fa-solid fa-book" bg_color={{ left: 'darkorchid', right: 'pink' }} />
                <div className=' d-flex flex-wrap justify-content-between align-items-center'>
                    <h2><strong>Dash board</strong></h2>
                </div>
                <div className=' d-flex flex-wrap justify-content-between align-items-center'>
                    <button className='btn btn-info text-white' onClick={handleShow}>
                        Statistic
                    </button>
                </div>
                {/* <ToTalAmout title='Tổng đơn hàng' amount='32' iconClass="fa-solid fa-cart-shopping" bg_color={{left:'#2fafe2',right:'#88ebe2'}}/> */}

            </div>
            <div className='row d-flex flex-wrap justify-content-between'>
                <TotalMoney title='Tổng tiền nhập kho' amount={cost.toString()} iconClass="fa-solid fa-truck" bg_color={{ left: 'red', right: 'lightcoral' }} />
                <TotalMoney title='Tổng doanh thu' amount={revenue.toString()} iconClass="fa-solid fa-wallet" bg_color={{ left: 'darkorange', right: 'yellow' }} />
                <TotalMoney title='Tổng lợi nhuận' amount={profit.toString()} iconClass="fa-solid fa-dollar-sign" bg_color={{ left: 'green', right: 'lime' }} />
            </div>
            <div className='row '>
                <div className='chart-card'>
                    {currentTypeofStatistic == Statistic.Year || currentTypeofStatistic == Statistic.Week ?
                        <BarChart data={dataBarORLineChart} labels={labelBarORLineChart} /> :
                        <LineChart data={dataBarORLineChart} label={labelBarORLineChart} />
                    }
                </div>
                <div className='chart-card ml-4'>
                    <PieChart data={dataPieChart} cate={labelPieChart} />
                </div>
            </div>
            <div className='row '>

            </div>
            <div className='row d-flex justify-content-center'>

                <div>
                    <ProductStatistics />
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add To Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className='ml-5 filter-dashboard'>
                        <thead>
                            <tr>
                                <th style={{ width: "400px", paddingTop: "10px", paddingBottom: "10px" }} className='text-left'>
                                    <strong className='mr-2'>Day:</strong>
                                    <span className='mr-1'>From</span>
                                    <input
                                        style={{ width: "120px" }}
                                        type="date"
                                        name="startDate"
                                        value={lastDayFrom}
                                        max={lastDayTo}
                                        onChange={handleStartChange}
                                        pattern="\d{4}-\d{2}-\d{2}"
                                    />
                                    <span className='mr-1'>To</span>
                                    <input
                                        style={{ width: "120px" }}
                                        type="date"
                                        name="endDate"
                                        min={lastDayFrom}
                                        value={lastDayTo}
                                        onChange={handleEndChange}
                                    />
                                </th>
                                <th className='text-left' onClick={()=>{handleStatisDay()}}>
                                    <button className='btn btn-info text-white'>Statistic By Day</button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th style={{ width: "400px", paddingTop: "10px", paddingBottom: "10px" }} className='text-left'>
                                    <div className='d-flex align-items-center'>
                                        <strong className='mr-2'>Week:</strong>
                                        <select className="custom-select filter-month" value={curWeekrChoosen} onChange={(e) => {
                                            const num = parseInt(e.currentTarget.value);
                                            setcurWeekrChoosen(pre => num)
                                        }}>
                                            {
                                                weeks.map((Week) => {
                                                    return <option>{Week + 1}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </th>
                                <th className='text-left'>
                                    <button onClick={()=>{handleStatisWeek()}} className='btn btn-info text-white'>Statistic By Week</button>
                                </th>
                            </tr>
                            <tr>
                                <th style={{ width: "400px", paddingTop: "10px", paddingBottom: "10px" }} className='text-left'>
                                    <div className='d-flex align-items-center'>
                                        <strong className='mr-2'>Month:</strong>
                                        <select className="custom-select filter-month" value={curMonthrChoosen} onChange={(e) => {
                                            const num = parseInt(e.currentTarget.value);
                                            setcurMonthrChoosen(pre => num)
                                        }}>
                                            {
                                                months.map((month) => {
                                                    return <option>{month}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </th>
                                <th className='text-left'>
                                    <button onClick={()=>{handleStatisMonth()}} className='btn btn-info text-white'>Statistic By Month</button>
                                </th>
                            </tr>
                            <tr>
                                <th style={{ width: "400px", paddingTop: "10px", paddingBottom: "10px" }} className='text-left'>
                                    <div className='d-flex align-items-center'>
                                        <strong className='mr-2'>Year:</strong>
                                        <select value={curYearChoosen} onChange={(e) => {
                                            const num = parseInt(e.currentTarget.value);
                                            setYear(pre => num)

                                        }} className="custom-select filter-year" id="inputGroupSelect02">
                                            <option value={arroundYears[0]}>{arroundYears[0]}</option>
                                            <option value={arroundYears[1]}>{arroundYears[1]}</option>
                                            <option value={arroundYears[2]}>{arroundYears[2]}</option>
                                        </select>
                                    </div>
                                </th>
                                <th className='text-left'>
                                    <button onClick={()=>{handleStatisYear()}} className='btn btn-info text-white'>Statistic By Year</button>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={handleClose}>
                        Add
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </div>

    );

}
const calAmountSellBook = (booklist: Book[]) => {
    var sum = 0;
    booklist.forEach(book => {
        sum += +book.quantity
    })
    return sum
}
function calculateSum(array: []) {
    return array.reduce((accumulator, value) => {
        return accumulator + value;
    }, 0);
}