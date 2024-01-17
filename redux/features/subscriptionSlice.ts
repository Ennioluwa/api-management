import { createSlice } from "@reduxjs/toolkit";

export interface SubscriptionSliceProps {
  deletePrompt: boolean;
  deleteSuccess: boolean;
  revertPrompt: boolean;
  revertSuccess: boolean;
  addCard: boolean;
  modifyCard: boolean;
  changePayment: boolean;
}

const initialState: SubscriptionSliceProps = {
  deletePrompt: false,
  deleteSuccess: false,
  revertPrompt: false,
  revertSuccess: false,
  addCard: false,
  modifyCard: false,
  changePayment: false,
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    ondeletePromptOpen: (state) => {
      state.deletePrompt = true;
    },
    ondeletePromptClose: (state) => {
      state.deletePrompt = false;
    },
    handledeletePromptChange: (state) => {
      state.deletePrompt = !state.deletePrompt;
    },
    setDeletePrompt: (state, { payload }) => {
      state.deletePrompt = payload;
    },
    ondeleteSuccessOpen: (state) => {
      state.deleteSuccess = true;
    },
    ondeleteSuccessClose: (state) => {
      state.deleteSuccess = false;
    },
    handledeleteSuccessChange: (state) => {
      state.deleteSuccess = !state.deleteSuccess;
    },
    setDeleteSuccess: (state, { payload }) => {
      state.deleteSuccess = payload;
    },
    onrevertPromptOpen: (state) => {
      state.revertPrompt = true;
    },
    onrevertPromptClose: (state) => {
      state.revertPrompt = false;
    },
    handlerevertPromptChange: (state) => {
      state.revertPrompt = !state.revertPrompt;
    },
    setRevertPrompt: (state, { payload }) => {
      state.revertPrompt = payload;
    },
    onrevertSuccessOpen: (state) => {
      state.revertSuccess = true;
    },
    onrevertSuccessClose: (state) => {
      state.revertSuccess = false;
    },
    handlerevertSuccessChange: (state) => {
      state.revertSuccess = !state.revertSuccess;
    },
    setRevertSuccess: (state, { payload }) => {
      state.revertSuccess = payload;
    },
    onaddCardOpen: (state) => {
      state.addCard = true;
    },
    onaddCardClose: (state) => {
      state.addCard = false;
    },
    handleaddCardChange: (state) => {
      state.addCard = !state.addCard;
    },
    setAddCard: (state, { payload }) => {
      state.addCard = payload;
    },
    onmodifyCardOpen: (state) => {
      state.modifyCard = true;
    },
    onmodifyCardClose: (state) => {
      state.modifyCard = false;
    },
    handlemodifyCardChange: (state) => {
      state.modifyCard = !state.modifyCard;
    },
    setModifyCard: (state, { payload }) => {
      state.modifyCard = payload;
    },
    onchangePaymentOpen: (state) => {
      state.changePayment = true;
    },
    onchangePaymentClose: (state) => {
      state.changePayment = false;
    },
    handlechangePaymentChange: (state) => {
      state.changePayment = !state.changePayment;
    },
    setChangePayment: (state, { payload }) => {
      state.changePayment = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onaddCardClose,
  onaddCardOpen,
  onchangePaymentClose,
  onchangePaymentOpen,
  ondeletePromptClose,
  ondeletePromptOpen,
  ondeleteSuccessClose,
  ondeleteSuccessOpen,
  onmodifyCardClose,
  onmodifyCardOpen,
  onrevertPromptClose,
  onrevertPromptOpen,
  onrevertSuccessClose,
  onrevertSuccessOpen,
  handleaddCardChange,
  handlechangePaymentChange,
  handledeletePromptChange,
  handledeleteSuccessChange,
  handlemodifyCardChange,
  handlerevertPromptChange,
  handlerevertSuccessChange,
  setAddCard,
  setChangePayment,
  setDeletePrompt,
  setDeleteSuccess,
  setModifyCard,
  setRevertPrompt,
  setRevertSuccess,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
