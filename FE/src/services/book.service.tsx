import axiosClient from "@/Axios/AxiosClient";
import { Book } from "@/interfaces/bookDetail";

export const getAllBookService= async () => {
	// console.log(data);
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
export const addBookService = async (newBook : FormData) => {
	// console.log(data);
	const response = await axiosClient.post(`/product`,newBook);
	return response.data;
};
const arr_search = [{
	"id": 5,
	"price": 10000,
	"title": "Hai ba ra",
	"discount": 10,
	"description": "Modern Cross-Platform Development",
	"mediaPath": "",
	"createAt": "2023-04-13T04:07:32.17574",
	"updateAt": "2023-04-13T04:07:32.17574",
	"quantity": 10,
	"author": "Mark J. Price",
	"isbn10": "1803237805",
	"isbn13": "978-1803237800",
	"publisher": "Packt Publishing",
	"publicationDate": "2022-08-11T00:00:00",
	"dimension": {
		"height": 10,
		"width": 10,
		"length": 10
	},
	"numPages": 100,
	"coverType": "Hardcover",
	"status": "Default",
	"categoryId": 1,
	"categoryDescription": "Adventure"
},
{
	"id": 3,
	"price": 10000,
	"title": "Hai ba zo",
	"discount": 10,
	"description": "This is a genuine product imported and distributed by ABC company.",
	"mediaPath": "",
	"createAt": "2023-04-13T03:09:27.137817",
	"updateAt": "2023-04-13T03:09:27.137817",
	"quantity": 10,
	"author": "bac",
	"publisher": "123",
	"publicationDate": "2012-01-12T00:00:00",
	"numPages": 1,
	"coverType": "Hardcover",
	"status": "Default",
	"categoryId": 1,
	"categoryDescription": "Adventure"
},
{
	"id": 4,
	"price": 10000,
	"title": "C# 11 and .NET 7",
	"discount": 10,
	"description": "This is a genuine product imported and distributed by ABC company.",
	"mediaPath": "",
	"createAt": "2023-04-13T04:03:07.520372",
	"updateAt": "2023-04-13T04:03:07.520372",
	"quantity": 10,
	"author": "Mark J. Price",
	"publisher": "Packt Publishing",
	"publicationDate": "2022-08-11T00:00:00",
	"numPages": 100,
	"coverType": "Paperback",
	"status": "Default",
	"categoryId": 14,
	"categoryDescription": "History"
},
{
	"id": 6,
	"price": 20001,
	"title": "C# 11 and .NET 7",
	"discount": 10,
	"description": "Modern Cross-Platform Development",
	"mediaPath": "",
	"createAt": "2023-04-17T23:29:33.40822",
	"updateAt": "2023-04-17T23:29:33.40822",
	"quantity": 10,
	"author": "Mark J. Price",
	"publisher": "Packt Publishing",
	"publicationDate": "2022-08-11T00:00:00",
	"numPages": 100,
	"coverType": "Hardcover",
	"status": "Default",
	"categoryId": 1,
	"categoryDescription": "Adventure"
}]
export const searchBookService = async (key : string) => {
	
	// const response = await axiosClient.get(`/product?query=${key}`);
	return arr_search;
};
export const updateBookService = async (id:string,newBook : Book) => {
	// console.log(data);
	const response = await axiosClient.patch(`/product/${id}`,newBook);
	return response.data;
};