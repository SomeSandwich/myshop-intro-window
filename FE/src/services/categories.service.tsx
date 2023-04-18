import axiosClient from "@/Axios/AxiosClient";

export const getAllCate = async () => {
	// console.log(data);
	const response = await axiosClient.get("/category");
	return response.data;
};
export const deleteCateService = async (id:string) => {
	// console.log(data);
	const response = await axiosClient.delete(`/category/${id}`);
	return response.data;
};
