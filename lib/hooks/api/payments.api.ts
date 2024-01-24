import axiosClient from "@/lib/axiosInstance";

export type PaymentHistory = {
  id: number;
  amount: number;
  status: string;
  paymentMethod: string;
  timestamp: Date;
  invoiceNumber: string | null;
  currency: string;
};

export const fetchPaymentHistory = async ({
  companyId,
}: {
  companyId: number | undefined;
}) => {
  if (!companyId) return;

  const {
    data: { data },
  } = await axiosClient.get(`/api/payments/${companyId}`);
  if (data) return data as PaymentHistory[];
};
