import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosInstance";

type OtpLoginData = {
  email: string;
  otp: string;
};

const postUserData = async (data: OtpLoginData) => {
  const res = await axiosClient.post("api/otp", data).then((res) => {
    console.log(res);

    return {
      data: res.data.data,
    };
  });

  return res;
};

export const useOtpUserLogin = () => {
  return useMutation({
    mutationFn: (data: OtpLoginData) => postUserData(data),
  });
};
