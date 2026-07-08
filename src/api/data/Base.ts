export interface Meta {
  code?: string;
  traceId: string;
  timestamp: string;
}

export interface SuccessResponse<T> {
  data?: T;
  message: string;
  meta: Meta;
}

export interface ErrorResponse {
  error: {
    message: string;
    code: string;
    details?: unknown;
  };
  meta: Meta;
}
