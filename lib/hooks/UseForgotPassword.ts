import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosInstance";

type ForgotPasswordData = {
  email: string;
};
type ChangePasswordData = {
  email: string;
  newPassword: string;
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
const PostChangePasswordData = async (data: ForgotPasswordData) => {
  const res = await axiosClient
    .post("api/Security/changePassword", data)
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
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordData) => PostChangePasswordData(data),
  });
};
