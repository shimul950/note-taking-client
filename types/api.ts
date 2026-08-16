export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Paginated<T> {
  data: T[];
  page: number;
  total: number;
  pages: number;
}