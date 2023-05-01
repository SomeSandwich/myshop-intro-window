import axiosClient from "@/Axios/AxiosClient";

export const getAllCate = async () => {
	// console.log(data);
	console.log("Get All Cate")
	const response = await axiosClient.get("/category");
	return response.data;
};
export const DeleteCateThunkService = async (id:string) => {
	// console.log(data);
	const response = await axiosClient.delete(`/category/${id}`);
	return response.data;
};
export const addCateService = async (description:string) => {
	// console.log(data);
	const response = await axiosClient.post(`/category`,{description});
	return response.data;
};
export const updateCateService = async (id:string,description:string) => {
	// console.log(data);
	const response = await axiosClient.patch(`/category/${id}`,{description});
	return response.data;
};
