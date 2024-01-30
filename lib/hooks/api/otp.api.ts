import axiosClient from "@/lib/axiosInstance";

export const getOtp = async ({ email }: { email: string }) => {
  if (!email) return;

  const {
    data: { data },
  } = await axiosClient.get(`/api/otp?email=${email}`);
  if (data) return data;
};
