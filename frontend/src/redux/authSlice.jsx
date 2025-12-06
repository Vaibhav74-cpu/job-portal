import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    action: (state, ation) => {
      state.value += state;
    },
  },
});

//export action
export const {} = authSlice.actions;

//export slice/reducer
export default authSlice.reducer;
