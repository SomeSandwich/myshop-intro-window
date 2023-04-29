import axiosClient from "@/Axios/AxiosClient";
import { IOrderDetailProduct, Order, OrderDetail, OutputOrderDetail } from "@/interfaces/Order";
import axios from "axios";

export const getAllOrderService = async (query:String) => {
    // console.log(data);
    const response = await axiosClient.get("/order?"+query);
    return response.data;
};
export const getAllOrderByUrlService = async (url:String) => {
    // console.log(data);
    const response = await axios.get(url.toString());
    return response.data;
};
export const getOrderByIDService = async (id:Number) => {
    // console.log(data);
    const response = await axiosClient.get(`/order/order/${id}`);

    return response.data;
};
export const DeleteOrderService = async (id: string) => {
    // console.log(data);
    const response = await axiosClient.delete(`/order/${id}`);
    return response.data;
};
export const GetDetailOrderService = async (id: string) => {
    // console.log(data);
    const response = await axiosClient.get(`/order/${id}`);
    return response.data;
};
export const addOrderService = async (total: Number,customerId:Number,orderDetails:IOrderDetailProduct[]) => {
    // console.log(data);
    const response = await axiosClient.post(`/order`, {total,customerId,orderDetails});
    return response.data;
};
export const updateOrderService = async (id: string, newOrder: OutputOrderDetail) => {
    // console.log(data);
    const response = await axiosClient.patch(`/order/${id}`, newOrder);
    return response.data;
};
export const getStatisticOrderYearService = async (year:Number) => {
    // console.log(data);
    const response = await axiosClient.get(`/order/statistic/year?year=${year}`);
    return response.data;
};
export const getStatisticOrdeMonthService = async (month:Number,year:Number) => {
    // console.log(data);
    const response = await axiosClient.get(`/order/statistic/month?month=${month}&year=${year}`);
    return response.data;
};
export const getStatisticOrdeWeekService = async (week:Number,year:Number) => {
    // console.log(data);
    const response = await axiosClient.get(`/order/statistic/week?week=${week}&year=${year}`);
    return response.data;
};
export const getStatisticOrdeDayService = async (DayFrom:String,DayTo:String) => {
    // console.log(data);
    const response = await axiosClient.get(`/order/statistic/date?DateFrom=${DayFrom}&DateTo=${DayTo}`);
    return response.data;
};
export const getStatisticOrderCate = async () => {
    // console.log(data);
    const response = await axiosClient.get(`/order/statistic/category`);
    return response.data;
};
