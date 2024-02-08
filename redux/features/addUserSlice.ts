import { createSlice } from "@reduxjs/toolkit";

export interface AddUserSlice {
  isOpen: boolean;
  isModifyOpen: boolean;
}

const initialState: AddUserSlice = {
  isOpen: false,
  isModifyOpen: false,
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
    onModifyUserOpen: (state) => {
      state.isModifyOpen = true;
    },
    onModifyUserClose: (state) => {
      state.isModifyOpen = false;
    },
    handleModifyUserOpenChange: (state) => {
      state.isModifyOpen = !state.isModifyOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onOpen,
  onClose,
  handleOpenChange,
  onModifyUserClose,
  onModifyUserOpen,
  handleModifyUserOpenChange,
} = addUserSlice.actions;

export default addUserSlice.reducer;
