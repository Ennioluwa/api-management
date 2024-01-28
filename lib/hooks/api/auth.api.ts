import axiosClient from "@/lib/axiosInstance";

export const logoutUser = async () => {
  const {
    data: { data },
  } = await axiosClient.get(`/api/user/logout`);
  if (data) return data;
};
