import axiosClient from "@/Axios/AxiosClient";
import { Notification, notification } from "@/components/Book/AddBook";
import { Customer, InputCustomer } from "@/interfaces/Customer";

export const getAllCustomerService = async () => {
	// console.log(data);
	console.log("Get All Cate")
	const response = await axiosClient.get("/customer");
	return response.data;
};
export const getAllCustomerByIdService = async (id:Number) => {
	// console.log(data);
	const response = await axiosClient.get("/customer/"+{id});
	return response.data;
};
export const DeleteCustomerService = async (id:string) => {
	// console.log(data);
	const response = await axiosClient.delete(`/customer/${id}`)
	return response.data;
};
export const addCustomerService = async (customer:InputCustomer) => {
	// console.log(data);
	const response = await axiosClient.post(`/customer`,customer);
	return response.data;
};
export const updateCustomerService = async (customer:Customer,description:string) => {
	// console.log(data);
	const response = await axiosClient.patch(`/customer/${customer.id}`,customer);
	return response.data;
};
