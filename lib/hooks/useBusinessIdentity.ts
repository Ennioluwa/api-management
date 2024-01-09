import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosInstance";

type BusinessIdentityData = {
  tpin: string;
  branchId: string;
  deviceSerialNumber: string;
};

const postBusinessIdentity = async (data: BusinessIdentityData) => {
  const res = await axiosClient.post("zm/api/initialize", data).then((res) => {
    console.log(res);

    return {
      data: res.data.data,
    };
  });

  return res;
};

export const useBusinessIdentity = () => {
  return useMutation({
    mutationFn: (data: BusinessIdentityData) => postBusinessIdentity(data),
  });
};
