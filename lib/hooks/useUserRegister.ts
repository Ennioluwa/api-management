import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosInstance";

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
};

const postUserData = async (data: RegisterData) => {
  const res = await axiosClient.post("api/user/register", data).then((res) => {
    console.log(res);

    return {
      // Change the path of reading the values from response as per your backend reponse
      // auth_token: res.data.data["X-Auth-Token"],
      // refresh_token: res.data.data["X-Refresh-Token"],
    };
  });

  return res;
};

export const useUserRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterData) => postUserData(data),
  });
};
