export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: unknown;
}

export interface ApiValidationError extends ApiError {
  errors: ValidationError[];
}

export interface ApiResponse<T> {
  data: T;
}

export interface ApiPaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}
