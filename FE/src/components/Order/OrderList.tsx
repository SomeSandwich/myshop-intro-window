import { OrderDetail, OrderDetailList, tmplist } from "@/interfaces/Order";
import React, { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import { getAllOrderService } from "@/services/order.service";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "react-datepicker/dist/react-datepicker.css";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/Hooks/apphooks";
import { getAllOrderByUrlThunk, getAllOrderThunk } from "./OrderSlice";
import { RootState } from "@/store";
import useLocalStore from "@/Hooks/useLocalStore";
export default function OrderList() {
    const orderlist= useAppSelector((state:RootState)=> state.order.listOrder)
    const urlCurrentPage= useAppSelector((state:RootState)=> state.order.urlCurrentPage)
    const urlNextPage= useAppSelector((state:RootState)=> state.order.urlNextPage)
    const urlPrePage= useAppSelector((state:RootState)=> state.order.urlPrePage)
    const totalPage= useAppSelector((state:RootState)=> state.order.totalPage)
    const currentPage= useAppSelector((state:RootState)=> state.order.currentPage)

    const [lastUrlCurrentPage, setLastUrlCurrentPage] = useLocalStore({ key: "LastUrlCurrentPage", initialValue: "" })
    const [lastDayFrom, setLastDayFrom] = useLocalStore({ key: "lastDayFrom", initialValue: "" })
    const [lastDayTo, setLastDayTo] = useLocalStore({ key: "lastDayTo", initialValue: "" })
    const [orderDetail, setOrderDetail] = React.useState<OrderDetailList[]>([]);

    const handleEndChange = (e:any) => {
        setLastDayTo(e.target.value);
    };
    const handleStartChange = (e:any) => {
        setLastDayFrom(e.target.value);
    };
    const movePrePage = ()=>{
        if(urlPrePage != ""){
            setLastUrlCurrentPage(urlPrePage)
            dispatch(getAllOrderByUrlThunk(urlPrePage))
        }
        
    }
    const moveNextPage = ()=>{
        if(currentPage < totalPage){
            setLastUrlCurrentPage(urlNextPage)
            dispatch(getAllOrderByUrlThunk(urlNextPage))
        }
        
    }
    const dispatch = useAppDispatch()
    const handleSearch = async()=>{
        if(!lastDayFrom && lastDayTo){
            dispatch(getAllOrderThunk({ CustomerId: null, DateFrom:  lastDayTo, DateTo:  lastDayTo, PageNumber:  1, PageSize: null }))
        }else if(lastDayFrom && !lastDayTo){
            dispatch(getAllOrderThunk({ CustomerId: null, DateFrom:  lastDayFrom, DateTo:  lastDayFrom, PageNumber:  1, PageSize: null }))
        }else if(lastDayFrom && lastDayTo){
            dispatch(getAllOrderThunk({ CustomerId: null, DateFrom:  lastDayFrom, DateTo:  lastDayTo, PageNumber:  1, PageSize: null }))
        }else if(!lastDayFrom && !lastDayTo){
            dispatch(getAllOrderThunk({ CustomerId: null, DateFrom:  null, DateTo:  null, PageNumber:  1, PageSize: null }))
        }
    }
    useEffect(()=>{
        if(urlCurrentPage != ""){
            setLastUrlCurrentPage(urlCurrentPage)
        }
    },[urlCurrentPage])
    React.useEffect(() => {
        if(!lastUrlCurrentPage || lastUrlCurrentPage==""){
            dispatch(getAllOrderThunk({ CustomerId: null, DateFrom:  null, DateTo:  null, PageNumber:  1, PageSize: null }))
        }else{
            dispatch(getAllOrderByUrlThunk(lastUrlCurrentPage))
        }
       
        // .then((res) => {
        //     const tmp: OrderDetailList[] = [];
        //     res.data.forEach((ele: tmplist) => {
        //         tmp.push({
        //             id: ele.id,
        //             createdAt: moment(ele.createAt).format("DD-MM-YYYY"),
        //             price: ele.total,
        //             customerName: ele.customer.name,
        //         });
        //     });
        //     setOrderDetail(tmp); // Update state with the processed data
        // });
    }, []);

    // useEffect(() => {
    //     setOrderDetail([
    //         {
    //             id: 1,
    //             createdAt: "2021-08-10",
    //             customerName: "Nguyễn Văn A",
    //             price: 100000,
    //         },
    //         {
    //             id: 2,
    //             createdAt: "2021-08-10",
    //             customerName: "Nguyễn Văn B",
    //             price: 100000,
    //         },
    //         {
    //             id: 3,
    //             createdAt: "2021-08-10",
    //             customerName: "Nguyễn Văn C",
    //             price: 100000,
    //         },
    //     ]);
    // }, []);

    return (
        <div className="row">
            <table className="table">
                <thead style={{ display: "block" }}>
                    <tr>
                        <th
                            className="text-left"
                            scope="col"
                            style={{
                                width: 500,
                            }}
                        >
                            <h5 style={{ fontWeight: 4 }}><strong>Đơn hàng</strong></h5>
                        </th>
                        <th
                            scope="col"
                            style={{
                                width: "120px",
                            }}
                        >
                            Start Day:
                            <input
                                style={{width:"120px"}}
                                type="date"
                                name="startDate"
                                value={lastDayFrom}
                                max={lastDayTo}
                                onChange={handleStartChange}
                                pattern="\d{4}-\d{2}-\d{2}"
                            />

                        </th>
                        <th
                            scope="col"
                            style={{
                                width: "120px",
                            }}
                        >
                            End Day:
                            <input
                                style={{width:"120px"}}
                                type="date"
                                name="endDate"
                                min={lastDayFrom}
                                value={lastDayTo}
                                onChange={handleEndChange}
                            />

                        </th>
                        <th
                            scope="col"
                            style={{
                                width: "100px",
                            }}
                        >
                            <button onClick={()=>{handleSearch()}} className="btn btn-dark text-light">Search</button>

                        </th>
                    </tr>
                    <tr style={{ backgroundColor: "#3f897d42" }}>
                        <th scope="col" style={{ width: 500 }}>
                            Mã đơn hàng
                        </th>
                        <th scope="col" style={{ width: widthColumn_detail }}>
                            Ngày đặt
                        </th>
                        <th scope="col" style={{ width: widthColumn_detail }}>
                            Tên khách hàng
                        </th>
                        <th scope="col" style={{ width: widthColumn_detail }}>
                            Tổng tiền
                        </th>
                    </tr>
                </thead>
                <tbody className="body-table-detail-box">
                    {orderlist?orderlist.map((order) => {
                        return (
                            <ProductInfor
                                product={order}
                                key={+order.id}
                            />
                        );
                    }):<></>}
                </tbody>
            </table>
            <div className="col d-flex justify-content-end">
                <ul className="pagination justify-content-center">
                    <li className={"page-item " + (urlPrePage == "" ? "disabled" : "")} onClick={movePrePage}>
                        <a className="page-link" href="#" tabIndex={-1} >Previous</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">{currentPage.toString()}</a></li>
                    <li className={"page-item " + ( currentPage < totalPage ? "" : "disabled")} onClick={moveNextPage}>
                        <a className="page-link" href="#" tabIndex={-1} >Next</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

const widthColumn_detail = "120px";

const ProductInfor = (props: { product: OrderDetailList }) => {
    const navigate = useNavigate()
    return (
        <tr onClick={()=>{

            navigate("/order/view/"+props.product.id)
        }}>
            <td style={{ width: 500 }}>{+props.product.id}</td>
            <td style={{ width: widthColumn_detail }}>
                {props.product.createAt?.toString()}
            </td>
            <td style={{ width: widthColumn_detail }}>
                {props.product.customer.name.toString()}
            </td>
            <td style={{ width: widthColumn_detail }}>
                <NumericFormat
                    displayType="text"
                    value={props.product.total.toString()}
                    thousandSeparator={true}
                    suffix="đ"
                />
            </td>
        </tr>
    );
};
