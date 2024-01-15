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

export const fetchInvoices = async () => {
  const {
    data: { data },
  } = await axiosClient.get(`/api/subscription`);
  if (data) return data as Invoice[];
};
