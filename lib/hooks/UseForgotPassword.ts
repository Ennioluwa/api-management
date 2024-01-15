import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosInstance";

type ForgotPasswordData = {
  email: string;
};

const PostForgotPasswordData = async (data: ForgotPasswordData) => {
  const res = await axiosClient
    .post("api/Security/forgotpassword", data)
    .then((res) => {
      console.log(res);

      return {
        data: res.data,
      };
    });

  return res;
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordData) => PostForgotPasswordData(data),
  });
};
