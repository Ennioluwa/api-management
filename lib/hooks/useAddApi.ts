import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosInstance";
import { ApiKeyData } from "./api/apiKey.api";

export type AddApiData = {
  ApiKeyName: string;
};

const postAddApi = async (data: AddApiData) => {
  const res = await axiosClient.post("/api/apikey", data).then((res) => {
    console.log(res);

    return {
      data: res.data.data as ApiKeyData,
    };
  });

  return res;
};

export const useApiManagement = () => {
  return useMutation({
    mutationFn: (data: AddApiData) => postAddApi(data),
  });
};
