import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosInstance";

type LoginData = {
  email: string;
  password: string;
};

const postUserData = async (data: LoginData) => {
  const res = await axiosClient.post("api/user/login", data).then((res) => {
    console.log(res);

    return {
      // Change the path of reading the values from response as per your backend reponse
      //   auth_token: res.data.data["X-Auth-Token"],
      //   refresh_token: res.data.data["X-Refresh-Token"],
    };
  });

  return res;
};

export const useUserLogin = () => {
  return useMutation({ mutationFn: (data: LoginData) => postUserData(data) });
  //   return useMutation({
  //     mutationFn: (data: LoginData) => postUserData(data),
  //   });
};
