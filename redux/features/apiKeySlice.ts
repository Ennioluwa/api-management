import { createSlice } from "@reduxjs/toolkit";

export interface ApiKeySlice {
  isOpen: boolean;
}

const initialState: ApiKeySlice = {
  isOpen: false,
};

export const apiKeySlice = createSlice({
  name: "userManagement",
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
  },
});

// Action creators are generated for each case reducer function
export const { onOpen, onClose, handleOpenChange } = apiKeySlice.actions;

export default apiKeySlice.reducer;
