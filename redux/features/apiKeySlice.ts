import { createSlice } from "@reduxjs/toolkit";

export interface ApiKeySlice {
  isOpen: boolean;
  isModifyApiOpen: boolean;
}

const initialState: ApiKeySlice = {
  isOpen: false,
  isModifyApiOpen: false,
};

export const apiKeySlice = createSlice({
  name: "apiKey",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
    handleOpenChange: (state) => {
      state.isOpen = !state.isOpen;
    },
    modifyApiOpen: (state) => {
      state.isModifyApiOpen = true;
    },
    modifyApiClose: (state) => {
      state.isModifyApiOpen = false;
    },
    handleModifyApiChange: (state) => {
      state.isModifyApiOpen = !state.isModifyApiOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onOpen,
  onClose,
  handleOpenChange,
  modifyApiClose,
  modifyApiOpen,
  handleModifyApiChange,
} = apiKeySlice.actions;

export default apiKeySlice.reducer;
