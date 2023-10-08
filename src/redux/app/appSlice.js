import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTaxYear(state, action) {
      state.taxYear = action.payload;
    },
  },
});

export const { setTaxYear } = appSlice.actions;

export default appSlice.reducer;
