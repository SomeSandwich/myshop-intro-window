import axiosClient from "@/Axios/AxiosClient";

export const getAllCate = async () => {
	// console.log(data);
	const response = await axiosClient.get("/category");
	return response.data;
};
