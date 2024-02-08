import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosInstance";

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const postUserData = async (data: RegisterData) => {
  const res = await axiosClient.post("api/user/register", data).then((res) => {
    console.log(res);
  });

  return res;
};

export const useUserRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterData) => postUserData(data),
  });
};
