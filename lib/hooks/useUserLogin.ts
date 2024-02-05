import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosInstance";

type LoginData = {
  email: string;
  password: string;
};

const postUserData = async (data: LoginData) => {
  const res = await axiosClient.post("api/user/login", data).then((res) => {
    console.log(res);
  });

  return res;
};

export const useUserLogin = () => {
  return useMutation({ mutationFn: (data: LoginData) => postUserData(data) });
};
