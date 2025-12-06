import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ApiErrorResponse, ApiSuccessResponse } from "./apiResponse";

/**
 * Custom Error type với status và data
 */
interface ApiError extends Error {
  status?: number;
  data?: ApiErrorResponse;
}

/**
 * Axios instance với cấu hình mặc định cho Next.js app
 */
const axiosClient: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor - thêm token, logging, etc.
 */
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Thêm auth token nếu có
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request trong development
    if (process.env.NODE_ENV === "development") {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    console.error("[API Request Error]", error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor - xử lý response và errors
 */
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response trong development
    if (process.env.NODE_ENV === "development") {
      console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    // Xử lý lỗi từ API
    if (error.response) {
      // Server trả về response với status code lỗi (4xx, 5xx)
      const errorData = error.response.data;
      const errorMessage = errorData?.message || error.message || "Đã xảy ra lỗi";

      // Log error trong development
      if (process.env.NODE_ENV === "development") {
        console.error("[API Error Response]", {
          status: error.response.status,
          message: errorMessage,
          data: errorData,
        });
      }

      // Xử lý các trường hợp đặc biệt
      if (error.response.status === 401) {
        // Unauthorized - xóa token và redirect về login
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          // Có thể redirect về login page nếu cần
          // window.location.href = "/login";
        }
      }

      // Tạo error object với message từ server
      const apiError: ApiError = new Error(errorMessage);
      apiError.status = error.response.status;
      apiError.data = errorData;
      return Promise.reject(apiError);
    } else if (error.request) {
      // Request đã được gửi nhưng không nhận được response
      console.error("[API Network Error]", error.request);
      return Promise.reject(new Error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng."));
    } else {
      // Lỗi khi setup request
      console.error("[API Request Setup Error]", error.message);
      return Promise.reject(error);
    }
  }
);

/**
 * Type-safe API methods
 */
export const axiosInstance = {
  /**
   * GET request với type safety
   */
  get: async <T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiSuccessResponse<T>> => {
    const response = await axiosClient.get<ApiSuccessResponse<T>>(url, config);
    return response.data;
  },

  /**
   * POST request với type safety
   */
  post: async <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiSuccessResponse<T>> => {
    const response = await axiosClient.post<ApiSuccessResponse<T>>(url, data, config);
    return response.data;
  },

  /**
   * PUT request với type safety
   */
  put: async <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiSuccessResponse<T>> => {
    const response = await axiosClient.put<ApiSuccessResponse<T>>(url, data, config);
    return response.data;
  },

  /**
   * PATCH request với type safety
   */
  patch: async <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiSuccessResponse<T>> => {
    const response = await axiosClient.patch<ApiSuccessResponse<T>>(url, data, config);
    return response.data;
  },

  /**
   * DELETE request với type safety
   */
  delete: async <T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiSuccessResponse<T>> => {
    const response = await axiosClient.delete<ApiSuccessResponse<T>>(url, config);
    return response.data;
  },
};

/**
 * Export axios client instance để sử dụng trực tiếp nếu cần
 */
export default axiosClient;
