import axiosClient from "@/lib/axiosInstance";
import { PaginationData } from "./invoices.api";

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
  pageIndex,
  lastId,
}: {
  companyId: number | undefined;
  pageIndex?: number;
  lastId?: number;
}) => {
  if (!companyId) return;
  const response = await axiosClient.get(
    `/api/payments/${companyId}?PageIndex=${pageIndex || 1}${
      lastId !== undefined && pageIndex !== 1 ? `&lastId=${lastId}` : ""
    }`
  );

  const { data }: { data: PaymentHistory[] } = response.data;
  const pagination: PaginationData = response.headers["x-pagination"];
  return { data, pagination };
};
