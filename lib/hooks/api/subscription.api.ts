import axiosClient from "@/lib/axiosInstance";

export type Subscriptions = {
  id: number;
  terminalId: string;
  price: number;
  totalUsers: number;
  status: string;
  paymentMethod: string;
  expiryDate: Date;
  createDate: Date;
};

export const fetchSubscriptions = async ({
  companyId,
}: {
  companyId: number | undefined;
}) => {
  if (!companyId) return;

  const {
    data: { data },
  } = await axiosClient.get(`/api/subscription/${companyId}`);
  if (data) return data as Subscriptions[];
};
