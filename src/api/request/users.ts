import { api } from '@/src/api/instance';
import { MeResponse, SuccessResponse } from '@/src/api/data';

export const me = async (): Promise<MeResponse> => {
  const response = await api.get<SuccessResponse<MeResponse>>('/users/me');

  if (!response.data.data) {
    throw new Error('Response data is missing');
  }

  return response.data.data;
};
