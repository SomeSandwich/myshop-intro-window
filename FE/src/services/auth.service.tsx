
import axiosClient from "@/Axios/AxiosClient";
import { ILoginInput } from "@/interfaces/IAuth";

export const LoginAsync = async (data: ILoginInput) => {
	// console.log(data);
	const response = await axiosClient.post("/auth/login", data);
	return response.data;
};
export const GetMeAsync = async () => {
	const res = await axiosClient.get("/seller/get-me");
	return res.data;
};