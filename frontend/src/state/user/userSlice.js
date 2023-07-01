import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//api
import { axiosLogin } from "../../api";

const initialState = {
  accessToken: "",
  refreshToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    saveInfo: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    clearInfo: (state, action) => {
      state = initialState;
    },
  },
});

export const { saveInfo, clearInfo } = userSlice.actions;
export default userSlice.reducer;
