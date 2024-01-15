import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosInstance";

export type AddApiData = {
  name: string;
  email: string;
  description: string;
};

const postAddApi = async (data: AddApiData) => {
  const res = await axiosClient.post("/api/apikey", data).then((res) => {
    console.log(res);

    return {
      data: res.data.data,
    };
  });

  return res;
};

export const useApiManagement = () => {
  return useMutation({
    mutationFn: (data: AddApiData) => postAddApi(data),
  });
};
