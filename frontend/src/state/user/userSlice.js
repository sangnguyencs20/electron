import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  refreshToken: "",
  id: "",
  password: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    saveInfo: (state, action) => {
      const { accessToken, refreshToken, id, password } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.id = id;
      state.password = password;
    },
    clearInfo: (state, action) => {
      state = initialState;
    },
  },
});

export const { saveInfo, clearInfo } = userSlice.actions;
export default userSlice.reducer;
