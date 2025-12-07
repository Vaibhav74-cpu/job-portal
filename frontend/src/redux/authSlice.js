import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

//export action
export const { setLoading } = authSlice.actions;

//export slice/reducer
export default authSlice.reducer;
