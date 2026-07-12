import { ssoApi } from '@/src/api/instance';
import {
  LoginResponse,
  SuccessResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  ConfirmEmailRequest,
  ConfirmEmailResponse,
  ResendEmailRequest,
  RefreshRequest,
  CheckRefreshTokenRequest,
  CreateChildTokenRequest,
  CreateChildTokenResponse,
  ClientInfoRequest,
  ClientInfoResponse,
} from '@/src/api/data';
import { RefreshResponse } from '@/src/api/data/RefreshResponse';

export const login = async (data: LoginRequest): Promise<LoginResponse > => {
  const response = await ssoApi.post<SuccessResponse<LoginResponse>>(
    '/auth/login',
    data
  );

  if (!response.data.data) {
    throw new Error('Response data is missing')
  }

  return response.data.data;
};

export const register = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  const response = await ssoApi.post<SuccessResponse<RegisterResponse>>(
    '/auth/register',
    data
  );

  if (!response.data.data) {
    throw new Error('Response data is missing');
  }

  return response.data.data;
};

export const confirmEmail = async (
  data: ConfirmEmailRequest
): Promise<ConfirmEmailResponse> => {
  const response = await ssoApi.post<SuccessResponse<ConfirmEmailResponse>>(
    '/auth/confirm_email',
    data
  );

  if (!response.data.data) {
    throw new Error('Response data is missing');
  }

  return response.data.data;
};

export const resendEmail = async (
  data: ResendEmailRequest
): Promise<SuccessResponse<null>> => {
  const response = await ssoApi.post<SuccessResponse<null>>(
    '/auth/resend_email',
    data
  );

  return response.data;
};

export const refresh = async (
  data: RefreshRequest
): Promise<RefreshResponse> => {
  const response = await ssoApi.post<SuccessResponse<RefreshResponse>>(
    '/auth/refresh',
    data
  );

  if (!response.data.data) {
    throw new Error('Response data is missing');
  }

  return response.data.data;
};

export const checkRefreshToken = async (
  data: CheckRefreshTokenRequest
): Promise<SuccessResponse<null>> => {
  const response = await ssoApi.post<SuccessResponse<null>>(
    '/auth/check_refresh_token',
    data
  );

  return response.data;
};

export const createChildToken = async (
  data: CreateChildTokenRequest
): Promise<CreateChildTokenResponse> => {
  const response = await ssoApi.post<SuccessResponse<CreateChildTokenResponse>>(
    '/auth/create_child_token',
    data
  );

  if (!response.data.data) {
    throw new Error('Response data is missing');
  }

  return response.data.data;
};

export const clientInfo = async (
  data: ClientInfoRequest
): Promise<ClientInfoResponse> => {
  const response = await ssoApi.get<SuccessResponse<ClientInfoResponse>>(
    `/auth/create_child_token/${data.client_id}`
  );

  if (!response.data.data) {
    throw new Error('Response data is missing');
  }

  return response.data.data;
};