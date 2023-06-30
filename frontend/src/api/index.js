import axios from "axios";
import queryString from "query-string";
import { toast } from "react-toastify";
// import store from "../state";

const getToken = async () => {
  // let storeData = store.getState();
  let accessToken = localStorage.getItem("accessToken");
  if (storeData) {
    // let currentTime = moment(new Date()).valueOf();
    // if (
    //   currentTime - moment(storeData.userState.expiresIn).valueOf() <
    //   1209600
    // ) {
    //   return storeData.userState.token;
    // } else {
    //   store.dispatch(logOut());
    //   return;
    // }
    return accessToken;
  } else {
    return "";
  }
};

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_API_CORE_ENDPOINT}`,
  headers: {
    "content-type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  console.log("Token");
  let token = "";
  if (token) {
    config.headers = {
      Authorization: token,
    };
  }
  config.timeout = 15000;
  console.log("Done config");
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response;
    }
    return response;
  },
  (error) => {
    // store.dispatch(toggle({ status: false }));
    // Handle errors
    if (error.response) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } else if (error.request) {
      window.location.replace("/404");
    } else {
      window.location.replace("/404");
    }
    throw error;
  }
);
export default axiosClient;

export const axiosLogin = (username, password) =>
  axiosClient.post("/api/auth/login", { username, password });

export const axiosSignUp = (data) => axiosClient.post("/api/auth/signup", data);
