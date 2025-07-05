import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
   // baseURL: "http://localhost:8000/api/",
   baseURL: baseURL,
   headers: {
      "Content-Type": "application/json",
   },
});

const queryClient = new QueryClient();

axiosInstance.interceptors.response.use(
   (response) => response,
   async (error) => {
      const originalRequest = error.config;

      if (originalRequest.skipInterceptor) {
         return Promise.reject(error);
      }

      if (error.response.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;

         const refreshToken = localStorage.getItem("refresh_token");
         if (!refreshToken) {
            window.location.href = "/login";
            return Promise.reject(error);
         }

         try {
            console.log("Token Refreshing...");

            const response = await axios.post(
               `${baseURL}auth/token/refresh/`,
               { refresh: refreshToken }
            );

            const { access, refresh } = response.data;

            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);

            axiosInstance.defaults.headers.common[
               "Authorization"
            ] = `Bearer ${access}`;

            originalRequest.headers["Authorization"] = `Bearer ${access}`;

            return axiosInstance(originalRequest);
         } catch (refreshError) {
            console.error("Refresh token is expired", refreshError);
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/login";
            return Promise.reject(refreshError);
         }
      }
      return Promise.reject(error);
   }
);

export { axiosInstance, queryClient };
