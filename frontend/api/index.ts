import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import AuthService from "./services/auth.service";
import ProductsService from "./services/products.service";
import { setTokenToLocalStorage } from "@/modules/common/utils";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL as string;

class Api {
  private axios: AxiosInstance;
  private token: string | undefined;
  auth: AuthService;
  products: ProductsService;

  constructor() {
    this.axios = axios.create({
      baseURL: BACKEND_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor to set Bearer token
    this.axios.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.set("Authorization", `Bearer ${this.token}`);
      }
      return config;
    });

    // Response interceptor to handle 401 errors
    this.axios.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (
          window.location.pathname !== "/login" &&
          error.response &&
          error.response.status === 401
        ) {
          // Redirect to home page or handle unauthorized error
          window.location.href = "/"; // Adjust the redirect path as needed
          setTokenToLocalStorage("");
        }
        return Promise.reject(error);
      }
    );

    this.auth = new AuthService(this.axios);
    this.products = new ProductsService(this.axios);
  }

  public setToken(token: string) {
    this.token = token;
  }
}

const api = new Api();
export default api;
