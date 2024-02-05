import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosInstance";

export type UserManagementData = {
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  emailConfirmed?: boolean;
};

export type DeleteUser = {
  email: string;
};

const postUserManagementData = async (data: UserManagementData) => {
  const res = await axiosClient
    .post("/api/usermanagement", data)
    .then((res) => {
      console.log(res);

      return {
        data: res.data.data,
      };
    });

  return res;
};

const deleteUserManagementData = async (data: DeleteUser) => {
  const res = await axiosClient
    .post(`/api/user/delete?email=${data.email}`)
    .then((res) => {
      console.log(res);
      return {
        data: res.data.data,
      };
    });

  return res;
};

export const useUserManagement = () => {
  return useMutation({
    mutationFn: (data: UserManagementData) => postUserManagementData(data),
  });
};

export const DeleteUserManagement = () => {
  return useMutation({
    mutationFn: (data: DeleteUser) => deleteUserManagementData(data),
  });
};
