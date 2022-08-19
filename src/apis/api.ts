import { AuthEndpointsEnum } from "@/features/auth/constants/auth.endpoints";
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DB_HOST,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const authInterceptor = (request: AxiosRequestConfig) => {
  const token = "token";
  if (token && request && request.headers) {
    // request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
};

const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

const errorInterceptor = (axiosError: AxiosError) => {
  if (axiosError && axiosError.response) {
    // TODO: Handle error here
    const statusCode = axiosError.response.status;
    if (statusCode === 401) {
      // store.dispatch(logoutAction());
      window.location.assign(AuthEndpointsEnum.LOGIN);
    }
    return Promise.reject(axiosError.response);
  }
  return Promise.reject(axiosError);
};

api.interceptors.request.use(authInterceptor);
api.interceptors.response.use(responseInterceptor, errorInterceptor);
