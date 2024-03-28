import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosInstance";

export type UserDetails = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  roles: string[];
  emailConfirmed?: boolean;
};

export type UserManagementData = {
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
};

export type PutUserManagementData = {
  firstName: string;
  lastName: string;
};

export type DeleteUser = {
  username: string;
};

const postUserManagementData = async (data: UserManagementData) => {
  const res = await axiosClient
    .post("/api/usermanagement", data)
    .then((res) => {
      console.log(res);

      return {
        data: res.data.data as UserDetails,
      };
    });

  return res;
};

const putUserManagementData = async (data: PutUserManagementData) => {
  const res = await axiosClient.put("/api/user", data).then((res) => {
    console.log(res);

    return {
      data: res.data.data,
    };
  });

  return res;
};

const putUserManagementRoleData = async (data: PutUserManagementData) => {
  const res = await axiosClient.put("/api/usermanagement", data).then((res) => {
    console.log(res);

    return {
      data: res.data.data,
    };
  });

  return res;
};

const deleteUserManagementData = async (data: DeleteUser) => {
  const res = await axiosClient
    .delete(`/api/UserManagement/${data.username}`)
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

export const useModifyUserManagement = () => {
  return useMutation({
    mutationFn: (data: PutUserManagementData) => putUserManagementData(data),
  });
};
export const useModifyUserManagementRole = () => {
  return useMutation({
    mutationFn: (data: UserManagementData) => putUserManagementRoleData(data),
  });
};

export const useDeleteUserManagement = () => {
  return useMutation({
    mutationFn: (data: DeleteUser) => deleteUserManagementData(data),
  });
};
