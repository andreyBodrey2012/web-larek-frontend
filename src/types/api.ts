export type ApiListResponse<T> = {
  total: number;
  items: T[];
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApiClient {
  get<T>(uri: string): Promise<T>;
  post<T, P extends object>(uri: string, data: P, method?: ApiPostMethods): Promise<T>;
}