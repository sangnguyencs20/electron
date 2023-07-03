import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//api
import { axiosLogin } from "../../api";

const initialState = {
  accessToken: "",
  refreshToken: "",
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    saveInfo: (state, action) => {
      const { accessToken, refreshToken, id } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.id = id;
    },
    clearInfo: (state, action) => {
      state = initialState;
    },
  },
});

export const { saveInfo, clearInfo } = userSlice.actions;
export default userSlice.reducer;
