import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  start_date : [],
  end_date : []
};
export const reduc = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleStartDate: (state, action) => {
      state.start_date = action.payload;
    },
    handleEndDate: (state, action) => {
      state.end_date = action.payload;
    },
  },
});

export const {
  handleEndDate,handleStartDate
} = reduc.actions;
export default reduc.reducer;
