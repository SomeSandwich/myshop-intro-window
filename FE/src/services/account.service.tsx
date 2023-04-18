
import axiosClient from "@/Axios/AxiosClient";
import { ISignUpInput } from "@/interfaces/Acount";


export const SignUpAsync = async (data: ISignUpInput) => {
	// console.log(data);
	const response = await axiosClient.post("/account", data);
	return response.data;
};
