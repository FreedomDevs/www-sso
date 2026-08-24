export interface NameHistory {
  id: string;
  name: string;
  changedAt: Date;
}

export interface NameHistoryResponse {
  history: NameHistory[];
}