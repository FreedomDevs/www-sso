export interface MeResponse {
  id: string;
  name: string;
  groups: string[];
  permissions: Record<string, string[]>;
  createdAt: string;
  updatedAt: string;
}
