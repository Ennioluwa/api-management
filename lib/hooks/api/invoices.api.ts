import axiosClient from "@/lib/axiosInstance";

export type Invoice = {
  InvoiceNumber: string;
  OriginalInvoiceNumber: string;
  IssuerName: string;
  IssuerId: string;
  CustomerMobileNumber: string;
  ReceiptTypeCode: number;
  PaymentTypeCode: string;
  currencyType: string;
  conversionRate: number;
  SaleDate: string;
  CustomerName: string;
  CustomerTpin: string;
  sdcId: string;
  invoiceItems: [
    {
      ItemSequenceNumber: number;
      ItemDesc: string;
      ItemCode: string;
      PackagingUnitCode: string;
      QuantityUnitCode: string;
      DiscountAmount: number;
      Barcode: string;
      Quantity: number;
      UnitPrice: number;
      TotalAmount: number;
      TaxCodes: [string];
      isTaxInclusive: true;
      rrp: number;
    }
  ];
};

export type Transaction = {
  id: number;
  totalItems: number;
  invoiceType: string;
  totalAmount: number;
  invoiceNumber: string;
  uploadStatus: string;
  createDate: Date;
};

export type InvoiceStats = {
  currentMonthProcessed: number;
  failedInvoice: number;
  lastMonthProcessed: number;
  pendingInvoice: number;
  totalInvoice: number;
  pendingChange: number;
  failedChange: number;
};

export const fetchInvoices = async () => {
  const {
    data: { data },
  } = await axiosClient.get(`/api/transaction`);
  if (data) return data as Transaction[];
};

export const fetchInvoicesById = async ({
  invoiceId,
}: {
  invoiceId: string;
}) => {
  if (!invoiceId) {
    console.log("missing invoice id");
    throw new Error("missing invoice id");
  }
  const {
    data: { data },
  } = await axiosClient.get(`/api/transaction/${invoiceId}`);
  if (data) return data as any;
};

export const fetchInvoicesByDate = async ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  if (!startDate || !endDate) {
    const {
      data: { data },
    } = await axiosClient.get(`/api/transaction`);
    if (data) return data as Transaction[];
  }
  const {
    data: { data },
  } = await axiosClient.get(
    `/api/transaction/daterange?StartDate=${startDate}&&EndDate=${endDate}`
  );
  if (data) return data as Transaction[];
};

export const fetchInvoiceStats = async () => {
  const {
    data: { data },
  } = await axiosClient.get(`/api/transaction/stat`);
  if (data) return data as InvoiceStats;
};

export const fetchInvoice = async ({
  invoiceNumber,
}: {
  invoiceNumber: string;
}) => {
  if (!invoiceNumber) return;

  const {
    data: { data },
  } = await axiosClient.get(`/api/transaction/${invoiceNumber}`);
  if (data) return data as Invoice;
};
