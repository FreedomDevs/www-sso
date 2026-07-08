export type RefreshMethods = 'Game' | 'Web';

export interface RefreshRequest {
  method: RefreshMethods;
  refresh_token: string;
}
