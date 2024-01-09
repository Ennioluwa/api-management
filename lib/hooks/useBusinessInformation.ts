import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosInstance";

type BusinessInformationData = {
  email: string;
  name: string;
  address: string;
  country: string;
};

const postBusinessInformation = async (data: BusinessInformationData) => {
  const res = await axiosClient.post("api/company", data).then((res) => {
    console.log(res);

    return {
      data: res.data.data,
    };
  });

  return res;
};

export const useBusinessInformation = () => {
  return useMutation({
    mutationFn: (data: BusinessInformationData) =>
      postBusinessInformation(data),
  });
};
