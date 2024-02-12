import axiosClient from "@/lib/axiosInstance";

export const getOtp = async ({ username }: { username: string }) => {
  if (!username) return;

  const {
    data: { data },
  } = await axiosClient.get(`/api/otp?username=${username}`);
  if (data) return data;
};
