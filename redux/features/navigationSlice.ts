import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface NavigationSlice {
  isOpen: boolean;
}

const initialState: NavigationSlice = {
  isOpen: false,
};

export const navigationSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onOpen, onClose } = navigationSlice.actions;

export default navigationSlice.reducer;
