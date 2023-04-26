import axiosClient from "@/Axios/AxiosClient";
import { IOrderDetailProduct, Order, OrderDetail } from "@/interfaces/Order";

export const getAllOrderService = async () => {
    // console.log(data);
    const response = await axiosClient.get("/order");

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
export const updateOrderService = async (id: string, newOrder: string) => {
    // console.log(data);
    const response = await axiosClient.patch(`/order/${id}`, newOrder);
    return response.data;
};
