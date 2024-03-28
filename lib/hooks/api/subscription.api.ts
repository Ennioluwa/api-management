import axiosClient from "@/lib/axiosInstance";
import { PaginationData } from "./invoices.api";

export type Subscriptions = {
  id: number;
  terminalId: string;
  price: number;
  totalUsers: number;
  status: string;
  paymentMethod: string;
  expiryDate: Date;
  createDate: Date;
  currency: string;
};

export const fetchSubscriptions = async ({
  companyId,
  pageIndex,
  lastId,
}: {
  companyId: number | undefined;
  pageIndex?: number;
  lastId?: number;
}) => {
  if (!companyId) {
    console.log("no company id is present");

    throw new Error("no company id");
  }

  const response = await axiosClient.get(
    `/api/subscription/${companyId}?PageIndex=${pageIndex || 1}${
      lastId !== undefined && pageIndex !== 1 ? `&lastId=${lastId}` : ""
    }`
  );
  const { data }: { data: Subscriptions[] } = response.data;
  let pagination = response.headers["x-pagination"];
  if (pagination) pagination = JSON.parse(pagination) as PaginationData;
  return { data, pagination };
};
