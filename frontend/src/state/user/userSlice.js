import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//api
import { axiosLogin } from "../../api";

const initialState = {
  status: "idle",
  data: {
    accessToken: "",
    id: "",
  },
};

export const login = createAsyncThunk("user/login", async (data) => {
  console.log("start call api,", import.meta.env.VITE_REACT_API_CORE_ENDPOINT);
  const res = await axiosLogin(data.username, data.password)
    .then((e) => {
      console.log(e);
    })
    .catch((error) => {
      console.log(error);
    });
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    saveInfo: (state, action) => {
      state = action.payload;
    },
    clearInfo: (state, action) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "idle";
    });
  },
});

export const { saveInfo, clearInfo } = userSlice.actions;
export default userSlice.reducer;
