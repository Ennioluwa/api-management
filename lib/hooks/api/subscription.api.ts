import axiosClient from "@/lib/axiosInstance";

export type PaymentHistory = {
  id: number;
  terminalId: string;
  price: number;
  totalUsers: number;
  status: string;
  paymentMethod: string;
  expiryDate: string;
  createDate: string;
};

export const fetchPaymentHistory = async () => {
  const {
    data: { data },
  } = await axiosClient.get(`/api/subscription`);
  if (data) return data as PaymentHistory[];
};
