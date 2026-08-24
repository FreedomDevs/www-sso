import { api } from '@/src/api/instance';
import {
  MeResponse,
  NameHistoryResponse,
  SuccessResponse,
} from '@/src/api/data';

export const me = async (): Promise<MeResponse> => {
  const response = await api.get<SuccessResponse<MeResponse>>('/users/me');

  if (!response.data.data) {
    throw new Error('Response data is missing');
  }

  return response.data.data;
};

export const getMyNameHistory = async (): Promise<NameHistoryResponse> => {
  const response =
    await api.get<SuccessResponse<NameHistoryResponse>>('/users/me/name');

  if (!response.data.data) {
    throw new Error('Response data is missing');
  }

  return response.data.data;
};
