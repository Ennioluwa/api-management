import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosInstance";

type ResetPasswordData = {
  password: string;
  confirmPassword: string;
};

const PostResetPasswordData = async (data: ResetPasswordData) => {
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

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordData) => PostResetPasswordData(data),
  });
};
