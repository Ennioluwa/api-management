import axiosClient from "@/lib/axiosInstance";
import { UserManagementData } from "../useUserManagement";

export const fetchUsers = async () => {
  const {
    data: { data },
  } = await axiosClient.get(`/api/usermanagement`);
  if (data) return data as UserManagementData[];
};

export const fetchUserByEmail = async ({ email }: { email: string }) => {
  const {
    data: { data },
  } = await axiosClient.get(`/api/usermanagement/${email}`);
  if (data) return data as UserManagementData;
};

export const deleteUser = async (user: UserManagementData) => {
  const {
    data: { data },
  } = await axiosClient.delete(`/api/usermanagement`, { data: user });
  return data;
};

export const resendVerification = async ({ email }: { email: string }) => {
  if (!email) return;

  const {
    data: { data },
  } = await axiosClient.get(`api/UserManagement/${email}`);
  console.log(data);

  if (data) return data;
};
