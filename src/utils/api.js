// src/api/axiosInstance.js
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { CURRENT_URL,REFRESH_URL } from "./urls";


// Helper function to check if token expired
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (err) {
    return true;
  }
};

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: CURRENT_URL,
});

// Request interceptor: attach token
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    // If token expired and refresh token exists
    if (isTokenExpired(accessToken) && refreshToken) {
      try {
        const response = await axios.post(REFRESH_URL, {
          refresh: refreshToken,
        });

        accessToken = response.data.access;
        localStorage.setItem("accessToken", accessToken);
      } catch (error) {
        console.error("Token refresh failed:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    // Attach token to header
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
