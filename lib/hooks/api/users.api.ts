import axiosClient from "@/lib/axiosInstance";
import { UserManagementData } from "../useUserManagement";

export const fetchUsers = async () => {
  const {
    data: { data },
  } = await axiosClient.get(`/api/usermanagement`);
  if (data) return data as UserManagementData[];
};

export const deleteUser = async (user: UserManagementData) => {
  const {
    data: { data },
  } = await axiosClient.delete(`/api/usermanagement`, { data: user });
  return data;
};
