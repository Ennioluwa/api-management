import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosInstance";
import { ApiKeyData } from "./api/apiKey.api";

export type AddApiData = {
  ApiKeyName: string;
};

export type ModifyApiData = {
  apiKeyName: string;
  isValid: boolean;
  apiId: number;
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
const putModifyApi = async (data: ModifyApiData) => {
  const res = await axiosClient
    .put(`/api/apikey/${data.apiId}`, {
      apiKeyName: data.apiKeyName,
      isValid: data.isValid,
    })
    .then((res) => {
      console.log(res);

      return {
        data: res.data.data as ApiKeyData,
      };
    });

  return res;
};

export const ModifyApiManagement = () => {
  return useMutation({
    mutationFn: (data: ModifyApiData) => putModifyApi(data),
  });
};

export const UseApiManagement = () => {
  return useMutation({
    mutationFn: (data: AddApiData) => postAddApi(data),
  });
};
