import { createSlice } from "@reduxjs/toolkit";

export interface AddUserSlice {
  isOpen: boolean;
}

const initialState: AddUserSlice = {
  isOpen: false,
};

export const addUserSlice = createSlice({
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
export const { onOpen, onClose, handleOpenChange } = addUserSlice.actions;

export default addUserSlice.reducer;
