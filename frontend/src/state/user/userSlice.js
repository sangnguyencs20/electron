import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  refreshToken: "",
  id: "",
  password: "",
  hashedPrivateKey: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    saveInfo: (state, action) => {
      const { accessToken, refreshToken, id, password, hashedPrivateKey } =
        action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.id = id;
      state.password = password;
      state.hashedPrivateKey = hashedPrivateKey;
    },
    clearInfo: (state, action) => {
      state = initialState;
    },
  },
});

export const { saveInfo, clearInfo } = userSlice.actions;
export default userSlice.reducer;
