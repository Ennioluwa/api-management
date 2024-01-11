import axiosClient from "@/lib/axiosInstance";

export const fetchUsers = async () => {
  const {
    data: { data },
  } = await axiosClient.get(`/api/usermanagement`);
  return data;
};
