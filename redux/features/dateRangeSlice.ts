import { createSlice } from "@reduxjs/toolkit";

export interface DateRangeSlice {
  invoiceStartDate: string;
  invoiceEndDate: string;
  paymentStartDate: string;
  paymentEndDate: string;
}

const initialState: DateRangeSlice = {
  invoiceEndDate: "",
  invoiceStartDate: "",
  paymentEndDate: "",
  paymentStartDate: "",
};

export const dateRangeSlice = createSlice({
  name: "dateRange",
  initialState,
  reducers: {
    setInvoiceStartDate: (state, { payload }) => {
      state.invoiceStartDate = payload;
    },
    setInvoiceEndDate: (state, { payload }) => {
      state.invoiceEndDate = payload;
    },
    setPaymentStartDate: (state, { payload }) => {
      state.paymentStartDate = payload;
    },
    setPaymentEndDate: (state, { payload }) => {
      state.paymentEndDate = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setInvoiceEndDate,
  setInvoiceStartDate,
  setPaymentEndDate,
  setPaymentStartDate,
} = dateRangeSlice.actions;

export default dateRangeSlice.reducer;
