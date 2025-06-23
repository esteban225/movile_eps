import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.168.53.253:8000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

const RutasPublicas = ["/login", "/register"];

apiClient.interceptors.request.use(
  async (config) => {
    const isRutaPublica = RutasPublicas.some(route => config.url.includes(route));

    if (!isRutaPublica) {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isUnauthorized = RutasPublicas.some(route => originalRequest.url.includes(route));

    if (error.response && error.response.status === 401 && !originalRequest._retry && !isUnauthorized) {
      originalRequest._retry = true;
      
      console.log("Token expirado, intentando refrescar...");
      await AsyncStorage.removeItem("userToken");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
