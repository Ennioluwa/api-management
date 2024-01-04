import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosInstance";

type UserData = {
  email: string;
  otp: string;
};

const postUserData = async (data: UserData) => {
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
    mutationFn: (data: UserData) => postUserData(data),
  });
};
