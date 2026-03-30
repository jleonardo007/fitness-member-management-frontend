import axios, { AxiosError } from 'axios';
import type { ApiError } from '@/types/api';

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_PREFIX}/${import.meta.env.VITE_API_VERSION}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(
  (config) => config,
  (error: AxiosError) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export const getApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError && error.response?.data) {
    return error.response.data as ApiError;
  }

  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    statusCode: 500,
  };
};
