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
      // window.location.replace("/404");
    } else {
      // window.location.replace("/404");
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
export const axiosSubmitMyDoc = (docId, data) =>
  axiosClient.post(`/api/documents/submit/${docId}`, data);

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
export const axiosDocument = (id) => axiosClient.get(`api/documents/${id}`);
export const axiosGetComment = (docId, page) =>
  axiosClient.get(`api/opinions/${docId}?page=${page}&pageSize=5`);
export const axiosPostComment = (data) =>
  axiosClient.post(`api/opinions/`, data);
export const axiosPostLog = (data) => axiosClient.post(`api/logs/`, data);
export const axiosPostPublishDocument = (docId) =>
  axiosClient.post(`api/documents/publish/${docId}`);
