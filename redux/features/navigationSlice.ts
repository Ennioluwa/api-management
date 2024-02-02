import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface NavigationSlice {
  isOpen: boolean;
  isDashboardOpen: boolean;
}

const initialState: NavigationSlice = {
  isOpen: false,
  isDashboardOpen: false,
};

export const navigationSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onDashboardOpen: (state) => {
      state.isDashboardOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
    onDashboardClose: (state) => {
      state.isDashboardOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onOpen, onClose, onDashboardClose, onDashboardOpen } =
  navigationSlice.actions;

export default navigationSlice.reducer;
