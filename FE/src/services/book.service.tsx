import axiosClient from "@/Axios/AxiosClient";
import { Book } from "@/interfaces/bookDetail";

export const getAllBookService= async () => {
	// console.log(data);
	console.log("Get All Cate")
	const response = await axiosClient.get("/product");
	return response.data;
};
export const DeleteBookService = async (id:string) => {
	// console.log(data);
	const response = await axiosClient.delete(`/product/${id}`);
	return response.data;
};
export const GetDetailBookService = async (id:string) => {
	// console.log(data);
	const response = await axiosClient.get(`/product/${id}`);
	return response.data;
};
export const addBookService = async (newBook : Book) => {
	// console.log(data);
	const response = await axiosClient.post(`/product`,newBook);
	return response.data;
};
export const updateBookService = async (id:string,newBook : Book) => {
	// console.log(data);
	const response = await axiosClient.patch(`/product/${id}`,newBook);
	return response.data;
};