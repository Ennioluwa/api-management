import axiosClient from "../axiosInstance";

export const fetchUserList = async () => {
  const { data } = await axiosClient.get(`/api/UserManagement`);
  console.log(data);
  return data;
};
