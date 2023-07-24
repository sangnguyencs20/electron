import axios from "axios";
import queryString from "query-string";
import { toast } from "react-toastify";
import store from "../state";

const getToken = async () => {
  let storeData = store.getState();
  // let accessToken = localStorage.getItem("accessToken");
  if (storeData?.userState?.accessToken) {
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
    console.log(storeData.userState.accessToken);
    return storeData.userState.accessToken;
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
  let token = await getToken();
  console.log(`Bearer ${token}`);
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  config.timeout = 15000;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    toast.success(response.data.message);
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
        toast.error(error.data);
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

export const axiosLogin = (data) => axiosClient.post("/api/auth/login", data);

export const axiosAllUser = () => axiosClient.get("/api/users");

export const axiosCreateDoc = (data) =>
  axiosClient.post("/api/documents", data);

export const axiosGetDoc = () => axiosClient.get("/api/documents");
export const axiosGetMyDoc = (page) =>
  axiosClient.post(`/api/documents/myDocument?page=${page}&&pageSize=5`);
export const axiosSubmitMyDoc = (docId, userId) =>
  axiosClient.post(`/api/documents/submit/${docId}`, { userId });

export const axiosGetReceiveDoc = (receiId) =>
  axiosClient.get(`/api/documents/receiver/${receiId}`);
export const axiosSubmitFeedback = (receiId, docId, data) =>
  axiosClient.post(
    `/api/documents/${docId}/receiver/${receiId}/feedback`,
    data
  );
export const axiosGetAllDocument = () => axiosClient.get(`/api/documents`);
export const axiosGetAllDepartment = () => axiosClient.get(`/api/departments`);
export const axiosCreateDocument = (data) =>
  axiosClient.post(`api/documents`, data);
export const axiosHistoryDocument = (id) =>
  axiosClient.get(`api/documents/${id}/history`);
export const axiosComingDocument = (page) =>
  axiosClient.post(`api/documents/comingDocument?page=${page}&pageSize=5`);
export const axiosApproveDocument = (data) =>
  axiosClient.post(`api/documents/approve`, data);
export const axiosDepartmentUser = () =>
  axiosClient.post(`api/departments/users`);
export const axiosAssignDocument = (data) => {
  axiosClient.post(`api/documents/assign`, data);
};
export const axiosSignUp = (data) => axiosClient.post(`api/auth/signup`, data);
export const axiosCheckPassword = (data) =>
  axiosClient.post(`api/auth/confirm`, data);
export const axiosPublishedDocument = (page) =>
  axiosClient.get(`api/documents/accepted?page=${page}&pageSize=5`);
