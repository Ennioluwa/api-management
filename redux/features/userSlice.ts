import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  require2FA: boolean;
  companyId: number;
  roles: any[];
  changePassword: boolean;
  setupStatus: "Completed" | "CompanyCreated" | "AccountCreated";
  companyStatus: "Pending" | "Completed";
  tokenSet: {
    jwtToken: string;
    refreshToken: string;
  };
}
export interface UserSlice {
  userData: UserData | null;
}

const initialState: UserSlice = {
  userData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserData | null>) => {
      state.userData = action.payload;
      if (action.payload) {
        localStorage.setItem("userData", JSON.stringify(action.payload));
        localStorage.setItem(
          "access-token",
          JSON.stringify(action.payload.tokenSet.jwtToken)
        );
        localStorage.setItem(
          "refresh-token",
          JSON.stringify(action.payload.tokenSet.refreshToken)
        );
      } else {
        state.userData = null;
        localStorage.removeItem("userData");
        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");
      }
    },
    setSetupStatus: (
      state,
      action: PayloadAction<"Completed" | "AccountCreated" | "CompanyCreated">
    ) => {
      if (!state.userData) {
        return;
      }
      let newData = state.userData;
      newData.setupStatus = action.payload;
      state.userData.setupStatus = action.payload;
      localStorage.setItem("userData", JSON.stringify(newData));
    },
    setCompanyId: (state, action: PayloadAction<number>) => {
      if (!state.userData) {
        return;
      }
      let newData = state.userData;
      newData.companyId = action.payload;
      state.userData.companyId = action.payload;
      localStorage.setItem("userData", JSON.stringify(newData));
    },
    setChangePassword: (state, action: PayloadAction<boolean>) => {
      if (!state.userData) {
        return;
      }
      let newData = state.userData;
      newData.changePassword = action.payload;
      state.userData.changePassword = action.payload;
      localStorage.setItem("userData", JSON.stringify(newData));
    },
    setCompanyStatus: (
      state,
      action: PayloadAction<"Completed" | "Pending">
    ) => {
      if (!state.userData) {
        return;
      }
      let newData = state.userData;
      newData.companyStatus = action.payload;
      state.userData.companyStatus = action.payload;
      localStorage.setItem("userData", JSON.stringify(newData));
    },
    setName: (
      state,
      action: PayloadAction<{ firstName: string; lastName: string }>
    ) => {
      if (!state.userData) {
        return;
      }
      let newData = state.userData;
      newData.firstName = action.payload.firstName;
      state.userData.firstName = action.payload.firstName;
      newData.lastName = action.payload.lastName;
      state.userData.lastName = action.payload.lastName;
      localStorage.setItem("userData", JSON.stringify(newData));
    },
    logoutUser: (state) => {
      state.userData = null;
      localStorage.removeItem("userData");
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loginUser,
  logoutUser,
  setSetupStatus,
  setCompanyId,
  setChangePassword,
  setCompanyStatus,
  setName,
} = userSlice.actions;

export default userSlice.reducer;
