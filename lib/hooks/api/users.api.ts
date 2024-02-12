import axiosClient from "@/lib/axiosInstance";
import { UserDetails, UserManagementData } from "../useUserManagement";

export const fetchUsers = async () => {
  const {
    data: { data },
  } = await axiosClient.get(`/api/usermanagement`);
  if (data) return data as UserDetails[];
};

export const deleteUser = async (user: UserDetails) => {
  const {
    data: { data },
  } = await axiosClient.delete(`/api/usermanagement`, { data: user });
  return data;
};

export const resendVerification = async ({
  username,
}: {
  username: string;
}) => {
  if (!username) return;

  const {
    data: { data },
  } = await axiosClient.get(`api/UserManagement/${username}`);
  console.log(data);

  if (data) return data;
};
