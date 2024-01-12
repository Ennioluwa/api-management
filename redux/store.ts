import { configureStore } from "@reduxjs/toolkit";
import navigationSlice from "./features/navigationSlice";
import userSlice from "./features/userSlice";
import addUserSlice from "./features/addUserSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      navigation: navigationSlice,
      user: userSlice,
      userManagement: addUserSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
